import { test, expect } from '@playwright/test';

test.describe('New Todo', () => {

  test.beforeEach(async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
  })

  test('active and completed filters', async ({ page }) => {
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('water the plants.');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('feed the dog.');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
    await page.getByRole('listitem').filter({ hasText: 'water the plants.' }).getByLabel('Toggle Todo').check();
    await page.getByRole('link', { name: 'Active' }).click();
    await page.getByTestId('todo-title').click();
    await page.getByRole('link', { name: 'Completed' }).click();
    await page.getByTestId('todo-title').click();

    test('text field is cleared when item is added', async ({ page}) => {
      await page.getByPlaceholder('What needs to be done?').fill('water the plants');
      await page.getByPlaceholder('What needs to be done?').press('Enter');
      await expect(page.getByPlaceholder('What needs to be done?')).toBeEmpty();
    })
  });
});