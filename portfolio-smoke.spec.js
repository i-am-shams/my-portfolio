import { test, expect } from "@playwright/test";

test.describe("portfolio smoke tests", () => {
  test("homepage presents senior enterprise positioning", async ({ page }) => {
    const pageErrors = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await page.goto("/");

    await expect(page).toHaveTitle(/Enterprise Software Engineering Leader/);
    await expect(
      page.getByRole("heading", {
        name: /I lead enterprise delivery .* build and operate the systems myself/i,
      }),
    ).toBeVisible();
    // Years of experience is computed at build time from a fixed career-start
    // date, not hardcoded, so assert the shape ("N+") rather than a literal value.
    await expect(page.getByText(/^\d+\+$/).first()).toBeVisible();
    await expect(page.getByText("CWASA Digital Ecosystem")).toBeVisible();
    await expect(page.getByText("Certified ScrumMaster")).toBeVisible();
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

    // The diagram is the whole point of the section; assert it actually renders
    // rather than trusting that the file exists.
    // next/image lazy-loads, and DentalPMS now sits above this, so the diagram is
    // well below the fold. Scroll to it as a reader would, then assert it really
    // decoded - naturalWidth stays 0 for a broken or never-fetched image.
    const diagram = page.getByRole("img", { name: /Architecture diagram/i });
    await diagram.scrollIntoViewIfNeeded();
    await expect(diagram).toBeVisible();
    await expect
      .poll(async () => diagram.evaluate((img) => img.naturalWidth), { timeout: 10_000 })
      .toBeGreaterThan(0);

    await expect(page.getByText(/Liveness and readiness are separate endpoints/)).toBeVisible();
    await expect(page.getByText(/No IaC layer/)).toBeVisible();
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
    await expect(page.getByText("100k+", { exact: true })).toBeVisible();
  });
});
