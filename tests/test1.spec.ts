import { test, expect } from "@playwright/test";

test("test1", async ({ page }) => {
    await page.goto("https://diplom-client-pi.vercel.app/master-classes/1");
    // await page.fill('input[placeholder = "Количество гостей"]', "123");
    // await page.click("._inputWrapper_etp1s_50 button");
    // await page.click("._content_1vbnb_15 button span", { force: true });
    await page.isVisible("._signOutBtn_1y7d7_20");
});
