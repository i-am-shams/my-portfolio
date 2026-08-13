/**
 * Self-directed engineering builds, as opposed to the client and employer work
 * in `enterpriseProjects`. The distinction matters for how they read: this work
 * is publicly running and independently verifiable, so it is presented with a
 * live URL and concrete engineering decisions rather than outcome claims.
 */
export const buildProjects = [
  {
    slug: "ai-job-search-copilot",
    title: "AI Job-Search Copilot",
    tagline: "Event-driven AI matching pipeline, built and deployed end to end",
    liveUrl: "https://jobcopilot.dentflowbd.com",
    // The repository is currently private. Set this to the URL to have the
    // "Source" link render; nothing else needs to change.
    repoUrl: null,
    diagram: {
      src: "/jobcopilot-architecture.png",
      alt:
        "Architecture diagram: a React frontend calls an ASP.NET Core API, which publishes match requests to RabbitMQ; a background worker consumes them, calls the Gemini API, writes results to PostgreSQL, and publishes a completion event that the API pushes back to the browser over SignalR.",
    },
    summary:
      "Paste a resume and a job description, get an AI-generated match score and gap analysis. The interesting part is not the AI call - it is that the work happens asynchronously through a message queue and a background worker, with the result pushed back to the browser in real time rather than polled for.",
    why:
      "Built deliberately as a distributed system rather than a CRUD app, to exercise the architecture patterns end to end: message queue, background worker, real-time push, containerization, CI/CD, and a production deployment with health gating.",
    architecture: [
      "ASP.NET Core 8 API publishes a durable message to RabbitMQ instead of calling the AI provider inline, so a slow or failing model never blocks a request.",
      "A C# BackgroundService worker consumes with manual ack and prefetch 1, calls Gemini, persists to PostgreSQL via EF Core, then publishes a completion event.",
      "A second queue bridges the worker back to the API, which pushes results to the right browser over SignalR using per-user groups keyed on the JWT subject claim.",
      "Five containers via Docker Compose, with datastores unpublished and the API bound to loopback only; the frontend's own nginx proxies the API on the same origin, so production needs no CORS at all.",
      "GitHub Actions builds three images and deploys on push to master. The deploy key is pinned to a forced command on the server, so a leaked CI secret cannot open a shell.",
    ],
    decisions: [
      {
        title: "Liveness and readiness are separate endpoints",
        body:
          "Docker restarts containers that fail liveness. If the liveness probe checked the database, a brief blip would kill a perfectly healthy API. /health checks nothing external; /health/ready checks Postgres and RabbitMQ. Verified by stopping RabbitMQ: /health stayed 200 and the API was correctly left alone.",
      },
      {
        title: "The worker's heartbeat is gated on its queue connection",
        body:
          "The worker has no HTTP surface, so its healthcheck reads the freshness of a heartbeat file. That file is only written while the AMQP connection is actually open - which turns 'process alive but consuming nothing', the silent failure that matters, into a visible unhealthy container.",
      },
      {
        title: "A smoke test that asserted nothing",
        body:
          "The deployment smoke test checked only the HTTP status of /health. The frontend's SPA fallback returns 200 with index.html for any unmatched path, so it passed against a deployment where the endpoint did not exist - proven against the live site before it was fixed to assert the response body.",
      },
      {
        title: "Prompt injection is handled in two independent layers",
        body:
          "User-submitted resume and job text is untrusted input to the model. Delimiters plus an explicit data-not-instructions instruction on the way in, and a clamped score and length-capped output on the way out - because prompt wording alone is never a guarantee. Tested with a real injection attempt, which scored 0.",
      },
    ],
    stack: [
      "ASP.NET Core 8",
      "C# BackgroundService",
      "PostgreSQL",
      "EF Core",
      "RabbitMQ",
      "SignalR",
      "React",
      "TypeScript",
      "TanStack Query",
      "Docker Compose",
      "nginx",
      "GitHub Actions",
      "Google Gemini",
    ],
    // Named honestly rather than omitted; the gaps are as informative as the wins.
    knownGaps: [
      "No IaC layer - the server is configured by documented manual steps, not Terraform or Ansible.",
      "Deploys pull :latest rather than a commit SHA, so rollback is a manual edit on the server.",
      "A single API instance, and rate limiting held in memory rather than shared.",
    ],
  },
];
