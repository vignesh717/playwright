const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils.js');

const loginPayLoad = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"};
const createOrderPayLoad = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let response;


test.beforeAll( async ()=>
{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(createOrderPayLoad);
    console.log('Response: ', response);

});

test('Verify New Order ID In Orders Page', async({page})=>
{
    const apiContext = request.newContext();
    //Logging in with API token in local storage
    await page.addInitScript(value =>{
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/myorders');
    await page.waitForLoadState('networkidle');
    await page.locator('h1').waitFor();
    expect(await page.locator('h1')).toHaveText('Your Orders');
    const rows = await page.locator('tbody tr');
    for(let i=0; i<rows.count(); ++i){
        const rowOrderId = await rows.nth(i).locator('th').textContent();
        if(rowOrderId.includes(response.orderID)){
            console.log("Order ID is present in the orders page");
            break;
            
        } 
    }
    await page.pause();
})
    