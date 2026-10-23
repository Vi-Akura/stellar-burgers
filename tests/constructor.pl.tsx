import { test, expect } from '@playwright/test';

test.describe('Конструктор бургера: интеграционные тесты', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'fake-refresh-token');
      document.cookie = 'accessToken=fake-access-token; path=/';
    });

    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: 'https://norma.education-services.ru/api/ingredients',
      update: false,
    });

    await page.route('**/api/auth/user', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ 
          success: true, 
          user: { name: 'Тестовый Пользователь', email: 'test@test.ru' } 
        }),
      });
    });

    await page.route('**/api/orders', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          name: 'Флюоресцентный бургер',
          order: { number: 12345 },
        }),
      });
    });

    await page.goto('/');
    
    await page.getByRole('button', { name: 'Добавить' }).first().waitFor({ timeout: 10000 });
  });

  test('добавляет ингредиент в конструктор', async ({ page }) => {
    const addButtons = page.getByRole('button', { name: 'Добавить' });
    
    await addButtons.first().click();
    await expect(page.getByText('Краторная булка N-200i (верх)')).toBeVisible();
    
    await addButtons.nth(2).click();
    await expect(page.getByText('Биокотлета из марсианской Магнолии')).toBeVisible();
  });

  test('открывает модальное окно ингредиента и закрывает по клику на крестик', async ({ page }) => {
    const firstIngredientLink = page.locator('a[href*="/ingredients/"]').first();
    const ingredientName = await firstIngredientLink.locator('p').innerText();

    await firstIngredientLink.click();

    const modal = page.locator('[class*="modal"]').first();
    await expect(modal).toBeVisible();
    await expect(modal.locator('h3')).toContainText(ingredientName);

    await modal.locator('button').first().click();
    await expect(modal).not.toBeVisible();
  });

  test('создаёт заказ, показывает его номер и очищает конструктор', async ({ page }) => {
    await page.route('**/api/auth/user', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          user: { email: 'test@test.ru', name: 'Тест' },
        }),
      });
    });

    await page.reload();
    await page.getByRole('button', { name: 'Добавить' }).first().waitFor({ timeout: 10000 });

    const addButtons = page.getByRole('button', { name: 'Добавить' });
    await addButtons.first().click();
    await addButtons.nth(2).click();

    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    const modal = page.locator('[class*="modal"]').first();
    await expect(modal).toBeVisible();
    await expect(modal.locator('[class*="digits-large"]')).toContainText('12345');

    await expect(page.getByText('Выберите булки')).toBeVisible();
    await expect(page.getByText('Выберите начинку')).toBeVisible();

    await modal.locator('button').first().click();
    await expect(modal).not.toBeVisible();
  });
});