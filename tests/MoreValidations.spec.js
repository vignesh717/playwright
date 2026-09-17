const {test, expect} = require('@playwright/test')

test("Popup Validations", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#show-textbox")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.pause();
    await page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.getByRole("button", {name:'Mouse Hover'}).hover();
    const framesPage = await page.frameLocator("#courses-iframe");
    framesPage.locator('li a[href*="lifetime-access"]:visible').click();
    const text = await framesPage.locator('div.text h2').textContent();
    console.log("Number of subscribers: ", text.split(' ')[1]);

}    
);