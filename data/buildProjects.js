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
      plate: "tenant-filter",
      title:
        "Tenant isolation in DentalPMS: hand-written clinic filters hoisted into one global query filter",
      desc:
        "Before and after. On the left, a dashed box holding three separate hand-written 'where clinic_id = ?' clauses, the third faded to stand for the one a developer eventually forgets. An arrow labelled 'hoist' leads to the right, where the appointments, billing and charting modules all send their queries through a single diamond labelled 'global filter' before reaching one postgres database.",
      aphorism: "One filter. Every query.",
      caption:
        "Tenant scoping is applied by EF Core global query filters at the DbContext, not by a WHERE clause each developer has to remember. In a multi-tenant medical system a forgotten filter is not a bug, it is a data breach - so the design makes the unsafe query impossible to write by accident, and IgnoreQueryFilters() is permitted only in narrow, documented admin paths.",
    },
    screenshot: {
      src: "/dentalpms-dashboard.png",
      width: 1400,
      height: 900,
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
    tagline:
      "Event-driven AI matching pipeline with a polyglot microservice, deployed and observed end to end",
    liveUrl: "https://jobcopilot.dentflowbd.com",
    repoUrl: "https://github.com/i-am-shams/ai-jobsearch-copilot",
    sourceNote: null,
    demo: null,
    stats: null,
    diagram: {
      plate: "fanout",
      title:
        "Fanout in the AI Job-Search Copilot: one queue round-robining between two consumers, replaced by an exchange that copies every event to both",
      desc:
        "Before and after. On the left, a dashed box labelled 'round-robin' in which one queue splits its deliveries between two consumers, each edge marked one half. An arrow labelled 'fan out' leads to the right, where a diamond labelled 'exchange' delivers to two independent services, api and notifications, each writing to its own store - postgres and mongo.",
      aphorism: "One publish. Two copies.",
      caption:
        "Request flow: the worker publishes once to a fanout exchange rather than a queue, so the API and the notifications service each get an independent copy of every event - the fix for a real bug where a second consumer on the same queue would have silently split the API's own messages.",
    },
    // A second figure, deliberately: the plate above argues one decision, this one
    // shows what actually runs. See the two figure types in docs/diagram-standard.md.
    topology: {
      plate: "copilot-topology",
      title:
        "Deployment topology of the AI Job-Search Copilot: seven containers on one VPS, with three managed services outside it",
      desc:
        "A deployment map. A browser reaches an nginx shared with an unrelated production app, which forwards over the Docker network to the project's own frontend container, then to an ASP.NET Core API. The API publishes to a RabbitMQ match-requests queue, which a background worker consumes; the worker scores the match against the Gemini API, writes results to PostgreSQL through EF Core, and publishes once to a fanout exchange. A Node.js notifications service binds its own queue to that exchange and writes to MongoDB Atlas, while an Alloy agent ships metrics and logs to Grafana Cloud. A dashed edge carries the SignalR push back from the API to the browser. Everything inside the dashed boundary is a container on one VPS; the Gemini API, MongoDB Atlas and Grafana Cloud sit outside it, drawn as outlines rather than filled boxes.",
      aphorism: "One box. Three clouds.",
      caption:
        "What actually runs: seven containers under one Docker Compose file on a single VPS, and the three managed services the system leans on but does not operate - drawn as outlines to keep that boundary visible. The nginx at the top is shared with an unrelated production app, which is why Alloy's scrape config is scoped to this stack's own containers rather than the whole host.",
    },
    summary:
      "Paste a resume and a job description, get an AI-generated match score and gap analysis. The interesting part is not the AI call - it is that the work happens asynchronously through a message queue and a background worker, with the result pushed back to the browser in real time rather than polled for, and that a second, independent Node.js service now reacts to the same completion event without touching the first service's code or database.",
    why:
      "Built deliberately as a distributed system rather than a CRUD app, to exercise the architecture patterns end to end: message queue, background worker, real-time push, containerization, CI/CD, and a production deployment with health gating. Extended into a second phase to add a genuinely polyglot bounded context, managed cloud infrastructure, centralized observability, and real IaC - the microservices and cloud-native side of the same system.",
    architecture: [
      "ASP.NET Core 8 API publishes a durable message to RabbitMQ instead of calling the AI provider inline, so a slow or failing model never blocks a request.",
      "A C# BackgroundService worker consumes with manual ack and prefetch 1, calls Gemini, persists to PostgreSQL via EF Core, then publishes once to a fanout exchange rather than a queue.",
      "Two independent consumers each bind their own durable queue to that exchange: the API, which pushes results to the right browser over SignalR using per-user groups keyed on the JWT subject claim; and a separate Node.js/TypeScript notifications service, which records its own document to its own MongoDB Atlas cluster - a different database technology, with no dependency on the API/worker's code or Postgres database.",
      "Grafana Alloy ships host and per-container metrics and logs to Grafana Cloud, explicitly scoped to this project's own containers on a VPS that also runs an unrelated production app.",
      "Terraform manages the MongoDB Atlas resources (imported, not created, since the cluster already held real data) and the VPS deploy path itself via file/remote-exec provisioners - deliberately excluding the server's secrets file from IaC, since templating live credentials on a first apply was judged a worse risk than the manual step it replaced.",
      "Seven containers via Docker Compose, with datastores unpublished and the API bound to loopback only; the frontend's own nginx proxies the API on the same origin, so production needs no CORS at all. GitHub Actions builds four images and deploys on push to master, behind a deploy key pinned to a forced command so a leaked CI secret cannot open a shell.",
    ],
    decisions: [
      {
        title: "A queue is point-to-point; an exchange is pub/sub",
        body:
          "Adding the notifications service as a second consumer of the worker's existing completion queue would have made RabbitMQ round-robin deliveries between it and the API - silently dropping roughly half of all live SignalR pushes. Caught by reading the existing consumer's code before writing a new one, not by testing after the fact. Fixed at the architecture level: the worker now publishes once to a fanout exchange, and each service binds its own queue to it. Verified via RabbitMQ's own per-queue message stats after a real submission - one delivery and one ack on both queues, not just one.",
      },
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
        title: "Terraform adopted an already-live system without touching it",
        body:
          "The Atlas cluster and its database user already held real data, so nothing was apply-created - everything was imported, then `terraform plan` was used to find where the written config diverged from live reality before any apply. That caught a real security finding (the notifications DB user holds far broader privileges than it needs) which was deliberately left unfixed in the same pass - narrowing a live credential's access is a separate decision from adopting IaC, not a side effect of it.",
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
      "Node.js",
      "MongoDB Atlas",
      "Terraform",
      "Grafana Cloud",
      "TanStack Query",
      "Docker Compose",
      "nginx",
      "GitHub Actions",
      "Google Gemini",
    ],
    // Named honestly rather than omitted; the gaps are as informative as the wins.
    knownGaps: [
      "The notifications database user holds broader privileges than it needs (full admin rather than scoped access) - found via Terraform, deliberately not silently fixed in the same pass.",
      "No dead-letter queue - poison messages are dropped rather than stalling the worker, which is correct but means the message is gone.",
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
      plate: "server-price",
      title:
        "Checkout pricing in One-Page Commerce: the client-posted total is discarded and recomputed server-side",
      desc:
        "Before and after. On the left, a dashed box labelled 'client-posted total' in which a browser sends 'total: 499' straight into checkout. An arrow labelled 'recompute' leads to the right, where the same request arrives but its price is stopped by a cross before it reaches checkout; checkout instead reads from a pricing store and arrives at a different total, 449.",
      aphorism: "Client asks. Server decides.",
      caption:
        "Every checkout submission recalculates price, discount, and delivery fee from the database, never from what the client posts. A single-product storefront is exactly the kind of app where a client-trusted price field is the obvious attack - so the design closes it structurally rather than relying on validation someone could forget to add.",
    },
    screenshot: {
      src: "/onepagecommerce-storefront.png",
      width: 1280,
      height: 900,
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
