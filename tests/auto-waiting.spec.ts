import { test, expect } from '@playwright/test'

test.describe('Ucime sa Playwright', () => {

    test.beforeEach( async ({page}) => {

        await page.goto('http://playground.bondaracademy.com/')
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Dialog').click()
    });

    test('Auto-waiting', async({page}) => {
        const dialogWithDelayForm = page.locator('nb-card', {hasText: 'Open Dialog With Delay'})
        await dialogWithDelayForm.getByRole('button', {name: '3 seconds'}).click()

        const dilaogContainer = page.locator('nb-dialog-container')

        const dialogHeaderText = await dilaogContainer.locator('nb-card-header').allTextContents()
        expect(dialogHeaderText).toEqual('Friendly reminder')
    });

    test('Alternative-waiting', async({page}) => {
        const dialogWithDelayForm = page.locator('nb-card', {hasText: 'Open Dialog With Delay'})
        await dialogWithDelayForm.getByRole('button', {name: '3 seconds'}).click()

        const dialogContainer = page.locator('nb-dialog-container')

        //1.
        // wait for the element, use waitFor()
        await dialogContainer.waitFor()
        //wait for selector
        await page.waitForSelector('nb-dialog-container')

        //2. 
        // wait for API response
        await page.waitForResponse('**/delay/*')

        //3.
        // wait for load state (NOT RECOMMENDED)
        await page.waitForLoadState('networkidle')

        //4.
        //hardcoded wait (NEVER USE IT)
        await page.waitForTimeout(3500)


        const dialogHeaderText = await dialogContainer.locator('nb-card-header').allTextContents()
        expect(dialogHeaderText).toContain('Friendly reminder')
    });
  
});