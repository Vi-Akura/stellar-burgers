import { expect, test } from '@playwright/test';

const BUN_TITLE = 'Краторная булка N-200i';
const FILLING_TITLE = 'Биокотлета из марсианской Магнолии';
const SAUCE_TITLE = 'Соус Spicy-X';
const ORDER_NUMBER = '99999';

test.describe('Конструктор бургера с HAR', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'fake-refresh-token');
      document.cookie = 'accessToken=fake-access-token; path=/';
    });

    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/ingredients',
      update: false,
    });
    
    await page.routeFromHAR('./tests/hars/user-unauthorized.har', {
      url: '**/auth/user',
      update: false,
    });

    await page.goto('/');

    await expect(page.getByTestId('ingredients-content')).toBeVisible({ timeout: 10000 });
  });

  test('добавляет ингредиент в конструктор', async ({ page }) => {
    const bun = page.getByTestId('bun-ingredients').locator('li').filter({ hasText: BUN_TITLE });
    const filling = page.getByTestId('mains-ingredients').locator('li').filter({ hasText: FILLING_TITLE });
    const sauce = page.getByTestId('sauces-ingredients').locator('li').filter({ hasText: SAUCE_TITLE });

    await bun.getByRole('button', { name: 'Добавить' }).click();
    await filling.getByRole('button', { name: 'Добавить' }).click();
    await sauce.getByRole('button', { name: 'Добавить' }).click();

    await expect(page.getByTestId('constructor-bun-1')).toContainText(`${BUN_TITLE} (верх)`);
    await expect(page.getByTestId('constructor-bun-2')).toContainText(`${BUN_TITLE} (низ)`);
    await expect(page.getByTestId('constructor-ingredients')).toContainText(FILLING_TITLE);
    await expect(page.getByTestId('constructor-ingredients')).toContainText(SAUCE_TITLE);
    await expect(page.getByTestId('constructor')).not.toContainText('Выберите булки');
  });

  test('открывает модальное окно ингредиента и закрывает по клику на крестик', async ({ page }) => {
    const bun = page.getByTestId('bun-ingredients').locator('li').filter({ hasText: BUN_TITLE });
    await bun.getByRole('link').click();

    const modal = page.locator('#modals');
    await expect(page.getByTestId('modal-overlay')).toBeVisible();
    await expect(modal.getByRole('heading', { name: 'Детали ингредиента' })).toBeVisible();
    await expect(modal.getByRole('heading', { name: BUN_TITLE })).toBeVisible();
    
    await modal.getByRole('button').click();
    await expect(page.getByTestId('modal-overlay')).toHaveCount(0);
  });

  test('создаёт заказ, показывает его номер и очищает конструктор', async ({ context, page }) => {
    await page.routeFromHAR('./tests/hars/user-authorized.har', {
      url: '**/auth/user',
      update: false,
    });
    await page.routeFromHAR('./tests/hars/order-created.har', {
      url: '**/orders',
      update: false,
    });

    await context.addCookies([
      { name: 'accessToken', value: 'fake-access-token', url: 'http://localhost:4000' },
    ]);
    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'fake-refresh-token');
    });

    await page.reload();
    await expect(page.getByTestId('ingredients-content')).toBeVisible({ timeout: 10000 });

    const bun = page.getByTestId('bun-ingredients').locator('li').filter({ hasText: BUN_TITLE });
    const filling = page.getByTestId('mains-ingredients').locator('li').filter({ hasText: FILLING_TITLE });
    const sauce = page.getByTestId('sauces-ingredients').locator('li').filter({ hasText: SAUCE_TITLE });

    await bun.getByRole('button', { name: 'Добавить' }).click();
    await filling.getByRole('button', { name: 'Добавить' }).click();
    await sauce.getByRole('button', { name: 'Добавить' }).click();

    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    const modal = page.locator('#modals');
    await expect(page.getByTestId('modal-overlay')).toBeVisible();
    await expect(modal.getByTestId('order-number')).toContainText(ORDER_NUMBER);

    await expect(page.getByTestId('constructor-bun-1')).toHaveCount(0);
    await expect(page.getByTestId('constructor-bun-2')).toHaveCount(0);
    await expect(page.getByTestId('constructor-ingredients')).toContainText('Выберите начинку');
    await expect(page.getByTestId('constructor')).toContainText('Выберите булки');

    await modal.getByRole('button').click();
    await expect(page.getByTestId('modal-overlay')).toHaveCount(0);
  });
});