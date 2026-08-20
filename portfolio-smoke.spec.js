import { test, expect } from "@playwright/test";

test.describe("portfolio smoke tests", () => {
  test("homepage presents senior enterprise positioning", async ({ page }) => {
    const pageErrors = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await page.goto("/");

    await expect(page).toHaveTitle(/Enterprise Software Engineering Leader/);
    await expect(
      page.getByRole("heading", {
        name: /I build and operate the systems I lead/i,
      }),
    ).toBeVisible();
    // Years of experience is computed at build time from a fixed career-start
    // date, not hardcoded, so assert the shape ("N+") rather than a literal value.
    await expect(page.getByText(/^\d+\+$/).first()).toBeVisible();
    await expect(page.getByText("CWASA Digital Ecosystem")).toBeVisible();
    await expect(page.getByText(/Certified ScrumMaster \(2023-2025\)/).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Download Resume", exact: true }).first()).toHaveAttribute(
      "href",
      "/Khalid_Shams_Resume.pdf",
    );
    expect(pageErrors).toEqual([]);
  });

  test("homepage case-study CTA jumps to flagship case study", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Enterprise case study" }).click();

    await expect(page).toHaveURL(/#case-study/);
    await expect(page.getByRole("heading", { name: "CWASA Digital Ecosystem" })).toBeVisible();
  });


  test("homepage shows the self-directed build with a working live link", async ({ page }) => {
    const pageErrors = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await page.goto("/");

    // DentalPMS is the lead build; the copilot follows it.
    await expect(page.getByRole("heading", { name: "DentalPMS" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "AI Job-Search Copilot" }),
    ).toBeVisible();
    const dentalPmsCard = page.locator("article", {
      has: page.getByRole("heading", { name: "DentalPMS" }),
    });
    const copilotCard = page.locator("article", {
      has: page.getByRole("heading", { name: "AI Job-Search Copilot" }),
    });
    await expect(
      copilotCard.getByRole("link", { name: "View live app" }),
    ).toHaveAttribute("href", "https://jobcopilot.dentflowbd.com");
    await expect(
      dentalPmsCard.getByRole("link", { name: "Open live demo" }),
    ).toHaveAttribute("href", "https://demo.dentflowbd.com/login");
    // Source is private, so the absence of a repo link must be explained rather
    // than just missing.
    await expect(dentalPmsCard.getByText(/Source is private/)).toBeVisible();
    await expect(dentalPmsCard.getByText("Lines of C#")).toBeVisible();

    // The figures are the whole point of the section. The Copilot carries two:
    // a decision plate arguing the fanout, and a topology plate showing what runs.
    // Both are inline SVG, so there is no image to decode - assert instead that
    // they are actually on the page and have real geometry.
    for (const name of [
      /Fanout in the AI Job-Search Copilot/i,
      /Deployment topology of the AI Job-Search Copilot/i,
    ]) {
      const figure = page.getByRole("img", { name });
      await figure.scrollIntoViewIfNeeded();
      await expect(figure).toBeVisible();
      const box = await figure.boundingBox();
      expect(box.height).toBeGreaterThan(100);
    }

    // The Mermaid render this replaced is no longer served to anyone.
    await expect(page.locator('img[src*="jobcopilot-architecture"]')).toHaveCount(0);

    await expect(page.getByText(/Liveness and readiness are separate endpoints/)).toBeVisible();
    await expect(
      page.getByText(/A queue is point-to-point; an exchange is pub\/sub/),
    ).toBeVisible();
    await expect(page.getByText(/The notifications database user holds broader privileges/)).toBeVisible();
    expect(pageErrors).toEqual([]);
  });

  test("hero CTA jumps to the engineering deep dive", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "See systems running in production" }).click();

    await expect(page).toHaveURL(/#engineering/);
    await expect(page.getByRole("heading", { name: "Engineering Deep Dive" })).toBeVisible();
  });


  test("GitHub is reachable from the page, not just from structured data", async ({ page }) => {
    // Regression guard for the original defect: siteProfile.github existed but was
    // only ever emitted inside JSON-LD sameAs, so no human could click it.
    await page.goto("/");

    await expect(
      page.getByRole("link", { name: "GitHub profile" }),
    ).toHaveAttribute("href", "https://github.com/i-am-shams");
    await expect(
      page.getByRole("contentinfo").getByRole("link", { name: "GitHub" }),
    ).toBeVisible();
  });

  test("hero has exactly one primary call to action", async ({ page }) => {
    await page.goto("/");

    const primary = page.getByRole("link", { name: "See systems running in production" });
    await expect(primary).toBeVisible();
    await expect(primary).toHaveAttribute("href", "#engineering");
  });

  test("CV lists the live projects and drops the internal note", async ({ page }) => {
    await page.goto("/cv");

    await expect(page.getByRole("heading", { name: "Selected Projects" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "DentalPMS — Live demo" }),
    ).toHaveAttribute("href", "https://demo.dentflowbd.com/login");

    // Skills must reflect what is actually used now, and must not date the CV.
    await expect(page.getByText("PostgreSQL").first()).toBeVisible();
    await expect(page.getByText("RabbitMQ").first()).toBeVisible();
    await expect(page.getByText("Firebug")).toHaveCount(0);

    // Internal note-to-self, previously visible to employers.
    await expect(page.getByText(/Resume download strategy/)).toHaveCount(0);
  });

  test("CV page shows recruiter-oriented resume sections", async ({ page }) => {
    await page.goto("/cv");

    await expect(page).toHaveTitle(/Enterprise Software Engineering Leader/);
    await expect(page.getByRole("heading", { name: "KHALID SHAMS" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Target Roles" })).toBeVisible();
    await expect(page.getByText("Senior Software Engineer")).toBeVisible();
    await expect(page.getByText("Reporting Systems Engineer")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Enterprise Domains" })).toBeVisible();
    await expect(page.getByText("Utility Management")).toBeVisible();
    await expect(page.getByRole("link", { name: "Download Resume PDF" })).toHaveAttribute(
      "href",
      "/Khalid_Shams_Resume.pdf",
    );
    await expect(page.getByRole("button", { name: "Save as PDF" })).toBeVisible();
  });

  test("navigation and theme toggle work", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "CV", exact: true }).click();
    await expect(page).toHaveURL(/\/cv$/);

    await page.getByRole("button", { name: /switch to/i }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("mobile viewport keeps primary content accessible", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await expect(page.getByText("Enterprise Software Engineering Leader").first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Enterprise case study" })).toBeVisible();
    await expect(page.getByText("100k+", { exact: true }).first()).toBeVisible();
  });

  test("every build project renders its architecture plate", async ({ page }) => {
    await page.goto("/");

    // One plate per build project, resolved through components/diagrams/index.js.
    // Asserting the count as well as each name catches a registry key that fell
    // through to nothing - a missing plate would otherwise just look like a
    // slightly shorter card.
    const plateNames = [
      /Tenant isolation in DentalPMS/i,
      /Fanout in the AI Job-Search Copilot/i,
      /Deployment topology of the AI Job-Search Copilot/i,
      /Checkout pricing in One-Page Commerce/i,
    ];

    for (const name of plateNames) {
      const plate = page.getByRole("img", { name });
      await plate.scrollIntoViewIfNeeded();
      await expect(plate).toBeVisible();

      // Inline SVG cannot fail to "load", but it can render as a zero-height box
      // if the viewBox or the sizing classes regress, which reads as absent.
      const box = await plate.boundingBox();
      expect(box.width).toBeGreaterThan(200);
      expect(box.height).toBeGreaterThan(100);
    }

    await expect(page.locator("svg[role='img'] > title")).toHaveCount(4);

    // The aphorism is drawn by <Plate>, so if it is missing the wrapper was
    // bypassed and the figure is off-standard.
    for (const line of [
      "One filter. Every query.",
      "One publish. Two copies.",
      "One box. Three clouds.",
      "Client asks. Server decides.",
    ]) {
      await expect(page.getByText(line, { exact: true })).toBeVisible();
    }
  });

  test("plates stay visible in dark mode", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /switch to/i }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    // The dark palette is the invented half of the standard - the light plate is
    // copied from a reference, the dark one is not - so it gets its own check.
    const plate = page.getByRole("img", { name: /Fanout in the AI Job-Search Copilot/i });
    await plate.scrollIntoViewIfNeeded();
    await expect(plate).toBeVisible();

    const ground = await plate.evaluate((svg) =>
      getComputedStyle(svg).getPropertyValue("--plate-ground").trim(),
    );
    expect(ground).toBe("#12180f");
  });

  test("each build project keeps its screenshot alongside the plate", async ({ page }) => {
    await page.goto("/");

    // A plate proves the system was designed; a screenshot proves it exists.
    // Both belong on the card, and the intrinsic dimensions must be the real
    // ones or next/image reserves a wrongly-shaped box and the page shifts.
    // Two, not three: the Copilot's slot held a Mermaid diagram rather than a
    // screenshot of anything, and is now a topology plate instead.
    const shots = [
      { name: /DentalPMS clinic admin dashboard/i, ratio: 1400 / 900 },
      { name: /One-Page Commerce storefront/i, ratio: 1280 / 900 },
    ];

    for (const shot of shots) {
      const img = page.getByRole("img", { name: shot.name });
      await img.scrollIntoViewIfNeeded();
      await expect(img).toBeVisible();
      await expect
        .poll(async () => img.evaluate((el) => el.naturalWidth), { timeout: 10_000 })
        .toBeGreaterThan(0);

      const declared = await img.evaluate((el) => ({
        w: Number(el.getAttribute("width")),
        h: Number(el.getAttribute("height")),
      }));
      expect(declared.w / declared.h).toBeCloseTo(shot.ratio, 2);
    }
  });

  test("project-count copy matches the three build projects", async ({ page }) => {
    await page.goto("/");

    // One-Page Commerce made this three; four separate sentences used to say two.
    await expect(page.getByText(/Two of the systems on this page/)).toHaveCount(0);
    await expect(page.getByText(/Both of these were designed/)).toHaveCount(0);
    await expect(
      page.getByText(/DentalPMS and the AI Job-Search Copilot are running/),
    ).toHaveCount(0);

    await expect(page.getByText(/Three of the systems on this page/)).toBeVisible();
    await expect(page.getByText(/All three were designed/)).toBeVisible();

    await page.goto("/cv");
    await expect(
      page.getByRole("heading", { name: "One-Page Commerce", exact: true }),
    ).toBeVisible();
  });

  test("recruiter questions are answered on the first screen", async ({ page }) => {
    // A recruiter screens before a hiring manager reads. These are the four things
    // they check, and all of them must clear the fold - on a phone as well as a desktop.
    for (const size of [
      { width: 1440, height: 900 },
      { width: 390, height: 844 },
    ]) {
      await page.setViewportSize(size);
      await page.goto("/");

      // At least one hard number above the fold. The old hero showed none on mobile:
      // the headline and lede filled the entire first screen.
      const metrics = page.getByLabel("Headline proof metrics");
      const box = await metrics.boundingBox();
      expect(box, `metrics missing at ${size.width}px`).not.toBeNull();
      expect(box.y + box.height, `metrics below fold at ${size.width}px`).toBeLessThan(
        size.height,
      );

      // "Can I actually hire this person" - answered by the aside on desktop and by
      // a one-line form on mobile, so assert the text is visible either way.
      // The answer appears twice - a one-line form for phones, the aside panel for
      // wider screens - so take whichever is visible here and require that it, too,
      // clears the fold. Being rendered somewhere down the page is not the point.
      const availability = page
        .getByText(/Remote roles worldwide/)
        .filter({ visible: true })
        .first();
      await expect(availability).toBeVisible();
      const availBox = await availability.boundingBox();
      expect(
        availBox.y + availBox.height,
        `availability below fold at ${size.width}px`,
      ).toBeLessThan(size.height);

      await expect(
        page.getByText(/UTC\+6/).filter({ visible: true }).first(),
      ).toBeVisible();
    }
  });

  test("no page asserts a credential that has lapsed", async ({ page }) => {
    // The CSM expired in Dec 2025. It may be shown historically, never in the
    // present tense - this site's whole argument is that its claims are checkable.
    for (const path of ["/", "/cv"]) {
      await page.goto(path);
      const body = await page.locator("body").innerText();
      const mentions = body.match(/Certified ScrumMaster[^.]*/g) ?? [];
      expect(mentions.length, `no CSM mention found on ${path}`).toBeGreaterThan(0);
      for (const mention of mentions) {
        expect(mention, `present-tense credential on ${path}: ${mention}`).toMatch(
          /2023/,
        );
      }
    }

    // The visible copy is only half of it. siteProfile.certification is emitted as a
    // schema.org hasCredential, which is a machine-readable assertion that the holder
    // holds it now - and it is the path a body-text check does not see. This gap was
    // found by mutation-testing, not by the suite passing.
    await page.goto("/");
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const credentials = blocks
      .flatMap((block) => (Array.isArray(JSON.parse(block)) ? JSON.parse(block) : [JSON.parse(block)]))
      .flatMap((node) => node.hasCredential ?? [])
      .map((credential) => credential.name);

    expect(credentials.length, "no hasCredential found in JSON-LD").toBeGreaterThan(0);
    for (const name of credentials) {
      expect(name, `JSON-LD asserts a lapsed credential as current: ${name}`).toMatch(/2023/);
    }
  });

  test("plain-text resume is served for ATS paste", async ({ page, baseURL }) => {
    const res = await page.request.get(`${baseURL}/resume.txt`);
    expect(res.status()).toBe(200);
    const text = await res.text();

    expect(text.length).toBeGreaterThan(1000);
    expect(text).not.toContain("{{YEARS}}");
    expect(text).not.toMatch(/<[a-z]+[\s>]/i);
    // Generated from resume.json, so every role must survive the render.
    for (const company of ["Today's Tech", "BJIT LTD", "CACTS LTD"]) {
      expect(text).toContain(company);
    }
  });

  test("the CV leads each recent role with engineering, not coordination", async ({
    page,
  }) => {
    await page.goto("/cv");
    const body = await page.locator("body").innerText();

    // The homepage claims "I build and operate the systems I lead". These bullets
    // are what a recruiter verb-scans to check that claim.
    expect(body).toMatch(/Architected the CWASA Digital Ecosystem/);
    expect(body).toMatch(/Designed and developed PDF creation software/);
    expect(body).toMatch(/Own end-to-end solution architecture/);
  });

  test("footer carries a recency signal", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/Last updated \w+ \d{4}\./)).toBeVisible();
  });
});
