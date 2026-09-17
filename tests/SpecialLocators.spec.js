import {test, expect} from '@playwright/test';

test('Plawright Special Locators', async({page}) =>{
    //Below is to set time limit for the test case.
    test.setTimeout(60000)
    // const slowExpect = expect.config({timeout: 6000});
    page.setDefaultTimeout(9000);
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Employed').check();
    await page.getByLabel('Gender').selectOption('Male');
    await page.getByPlaceholder('Password').fill('abc123');
    await page.getByRole('button', {name:'Submit'}).click();
    await page.getByText(' The Form has been submitted successfully!.').isVisible();

    //5 seconds default timout for expect assertion so overriding it to 7 seconds for the below assertion.
    await expect(page.getByText(' The Form has been submitted successfully!.')).toBeVisible({timeout: 7000});

    // At line number 4 we have created a new expect object with 6 seconds timeout and used it for the below assertion.
    await page.getByRole('link', {name: 'Shop'}).click();
    await expect(page.locator('.my-4').first()).toHaveText('Shop Name');

    await page.locator('app-card').filter({hasText: 'Nokia Edge'}).getByRole('button', {name: 'Add'}).click();

});