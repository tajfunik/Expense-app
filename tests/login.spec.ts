
import { test, expect } from '@playwright/test';

test('Login page is displayed', async ({ page }) => {
  await page.goto('/login');

  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});

