import { test, expect } from '@playwright/test'

test.describe('Ucime sa Playwright', () => {

    test.beforeEach( async ({page}) => {

        await page.goto('http://localhost:3000/')
    });

    test('Assertion', async({page}) => {

        //General Assertion
        //Validate whatever is value on the left to value on right
        const value = 5
        expect(value).toEqual(5)

        //Locator assertion
        //Provide locator as argument in the expect and validate and waiting up to 5 sec
        const form = page.locator('form');
        const formAddButton = form.getByRole('button', { name: 'Add Expense' });
        await expect(formAddButton).toHaveText('Add Expense')

        //Soft assertion 
        //Continue validate even previous test failed
        await expect.soft(formAddButton).toHaveText('Add Expense')
        await formAddButton.click()

        await page.pause();
   });

    
});