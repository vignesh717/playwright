const {test, expect} = require('@playwright/test');
test('Client App Login', async ({page})=>
{
    const userEmail = "anshika@gmail.com"
    const targetProduct = "iphone 13 pro";
    const products = page.locator("div.card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    // await page.setViewportSize({ width: 1920, height: 1080 });
    await page.locator("#userEmail").waitFor({ timeout: 10000 });
    await page.locator("#userEmail").fill(userEmail);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    const titleCount = await products.count();
    console.log(titles);
    for(let i=0; i<titleCount; i++){
        const productName = await products.nth(i).locator("b").textContent();
        if(productName.toLowerCase() === targetProduct.toLowerCase())
        {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("button[routerlink='/dashboard/cart']").click();
    await page.waitForLoadState('networkidle');
    await page.locator("text=My Cart").waitFor();
    const cartItemData = await page.locator("div[class='cart'] li");
    const cartItemCount = await cartItemData.count();
    for(let i=0; i<cartItemCount; i++){
        const cartItemName = await cartItemData.nth(i).locator('h3').textContent();
        if(cartItemName.toLowerCase() === targetProduct.toLocaleLowerCase()){
            console.log("Product added to cart");
            const stockCheck = await cartItemData.nth(i).locator('p[class="stockStatus"]').textContent();
            if(stockCheck.toLowerCase() === "in stock"){
                console.log("Product is in stock");
            }
        }
    }
    await page.locator("text=Checkout").click();
    await page.waitForLoadState('networkidle');
    await page.locator("text=Place Order ").waitFor();
    await page.locator('input[placeholder="Select Country"]').pressSequentially('India', {delay: 50});
    await page.locator('section.ta-results button').first().waitFor();

    const optionsCount = await page.locator('section.ta-results button').count();
    for(let i=0; i<optionsCount; i++){
        const optionText = await page.locator('section.ta-results button').nth(i).textContent();
        if(optionText === " India"){
            await page.locator('section.ta-results button').nth(i).click();
            break;
        }
    }

    expect(await page.locator('div.details__user label')).toHaveText(userEmail);
    await page.locator("text=Place Order ").click();
    await page.waitForLoadState('networkidle');
    await page.locator('label[class="ng-star-inserted"]').waitFor();
    const newOrderID = await page.locator('label[class="ng-star-inserted"]').textContent();
    console.log("Order ID: ", newOrderID);

    //Verify order in order history
    await page.locator('button[routerlink="/dashboard/myorders"]').click();
    await page.waitForLoadState('networkidle');
    await page.locator('h1').waitFor();
    expect(await page.locator('h1')).toHaveText('Your Orders');
    const rows = await page.locator('tbody tr');
    for(let i=0; i<rows.count(); ++i){
        const rowOrderId = await rows.nth(i).locator('th').textContent();
        if(newOrderID.includes(rowOrderId)){
            await rows.nth(i).locator('button').first().click();
            break;
        } 
    }
            // await page.locator('div[class="email-title"]').waitFor();
            // expect(await page.locator('div[class="email-title"]')).toBeVisible();
            // await page.screenshot({ path: 'orderHistory.png' });
            // await page.pause();
});


//youtest@gmail.com
//Password@123