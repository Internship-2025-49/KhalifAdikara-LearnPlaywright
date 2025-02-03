// e2e-loggedin.spec.ts
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('should show search', async ({ page }) => {
  await page.getByRole('searchbox', { name: 'Search Wikipedia' }).click();
  await page.getByRole('combobox', { name: 'Search Wikipedia' }).fill('hitler');
  await page.getByRole('link', { name: 'Adolf Hitler Dictator of Nazi' }).click();
  await expect(page.getByRole('heading', { name: 'Adolf Hitler' })).toBeVisible();
});

test('menu test', async ({ page }) => {
  await page.getByTitle('Guides to browsing Wikipedia').click();
  await expect(page.locator('#firstHeading').getByText('Contents')).toBeVisible();

  await page.getByTitle('Articles related to current').click();
  await expect(page.locator('#firstHeading').getByText('Current events')).toBeVisible();

  await page.getByRole('link', { name: 'Random article' }).click();
  await expect(page.getByRole('link', { name: 'Wikipedia The Free' })).toBeVisible();

  await page.getByTitle('Learn about Wikipedia and how').click();
  await expect(page.locator('#firstHeading').getByText('About')).toBeVisible();
  
  await page.getByTitle('How to contact Wikipedia').click();
  await expect(page.locator('#firstHeading').getByText('Contact us')).toBeVisible();
});

// test('logs user out', async ({ page }) => {
//   await page.getByRole('button', { name: /Personal tools/i }).check();
//   await page.getByRole('link', { name:  /Log out/i }).click();
//   await expect(page.getByRole('heading', { name: /Log out/i })).toBeVisible();
//   await expect(page.getByRole('link', { name: 'Log in', exact: true })).toBeVisible();
// })