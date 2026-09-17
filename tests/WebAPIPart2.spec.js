const {test, expect} = require('@playwright/test');
const userEmail = "anshika@gmail.com"
let webContext;

test.beforeAll(async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    // await page.setViewportSize({ width: 1920, height: 1080 });
    await page.locator("#userEmail").waitFor({ timeout: 10000 });
    await page.locator("#userEmail").fill(userEmail);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'}); 
    webContext = await browser.newContext({storageState: 'state.json'});

})

test('Client App Login', async ()=>
{   
    // a new page with the existing storage state so will login automatically
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const targetProduct = "iphone 13 pro";
    const products = page.locator("div.card-body");
    await page.pause();
});