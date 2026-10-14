import { test } from '@playwright/test';


test.describe('Ucime sa playwright', () => {

    //Hook
    test.beforeEach( async ({page}) => {
        await page.goto('https://playground.bondaracademy.com/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layout').click()
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

});