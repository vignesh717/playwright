const { test, expect } = require('@playwright/test');

test('Browser Context Playwright Test', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('input[name="username"]');
    const userPwd = page.locator('input[name="password"]');
    const signInBtn = page.locator('#signInBtn');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    // await page.locator('input[name="username"]').fill("rahulshettyacademyy");
    // await page.locator('input[name="password"]').fill("Learning@830$3mK2)");
    // await page.locator('#signInBtn').click();
    // console.log(await page.locator('[style*="block"]').textContent());
    // await expect(page.locator('[style*="block"]')).toContainText("Incorrect username/password.");
    // await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await userPwd.fill("Learning@830$3mK2");
    await signInBtn.click();
    console.log("First product:", await page.locator('div.card-body a').first().textContent());
    console.log("Second product:", await page.locator('div.card-body a').nth(1).textContent());
    console.log("Last product:", await page.locator('div.card-body a').last().textContent());
    const allTitles = await page.locator('div.card-body a').allTextContents();
    console.log(allTitles);
});

test('Browser Context-Validating Error Login', async ({page})=>
{
    //Below line is to stop css and images API calls from loading to make test faster.
    await page.route("**/*.{jpg, png, jpeg, css}", route => route.abort());
    //Print all api request calls made by the page in the console.
    page.on('request', request => console.log(request.url()));
    //Print all api response calls ans its status made by the page in the console.
    page.on('response', response => console.log(response.url(), response.status()));
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator('[value="Login"]').click();
    await page.waitForLoadState('networkidle');    // Wait for the network to be idle after login
    await page.locator('.card-body b').first().waitFor({timeout: 10000});
    const allText = await page.locator('.card-body b').allTextContents();
    console.log(allText);
    
});

test('Page Context Playwright Test', async ({page})=>
{
    // await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.goto("https://google.com");
    await expect(page).toHaveTitle("Google");
});

test('Page Playwright Test', async ({page})=>
{
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect (page).toHaveTitle("Google");
});

test('UI Controls', async ({page})=>
{
    // const context = await browser.newContext();
    // const page = await context.newPage();
    const userName = page.locator('input[name="username"]');
    const userPwd = page.locator('input[name="password"]');
    const signInBtn = page.locator('#signInBtn');
    const docLink = page.locator('a[href*="documents-request"]');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await userName.fill("rahulshettyacademy");
    await userPwd.fill("Learning@830$3mK2");
    await page.locator("select.form-control").selectOption("consult");
    // await page.pause();
    await page.locator("span.checkmark").last().click();
    console.log(await page.locator("span.checkmark").last().isChecked());
    await expect(page.locator("span.checkmark").last()).toBeChecked();
    await page.locator("button#okayBtn").click();
    await page.locator("input#terms").check();
    await expect(page.locator("input#terms")).toBeChecked();
    // await expect(page.locator("input#terms")).isChecked.toBeTruthy();

    await page.locator("input#terms").uncheck();
    await expect(page.locator("input#terms")).not.toBeChecked();
    await expect(docLink).toHaveAttribute("class", "blinkingText");

    await signInBtn.click();
    console.log("First product:", await page.locator('div.card-body a').first().textContent());
    console.log("Second product:", await page.locator('div.card-body a').nth(1).textContent());
    console.log("Last product:", await page.locator('div.card-body a').last().textContent());
    const allTitles = await page.locator('div.card-body a').allTextContents();
    console.log(allTitles);
});

test('Child Window Handling', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const documentLink = page.locator('a[href*="documents-request"]');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    
    const [newPage] = await Promise.all(
    [context.waitForEvent('page'),
    documentLink.click(),
    ])
    const text = await newPage.locator("p.im-para.red").textContent();
    console.log('text;', text);
    const arrayText = text.split('@');
    const domain = arrayText[1].split(' ')[0];
    const usersplit = arrayText[0].split(" ");
    const user = usersplit[usersplit.length - 1];
    const username = user + "@" + domain;
    console.log("user:", user);
    console.log("domain:", domain);
    console.log('username:', username);

    await page.bringToFront();
    await page.locator('input[name="username"]').fill(username);
    page.pause();

});

