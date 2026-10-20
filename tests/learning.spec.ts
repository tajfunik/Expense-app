import { test, expect } from '@playwright/test';


test.describe('Ucime sa playwright', () => {

    //Hook
    test.beforeEach( async ({page}) => {
        //await page.goto('https://playground.bondaracademy.com/')
        //await page.getByText('Forms').click()
        //await page.getByText('Form Layout').click()

        await page.goto('http://localhost:3000/')

    });

    test('Locator syntax rules', async ({page}) =>{
        // find element by tag name
        page.locator('input')

        //find leement by ID
        page.locator('#inputEmail')

        //find by class attribute
        page.locator('.class-input')

        //find by any attribute
        page.locator('[placeholder="Email"]')

        //find by full class value
        page.locator('[class="input-full*width size-medium"]')

        //find by everal selectors
        page.locator('input[placeholder="Email"].class-input')

        //find by Xpath (Not recommended)
        page.locator('//*[@id=""]')

        //find by text
        page.locator(':test("Using")')
    });

    test('User visible locators', async ({page}) => {
        await page.getByRole('button', {name: 'Login'}).click()

        await page.getByRole('textbox', {name: "Email"}).fill('martin@gmail.com')

        await page.getByLabel('Email').fill('martin@gmail.com')

        await page.getByPlaceholder('Password').fill('123456')

        await page.pause();
    });

    test('Locating child elements', async ({page}) => {
        //we can use locator more time
        await page.locator('card').locator('card-header').click()

        //we can use "index" pr "nth"
    });

    test('Locating parent element', async ({page}) => {
        //provide this method we can use locator with second "hasText" or "has" and then find child
        //use filter method
        //if we want to go one level up, using structure ".locator('..')" = xPath
    });

});