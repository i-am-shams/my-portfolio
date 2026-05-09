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
