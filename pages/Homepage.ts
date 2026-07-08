import {Page, Locator} from '@playwright/test';

export class HomePage {
    private searchInput: Locator;
    private searchButton: Locator;
    private productCards: Locator;

    constructor(private page:Page){
        this.searchInput = page.getByPlaceholder('Search');
        this.searchButton = page.getByRole('button', {name:'Search'});
        this.productCards = page.locator('a.card');
    }

    async navigate(): Promise<void>{
        await this.page.goto('/');
    }

    async searchForProduct(term:string):Promise<void>{
        await this.searchInput.fill(term);
        await this.searchButton.click();
    }

    async clickFirstProduct():Promise<void>{
        await this.productCards.first().click();
    }

}