import { test } from '@playwright/test';


test.describe('Ucime sa playwright', () => {

    //Hook
    test.beforeEach( async ({page}) => {
        await page.goto('https://playground.bondaracademy.com/')
        await page.getByText('Forms').click()
    });

    test('Login na danu stranku', async ({page}) =>{
        await page.getByText('Form Layout').click()
    });

    test('Login na podstranku', async ({page}) =>{
        await page.getByText('Datepicker').click()
    });

});