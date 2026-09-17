const { test, expect } = require('@playwright/test');


test('Security test request interception', async ({ page }) => {

    const userEmail = "anshika@gmail.com"
    const targetProduct = "iphone 13 pro";
    const products = page.locator("div.card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").waitFor({ timeout: 10000 });
    await page.locator("#userEmail").fill(userEmail);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator("button[routerlink*='myorders']").click();
    
    //API request modification. Modifying the request URL to get different order details.
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({
            url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6aabd2cc2be7a4bc2b5557f4',
        })
    )    
    await page.locator('button:has-text("View")').first().click();
    // await page.pause();
    expect(await page.locator('p.blink_me').textContent()).toContain('You are not authorize to view this order');
})