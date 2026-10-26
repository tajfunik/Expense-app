import { test, expect } from '@playwright/test'

test.describe('Ucime sa Playwright', () => {

    test.beforeEach( async ({page}) => {

        await page.goto('http://playground.bondaracademy.com/')
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Dialog').click()
    });

    test('Timeouts', async ({page}) => {
        const dialogWithDelayForm = page.locator('nb-card', {hasText: 'Open Dialog With Delay'})
        await dialogWithDelayForm.getByRole('button', {name: '3 seconds'}).click()

        const dialogContainer = page.locator('nb-dialog-container')

        await dialogContainer.getByRole('button', {name: 'Ok'}).click()
    });
});