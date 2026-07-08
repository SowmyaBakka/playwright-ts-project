import {Page, Locator} from '@playwright/test';

export class LoginPage{
    
    private username: Locator;
    private password: Locator;
    private loginbutton: Locator;

    constructor(private page:Page){
        this.username = page.getByLabel(/Email address/)
        this.password = page.getByTestId("password")
        this.loginbutton = page.getByTestId("login-submit")
    }
    async navigate():Promise<void>{
        await this.page.goto("https://practicesoftwaretesting.com/auth/login")
        // await this.page.getByRole
    }

    async login(username:string, password:string):Promise<void>{
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginbutton.click();
        await this.page.waitForLoadState('networkidle'); 
    }
}
