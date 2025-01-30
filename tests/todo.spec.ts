import { test, expect } from '@playwright/test';

test.describe('New Todo', () => {

  test.beforeEach(async ({page}) => {
    await page.goto('');
  })

  test('active and completed filters', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?')
    await todoInput.fill('water the plants.');
    await todoInput.press('Enter');
    await todoInput.fill('feed the dog.');
    await todoInput.press('Enter');
    await page.getByRole('listitem').filter({ hasText: 'water the plants.' }).getByLabel('Toggle Todo').check();
    await page.getByRole('link', { name: 'Active' }).click();
    await page.getByTestId('todo-title').click();
    await page.getByRole('link', { name: 'Completed' }).click();
    await page.getByTestId('todo-title').click();
  });

  test('text field is cleared when item is added', async ({ page}) => {
    const todoInput = page.getByPlaceholder('What needs to be done?')
    await todoInput.fill('water the plants');
    await todoInput.press('Enter');
    await expect(page.getByPlaceholder('What needs to be done?')).toBeEmpty();
  });
});