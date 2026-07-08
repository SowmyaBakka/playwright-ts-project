import {test, expect} from '../fixtures'
const loginData = [
    {
        description:'valid credentials',
        email:process.env.USER_EMAIL!,
        password:process.env.USER_PASSWORD!,
        expectedURL:'/account',
        shouldSucceed: true
    },
    {
    description: 'invalid password',
    email: 'customer@practicesoftwaretesting.com',
    password: 'wrongpassword',            // ← hardcoded, intentionally fake
    expectedURL: /login/,
    shouldSucceed: false
  },
  {
    description: 'invalid email',
    email: 'notexist@test.com',           // ← hardcoded, intentionally fake
    password: 'welcome01',
    expectedURL: /login/,
    shouldSucceed: false
  },
];

test.describe('Login - Data Driven',()=>{
    test.use({ storageState: { cookies: [], origins: [] } });
    loginData.forEach(({description,email, password, expectedURL, shouldSucceed})=>
    {
       test(`login with ${description} @regression`, async({page, loginPage})=>{
        await loginPage.login(email, password);
        if (shouldSucceed){
            await expect(page).toHaveURL(expectedURL);
            await expect(page.getByTestId('nav-menu')).toBeVisible();
        }else{
            await expect(page).toHaveURL(expectedURL);
            await expect(page.getByTestId('login-error')).toContainText('Invalid email or password');
        
        }

       }); 
    });
});