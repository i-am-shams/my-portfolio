import { test, expect } from "@playwright/test";

test.describe("portfolio smoke tests", () => {
  test("homepage presents senior enterprise positioning", async ({ page }) => {
    const pageErrors = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await page.goto("/");

    await expect(page).toHaveTitle(/Enterprise Software Engineering Leader/);
    await expect(
      page.getByRole("heading", {
        name: /business-critical enterprise systems, reporting platforms, and operational dashboards/i,
      }),
    ).toBeVisible();
    await expect(page.getByText("14+").first()).toBeVisible();
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

    await page.getByRole("link", { name: "View Enterprise Case Study" }).click();

    await expect(page).toHaveURL(/#case-study/);
    await expect(page.getByRole("heading", { name: "CWASA Digital Ecosystem" })).toBeVisible();
  });


  test("homepage shows the self-directed build with a working live link", async ({ page }) => {
    const pageErrors = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "AI Job-Search Copilot" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "View live app" }),
    ).toHaveAttribute("href", "https://jobcopilot.dentflowbd.com");

    // The diagram is the whole point of the section; assert it actually renders
    // rather than trusting that the file exists.
    const diagram = page.getByRole("img", { name: /Architecture diagram/i });
    await expect(diagram).toBeVisible();
    expect(await diagram.evaluate((img) => img.naturalWidth)).toBeGreaterThan(0);

    await expect(page.getByText(/Liveness and readiness are separate endpoints/)).toBeVisible();
    await expect(page.getByText(/No IaC layer/)).toBeVisible();
    expect(pageErrors).toEqual([]);
  });

  test("hero CTA jumps to the engineering deep dive", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "See a System I Built" }).click();

    await expect(page).toHaveURL(/#engineering/);
    await expect(page.getByRole("heading", { name: "Engineering Deep Dive" })).toBeVisible();
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
    await expect(page.getByRole("link", { name: "View Enterprise Case Study" })).toBeVisible();
    await expect(page.getByText("100k+", { exact: true })).toBeVisible();
  });
});
