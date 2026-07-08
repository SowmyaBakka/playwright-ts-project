import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch(); // ← headed so you can watch
  const page = await browser.newPage();

  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await page.locator('[data-test="email"]').fill(process.env.USER_EMAIL!);
  await page.locator('[data-test="password"]').fill(process.env.USER_PASSWORD!);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL(/account/, { timeout: 10000 });

  await page.context().storageState({ path: 'auth.json' });
  await browser.close();
}

export default globalSetup;