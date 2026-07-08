import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const email = process.env.USER_EMAIL;
  const password = process.env.USER_PASSWORD;

  if (!email || !password) {
    throw new Error('USER_EMAIL and USER_PASSWORD must be set');
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://practicesoftwaretesting.com/auth/login');
  
  // take screenshot to see what page looks like in CI
  await page.screenshot({ path: 'debug-screenshot.png' });
  
  await page.locator('[data-test="email"]').fill(email);
  await page.locator('[data-test="password"]').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL(/account/);

  await page.context().storageState({ path: 'auth.json' });
  await browser.close();
}

export default globalSetup;