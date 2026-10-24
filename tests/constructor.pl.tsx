import { test, expect } from '@playwright/test';
import { getHarData } from './test-utils';

test.describe('Конструктор бургера: интеграционные тесты', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'fake-refresh-token');
      document.cookie = 'accessToken=fake-access-token; path=/';
    });

    const ingredientsData = getHarData('ingredients.har');
    const userUnauthorizedData = getHarData('user-unauthorized.har');

    await page.route('**/ingredients', async (route) => {
      const data = ingredientsData.find(d => d.url.includes('/ingredients'));
      if (data) {
        await route.fulfill({
          status: data.status,
          contentType: data.contentType,
          body: data.body,
        });
      }
    });

    await page.route('**/auth/user', async (route) => {
      const data = userUnauthorizedData.find(d => d.url.includes('/auth/user'));
      if (data) {
        await route.fulfill({
          status: data.status,
          contentType: data.contentType,
          body: data.body,
        });
      }
    });

    await page.goto('/');
    
    await page.getByTestId('ingredients-content').waitFor({ timeout: 10000 });
    await page.getByRole('button', { name: 'Добавить' }).first().waitFor({ timeout: 10000 });
  });

  test('добавляет ингредиент в конструктор', async ({ page }) => {
    const bun = page.getByTestId('bun-ingredients').locator('li').first();
    const filling = page.getByTestId('mains-ingredients').locator('li').first();

    await bun.getByRole('button', { name: 'Добавить' }).click();
    await filling.getByRole('button', { name: 'Добавить' }).click();

    const constructor = page.getByTestId('constructor');
    await expect(constructor.getByTestId('constructor-bun-1')).toBeVisible();
    await expect(constructor.getByTestId('constructor-bun-2')).toBeVisible();
    await expect(page.getByTestId('constructor-ingredients')).toContainText('Биокотлета из марсианской Магнолии');
  });

  test('открывает модальное окно ингредиента и закрывает по клику на крестик', async ({ page }) => {
    const ingredientName = 'Краторная булка N-200i';

    await page.getByText(ingredientName).first().click();

    await expect(page.getByTestId('modal-overlay')).toBeVisible();
    
    const modal = page.locator('#modals');
    await expect(modal.getByRole('heading', { name: 'Детали ингредиента' })).toBeVisible();
    await expect(modal.getByText(ingredientName).first()).toBeVisible();

    await modal.getByRole('button').click();
    await expect(page.getByTestId('modal-overlay')).toHaveCount(0);
  });

  test('создаёт заказ, показывает его номер и очищает конструктор', async ({ page }) => {
    const userAuthorizedData = getHarData('user-authorized.har');
    const orderCreatedData = getHarData('order-created.har');

    await page.route('**/auth/user', async (route) => {
      const data = userAuthorizedData.find(d => d.url.includes('/auth/user'));
      if (data) {
        await route.fulfill({
          status: data.status,
          contentType: data.contentType,
          body: data.body,
        });
      }
    });

    await page.route('**/orders', async (route) => {
      const data = orderCreatedData.find(d => d.url.includes('/orders'));
      if (data) {
        await route.fulfill({
          status: data.status,
          contentType: data.contentType,
          body: data.body,
        });
      }
    });

    await page.reload();
    await page.getByTestId('ingredients-content').waitFor({ timeout: 10000 });
    await page.getByRole('button', { name: 'Добавить' }).first().waitFor({ timeout: 10000 });

    const bun = page.getByTestId('bun-ingredients').locator('li').first();
    const filling = page.getByTestId('mains-ingredients').locator('li').first();

    await bun.getByRole('button', { name: 'Добавить' }).click();
    await filling.getByRole('button', { name: 'Добавить' }).click();

    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    await expect(page.getByTestId('modal-overlay')).toBeVisible();
    const modal = page.locator('#modals');
    await expect(modal.getByTestId('order-number')).toHaveText('99999');

    await expect(page.getByTestId('constructor-bun-1')).toHaveCount(0);
    await expect(page.getByTestId('constructor-bun-2')).toHaveCount(0);
    await expect(page.getByTestId('constructor-ingredients')).toContainText('Выберите начинку');

    await modal.getByRole('button').click();
    await expect(page.getByTestId('modal-overlay')).toHaveCount(0);
  });
});