/**
 * Self-directed engineering builds, as opposed to the client and employer work
 * in `enterpriseProjects`. The distinction matters for how they read: this work
 * is publicly running and independently verifiable, so it is presented with a
 * live URL and concrete engineering decisions rather than outcome claims.
 */
export const buildProjects = [
  {
    slug: "dental-pms",
    title: "DentalPMS",
    tagline:
      "A multi-tenant SaaS for dental clinics — designed, built, deployed, and operated in production",
    liveUrl: "https://demo.dentflowbd.com/login",
    repoUrl: null,
    sourceNote:
      "Source is private — this is a commercial product with real clinics on it. The live demo below is a seeded tenant containing no real patient data.",
    demo: {
      url: "https://demo.dentflowbd.com/login",
      // Set both of these to strings to render the credentials block.
      username: "demo.dentflowbd@gmail.com",
      password: "Demo@123",
      note: "Seeded demo clinic. No real patient data.",
    },
    diagram: {
      src: "/dentalpms-dashboard.png",
      alt:
        "The DentalPMS clinic admin dashboard, logged in as a demo clinic: today's appointments, month-to-date collections and charges, outstanding dues, active treatment cycles, new patients in the last 30 days, and flagged operational signals such as collection efficiency and no-show pressure.",
      caption:
        "The clinic admin dashboard, live on the demo tenant - real operational signals (collections, dues aging, no-show pressure) computed from the seeded data, not a mockup.",
    },
    stats: [
      { value: "127k", label: "Lines of C#" },
      { value: "41", label: "Domain entities" },
      { value: "167", label: "Automated tests" },
      { value: "33", label: "EF Core migrations" },
      { value: "326", label: "Commits" },
    ],
    summary:
      "A practice management system for Bangladeshi dental clinics, from solo practitioners to multi-chair practices. It is built around the receptionist's day rather than the dentist's: a fixed-slot scheduler, patient records, dental charting, billing and payment ledgers, and printable visit summaries. It is a real product with clinics using it, not a demonstration.",
    why:
      "This is the project where the architecture had to hold up under real use rather than under a README. Multiple clinics share one deployment, so tenant isolation is a correctness and privacy requirement, not a design preference — and the operational side (backups, custom clinic domains, email delivery, upgrades without downtime) is as much of the work as the code.",
    architecture: [
      "Clean Architecture across four projects — Domain, Application, Infrastructure, Web — so business rules carry no dependency on EF Core, Blazor, or any external service.",
      "Multi-tenancy is enforced structurally, not by convention: the clinic is resolved from the request's subdomain into a scoped ICurrentClinicService, and EF Core global query filters apply ClinicId to every tenant-scoped entity automatically.",
      "ASP.NET Identity with JWTs (HS256) carried in HttpOnly cookies for browser clients, and policy-based authorization — components check policies such as CanCreateAppointment, rather than merely checking that a claim exists.",
      "Blazor Server UI over 81 components, backed by PostgreSQL with all timestamps persisted in UTC and converted at the edges through documented helpers.",
      "Runs on a VPS behind nginx with per-clinic custom domains, and is operated from 13 written runbooks covering offsite backups, SMTP setup, clinic domain onboarding, and production incidents.",
    ],
    decisions: [
      {
        title: "Tenant isolation is structural, not remembered",
        body:
          "Every tenant-scoped query is filtered by EF Core global query filters rather than by a WHERE clause the developer has to remember. A forgotten filter in a multi-tenant medical system is not a bug, it is a data breach — so the design makes the unsafe query impossible to write by accident. IgnoreQueryFilters() is permitted only in narrow, documented admin paths.",
      },
      {
        title: "The scheduler is receptionist-first, on fixed 10-minute slots",
        body:
          "Free-form appointment times model a calendar; fixed slots model how a clinic front desk actually books. Constraining the domain made the scheduling UI faster to operate and removed a whole class of overlap and rounding bugs at the source.",
      },
      {
        title: "All timestamps persist as UTC",
        body:
          "Timezone handling is the classic defect in any scheduling product. Every persisted timestamp is UTC, conversion happens only at the display edge, and the rule is written down as a convention document rather than left to each developer's judgement.",
      },
      {
        title: "Private source, public demo",
        body:
          "The code is not open, because clinics pay for it. A seeded demo tenant is the honest substitute: it lets the product be judged on what it actually does, without exposing either the source or anyone's patient data.",
      },
    ],
    stack: [
      "ASP.NET Core 8",
      "Blazor Server",
      "C#",
      "PostgreSQL",
      "EF Core",
      "ASP.NET Identity",
      "Clean Architecture",
      "Multi-tenancy",
      "Tailwind CSS",
      "Docker",
      "nginx",
      "Playwright",
      "xUnit",
    ],
    knownGaps: [
      "Single-server deployment — no horizontal scaling or automated failover yet.",
      "The source is private, so the demo and this writeup stand in for reading the code.",
    ],
  },
  {
    slug: "ai-job-search-copilot",
    title: "AI Job-Search Copilot",
    tagline: "Event-driven AI matching pipeline, built and deployed end to end",
    liveUrl: "https://jobcopilot.dentflowbd.com",
    // The repository is currently private. Set this to the URL to have the
    // "Source" link render; nothing else needs to change.
    repoUrl: null,
    sourceNote: null,
    demo: null,
    stats: null,
    diagram: {
      src: "/jobcopilot-architecture.png",
      alt:
        "Architecture diagram: a React frontend calls an ASP.NET Core API, which publishes match requests to RabbitMQ; a background worker consumes them, calls the Gemini API, writes results to PostgreSQL, and publishes a completion event that the API pushes back to the browser over SignalR.",
      caption:
        "Request flow: the API queues work rather than calling the model inline, and the result is pushed back to the browser when the worker finishes.",
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
  {
    slug: "one-page-commerce",
    title: "One-Page Commerce",
    tagline:
      "A single-product COD storefront a non-developer can launch and edit — built, deployed, and operated end to end",
    liveUrl: "https://one-page-commerce.vercel.app/",
    repoUrl: null,
    sourceNote:
      "Source is private — this is a commercial product with real stores selling through it.",
    demo: null,
    stats: null,
    diagram: {
      src: "/onepagecommerce-storefront.png",
      alt:
        "The One-Page Commerce storefront live on a real product page: a Wooden Kids Hanging Gym listing with pricing, a Cash-on-Delivery badge, verified-ratings copy, an embedded product video, and Order Now / See Reviews calls to action.",
      caption:
        "The live storefront on a real listing — pricing, COD badge, and checkout entry point rendered from the admin-configured product content, not a static mockup.",
    },
    summary:
      "A reusable template for single-product Cash-on-Delivery storefronts: a long-form sales page, an embedded checkout, and an admin panel that lets a non-developer change product content, pricing, images, testimonials, and tracking pixels without touching code. Supports both a single-tenant self-hosted install and a pooled multi-tenant deployment.",
    why:
      "The interesting problem here isn't the storefront — it's making the admin side safe for a non-developer to operate unsupervised. Pricing, discounts, and delivery fees are all recalculated server-side at checkout regardless of what the client sends, and every tenant's product config, orders, and analytics are scoped so a shared deployment can't leak between stores.",
    architecture: [
      "Next.js App Router with a route-group split — (storefront) for the public one-page funnel, admin for the content/orders dashboard, api for checkout, admin actions, analytics, health, and webhooks.",
      "PostgreSQL in production (SQLite only for local demos), with tenant-scoped schema so the same deployment can serve one store or many.",
      "Checkout pricing is always recomputed server-side at submission — the client-side price shown is never trusted — with duplicate-submission protection and admin notifications on new orders.",
      "Docker Compose for self-hosted deployment, with a documented single-tenant Vercel + Neon path as the low-friction alternative.",
      "An optional Redis-compatible queue handles notification retries and background jobs rather than sending them inline on the request path.",
    ],
    decisions: [
      {
        title: "Server-side pricing is non-negotiable",
        body:
          "Every checkout submission recalculates price, discount, and delivery fee from the database, never from what the client posts. A single-product storefront is exactly the kind of app where a client-trusted price field is the obvious attack — so the design closes it structurally rather than relying on validation someone could forget to add.",
      },
      {
        title: "One codebase, two deployment shapes",
        body:
          "Single-tenant (one owner, one storefront) and multi-tenant (many owners, tenant-scoped domains, orders, and analytics) run from the same code, gated by an APP_MODE setting rather than a fork. That keeps a simple one-store deployment simple, without closing the door on running it as a pooled platform later.",
      },
      {
        title: "Health checks report status only, never secrets",
        body:
          "The /api/health payload reports app, database, and queue status and nothing else — a lesson carried over from operating other production services, where a health endpoint is a public URL by definition and has to be designed as one from the start.",
      },
    ],
    stack: [
      "Next.js (App Router)",
      "TypeScript",
      "PostgreSQL",
      "Tailwind CSS",
      "Docker Compose",
      "Redis-compatible queue",
    ],
    knownGaps: [
      "No automated test suite yet — verification is manual QA and a documented checklist rather than CI-run tests, unlike the other two projects here.",
      "Online payments, courier API integration, and multi-product carts are out of scope for v1 — Cash on Delivery only.",
      "Source is private, so this writeup and the live storefront stand in for reading the code.",
    ],
  },
];
