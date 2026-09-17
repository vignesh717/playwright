class APIUtils
{
    constructor(apiContext, loginPayLoad){
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }


    async getToken(){
        console.log("Payload: ", this.loginPayLoad);
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', 
        {
            data: this.loginPayLoad
        })
            // await expect (loginResponse.ok()).toBeTruthy();
            const loginResponseBody  = await loginResponse.json();
            let token = loginResponseBody.token;
            return token;
    }

    async createOrder(createOrderPayLoad){
        let response = {};
        response.token = await this.getToken();

        const createOrderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
        {
            data: createOrderPayLoad,
            headers:{
                'Authorization': response.token,
                'Content-Type': 'application/json'
            },
        });
        const createOrderResponseJSON = await createOrderResponse.json();
        response.orderID = await createOrderResponseJSON.orders[0];
        return response;
    }
}

module.exports = {APIUtils};
