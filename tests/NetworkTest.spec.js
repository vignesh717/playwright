const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./utils/APIUtils.js');
const loginPayLoad = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const createOrderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const fakePayLoadOrder = { data: [], message: "No Orders" };

let response;


test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(createOrderPayLoad);
    console.log('Response: ', response);

});

test('Route and fake the API response to validate', async ({ page }) => {
    const apiContext = request.newContext();
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.waitForLoadState('networkidle');

    // Below logic is to get the API response for the specific API call and modify it as per the test requirement.
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrder);
            route.fulfill(
                {
                    response,
                    body,
                }
            )
        });
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    // await page.pause();
    console.log(await page.locator('div.mt-4').textContent());
    expect(await page.locator('div.mt-4').textContent()).toContain('You have No Orders to show at this time. Please Visit Back Us');

})

