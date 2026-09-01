export const kbEntries = [
  {
    slug: "purge",
    category: ["Azure", "Pipeline"],
    title:
      "A conditional that has never been true is untested by any number of green runs",
    context:
      "Deleting an Azure resource group soft-deletes an API Management service for 48 hours and holds its name. Recreating with the same name fails with 'service name is not available' — which reads like a naming collision, not a deletion artefact. The pipeline had a step to purge any soft-deleted instance before provisioning ran.",
    mechanism:
      "The purge step used `az rest --method delete`. Purging an APIM service is a long-running ARM operation: it returns HTTP 202 with an async-operation header, and `az rest` is a raw HTTP call that doesn't follow it. The step fired, returned in roughly one second, and deployment started while the purge was still in flight. It would have failed with the exact error it existed to prevent. That it didn't fail across eleven green runs isn't reassuring: nothing had ever been soft-deleted, the branch condition was never true, and the step was never reached. `az apim deletedservice purge` — which polls to completion — took 91 seconds against a name that had checked as unavailable a minute earlier. `az rest` returned in one.",
    pattern:
      "Use `az apim deletedservice purge`, which polls the async operation to completion. If you use `az rest` for ARM calls that return 202, you must follow the async-operation header yourself or the operation is fire-and-forget.",
    rule: "A conditional that has never been true is untested by any number of green runs.",
  },
  {
    slug: "silent-overcharge",
    category: ["Testing"],
    title:
      "Automated tests tell you the code does what you told it to — they don't tell you the product works",
    context:
      "A coupon code entered before signing in was not persisted across the sign-in redirect. A user who applied a valid coupon, signed in to submit, and returned found the coupon gone. The order was placed at full price with no message. On a €75 basket, that silently costs the customer €11.25. The full test suite was green.",
    mechanism:
      "The session state carrying the coupon was not durable across the redirect. The tests didn't find it because no test drove the cross-redirect flow as a user would. The same manual session surfaced two further defects the suite also missed: a CSS `color-scheme` declaration made the quantity buttons white-on-white in dark mode, and the menu had no retry on cold start, leaving a permanent error state until manual refresh. None of these were hard to find — they appeared in ordinary use.",
    pattern:
      "Drive the application through representative user flows, including flows that cross a redirect boundary, before concluding the test suite gives you meaningful confidence.",
    rule: "Automated tests tell you the code does what you told it to. They don't tell you the product works.",
  },
  {
    slug: "false-rejection",
    category: ["React", "Auth"],
    title:
      "When you infer state from a correlated condition, you inherit every other situation where that condition is also true",
    context:
      "After a sign-in redirect on a coupon service, an effect needed to restore the coupon preview. It needed to know whether the page had just returned from a redirect, and had no direct signal, so it tested a correlated condition instead: menu loaded, basket has lines, coupon code present.",
    mechanism:
      "All three conditions are also true on the first keystroke in the coupon field. So entering a valid code triggered a validation request for the first character, received 'not found', and rendered a rejection panel — before the user had finished typing. The correlated condition was satisfied at exactly the wrong moment. The correct signal — `handleRedirectPromise()` returning non-null — was already provided by the auth library and would have been unambiguous.",
    pattern:
      "Use `handleRedirectPromise()` returning non-null as the redirect signal. It is direct; it is only true when the page has just returned from a redirect.",
    rule: "When you infer state from a correlated condition, you inherit every other situation where that condition is also true.",
  },
  {
    slug: "in-memory-provider",
    category: ["EF Core", "Testing"],
    title:
      "A test double that silently lacks the capability under test gives you a green suite that proves nothing",
    context:
      "Tests on a coupon service ran against the EF Core in-memory provider. Coupon redemption depended on `ExecuteUpdateAsync` and transactions — exactly the two mechanisms that enforced the core concurrency invariant.",
    mechanism:
      "The EF Core in-memory provider supports neither. Any order that applied a coupon returned a 500. The suite still passed because no test scenario exercised that path — but more precisely, no test could have: the provider couldn't support the operations regardless of how the tests were written. The most important invariant in the design had no coverage and no means of getting any. Moving to SQLite in-memory, which supports both, restored it.",
    pattern:
      "Prefer SQLite in-memory over the EF Core in-memory provider for tests that touch update or transactional paths. The EF Core in-memory provider is safe only for tests that never leave basic CRUD.",
    rule: "A test double that silently lacks the capability under test gives you a green suite that proves nothing.",
  },
  {
    slug: "sql-sid",
    category: ["Azure", "SQL"],
    title:
      "The identifier that works in one Azure service is not necessarily the one another expects",
    context:
      "Granting a managed identity access to Azure SQL from a pipeline. The normal path — `CREATE USER [name] FROM EXTERNAL PROVIDER` — requires the SQL Server to hold the Directory Readers role in Entra, which is a tenant-admin grant and cannot be provisioned from an application pipeline.",
    mechanism:
      "The alternative supplies the SID directly, skipping the lookup: `CREATE USER [name] WITH SID = 0x..., TYPE = E`. The trap: the SID here is the identity's client ID (application ID), not its object ID. Everywhere else in Azure, role assignments use the object ID. Using the wrong one creates a user that exists without error and then silently fails to authenticate. A second trap: `SUSER_SNAME()` returns `<client-id>@<tenant-id>` rather than the display name, because a SID-provisioned user was never resolved against Entra. `USER_NAME()` returns what you expect.",
    pattern:
      "Use the managed identity's client ID (application ID) as the SID value, not the object ID. Verify the created user with `USER_NAME()`, not `SUSER_SNAME()`.",
    rule: "The identifier that works in one Azure service is not necessarily the one another expects.",
  },
  {
    slug: "apim-tier-limit",
    category: ["Azure", "API Management"],
    title:
      "When a platform feature is missing at a tier, check whether the reason is architectural before assuming it's commercial",
    context:
      "`rate-limit-by-key` is not supported on the Azure API Management Consumption tier.",
    mechanism:
      "Per-key rate limiting requires a distributed counter — a value that persists and is shared across all gateway instances handling requests for a given key. A Consumption tier gateway scales to zero and doesn't maintain state between requests: the counter has nowhere to live. Subscription-scoped limiting works because the subscription is already a tracked entity in APIM's own persistent model; it doesn't need a distributed counter. The missing feature is the absence of that state layer, not a pricing decision.",
    pattern:
      "On Consumption, use subscription-scoped rate limiting. If per-key limiting against arbitrary keys is a hard requirement, it belongs on a tier that maintains distributed state — or in application-layer middleware.",
    rule: "When a platform withholds a feature at a tier, check whether the reason is architectural before assuming it's commercial.",
  },
];
