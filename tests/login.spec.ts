import {test, expect} from '../fixtures';
import { LoginPage } from '../pages/LoginPage';

const email = process.env.USER_EMAIL!;
const password = process.env.USER_PASSWORD!;

test.describe ('LoginPage', ()=>{
    test.use({ storageState: { cookies: [], origins: [] } });
    test('should have h1', async ({ page, loginPage }) => {
        await loginPage.login(email,password);
        await expect(page.getByRole("heading", {level:1})).toBeVisible();
    });

    test('should show favourites after login', async ({ page, loginPage }) => {
        await loginPage.login(email,password);
        await expect(page.getByTestId('nav-favorites')).toBeVisible();
  });
    test('should redirect to account page after login', async({page, loginPage})=>{
        await loginPage.login(email, password);
        await expect(page).toHaveURL(/account/);
        await expect(page.getByRole('heading', {level:1})).toHaveText('My account');
    });
    test('should show user menu after login @smoke', async ({ page, loginPage }) => {
        await loginPage.login(email, password);
        await expect(page.getByTestId('nav-menu'), 'User menu should appear after login').toBeVisible();
        await expect(page.getByText('Sign in')).toBeHidden();
    });
});