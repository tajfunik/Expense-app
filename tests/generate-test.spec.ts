import { test, expect } from '@playwright/test'

test.describe('Ucime sa Playwright', () => {

    test.beforeEach( async ({page}) => {

        await page.goto('http://playground.bondaracademy.com/')
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Dialog').click()
    });

    test('Generate test', async ({page}) => {
        
    });
});