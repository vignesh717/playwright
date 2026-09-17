const {test, expect} = require('@playwright/test');
test('Client App GetBy And Filter Logics', async ({page})=>
{
    const userEmail = "anshika@gmail.com"
    const targetProduct = "iphone 13 pro";
    const products = page.locator("div.card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").waitFor({ timeout: 10000 });
    await page.getByPlaceholder("email@example.com").fill(userEmail);
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await page.getByRole("button", {name:"Login"}).click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator("div.card-body").filter({hasText: "iphone 13 pro"}).locator("text= Add To Cart").click();
    await page.getByRole("listitem").getByRole("button", {name:"Cart"}).click();

    await page.locator("div li").first().waitFor();
    await expect(page.getByText(targetProduct)).toBeVisible();

    await page.getByRole('button', {name:"Checkout"}).click();
    await page.getByPlaceholder("Select Country").pressSequentially('India', {delay: 50});

    await page.getByRole("button", {name:"India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText("Thankyou for the order"));
    
});

