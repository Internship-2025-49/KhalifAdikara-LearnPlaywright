import { test as setup, expect } from '@playwright/test';
import { STORAGE_STATE } from '../playwright.config';

setup('do login', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('/');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.getByPlaceholder('Enter your username').fill('Akunngasal123');
  await page.getByPlaceholder('Enter your password').fill('gataulupa');
  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(page.getByRole('button', { name: 'Personal tools' })).toBeVisible();
  await page.context().storageState({ path: STORAGE_STATE });

  await context.close();
});