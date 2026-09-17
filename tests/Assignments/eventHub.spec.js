const {test, expect} = require("@playwright/test");
const { equal } = require("node:assert");
const { assert } = require("node:console");
const BASE_URL = "https://eventhub.rahulshettyacademy.com/";
const EMAIL = "youtest@gmail.com";
const PASSWORD = "Password@123";

async function loginEventHub(page) {
    await page.goto(BASE_URL);
    await page.getByPlaceholder("you@email.com").fill(EMAIL);
    await page.getByLabel("password").fill(PASSWORD);
    await page.getByRole("button", {name:"Sign In"}).click();
    await page.getByRole('link', { name: 'Browse Events', exact: true });
    await expect(page.getByRole('link', { name: 'Browse Events', exact: true })).toBeVisible();
}

test("Create event, complete booking, and verify seat reduction", async({page})=>
{
    //Step 1 - Login
    await loginEventHub(page);

    //Step 2 - Create event
    const eventTitle = "Test Event";
    const eventCity = "Coimbatore";
    const eventVenue = "Coddissia Ground Coimbatore";
    const eventDateTime = "77777-07-07T07:59";
    let eventSeatAvailable;
    let eventSeatCheck;
    await page.getByRole('link', {name: 'Manage Events'}).click();
    await page.getByPlaceholder('Event title').fill(eventTitle);
    await page.selectOption('select[id="category"]', 'Sports');
    await page.getByLabel('City').fill(eventCity);
    await page.locator('//input[@id="venue"]').fill(eventVenue);
    await page.getByLabel('Event Date & Time').fill(eventDateTime);
    await page.locator('input[id="price-($)"]').fill('100');
    await page.locator('input[id="total-seats"]').fill('500');
    await page.getByTestId('add-event-btn').click();
    await page.locator('a[id="nav-events"]').click();
    await page.getByText(eventTitle).first().waitFor();
    await expect(page.getByRole('heading', {name: eventTitle})).toBeVisible();
    eventSeatAvailable = await page.getByRole('article').filter({ hasText: 'Test Event' }).getByText('seats available').textContent();
    console.log('seats available before booking: '+eventSeatAvailable);
    await page.getByRole('article').filter({ hasText: 'Test Event' }).getByTestId('book-now-btn').click();
    await page.getByRole('textbox', { name: 'Full Name*' }).fill('Test Name');
    await page.getByTestId('customer-email').fill('testemail@gmail.com');
    await page.getByRole('textbox', { name: 'Phone Number*' }).fill('9876543210');
    await page.getByRole('button', { name: 'Confirm Booking' }).click();
    await page.getByText('Booking Confirmed!').waitFor();
    await expect(page.getByText('Booking Confirmed!')).toBeVisible();
    await page.locator('a[id="nav-bookings"]').click();
    await page.locator('div[id="booking-card"]').first().waitFor();
    await expect(page.locator('div[id="booking-card"]').filter({hasText:eventTitle}).first()).toBeVisible();    
    await page.locator('a[id="nav-events"]').click();
    await page.getByText(eventTitle).first().waitFor();
    await expect(page.getByRole('heading', {name: eventTitle})).toBeVisible();
    eventSeatCheck = await page.getByRole('article').filter({ hasText: 'Test Event' }).getByText('seats available').textContent();
    console.log('seats available after booking: '+eventSeatCheck);
    expect(Number(eventSeatCheck.split(' ')[0])).toBe((Number(eventSeatAvailable.split(' ')[0]) - 1));
    await page.pause();
    
}
);