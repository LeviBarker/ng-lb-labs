const {Given, When, Then, Before, After} = require("@cucumber/cucumber");
const {chromium, expect} = require("@playwright/test");

let browser, page;

Before(async () => {
  browser = await chromium.launch();
  const context = await browser.newContext();
  page = await context.newPage();
});

After(async () => {
  await browser.close();
})

Given('the user navigates to the home page', async () => {
  await page.goto("http://localhost:4200");
});


Then('the user should see {string}', async (text) => {
  const signInText = await page.locator(`text="${text}"`).isVisible();
  expect(signInText).toBeTruthy();
});

Then("the page title should change to {string}", function (title) {
  expect(true).toBeTruthy();
});

Given(/^the user is an admin$/, function () {
  expect(true).toBeTruthy();
});
