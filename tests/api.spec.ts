import {test, expect} from '@playwright/test'
import * as process from 'process';
const BASE_URL = 'https://api.practicesoftwaretesting.com';
test.describe('Products API', ()=>{
    test ('should return list of products @smoke', async({request})=>{
        const response = await request.get(`${BASE_URL}/products`);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.data).toBeDefined();
        expect(body.data.length).toBeGreaterThan(0);
    });
    test ('should return a single product', async({request})=>{
        const response = await request.get(`${BASE_URL}/products`);
        const body = await response.json();
        const firstProductId = body.data[0].id;
        const productResponse = await request.get(`${BASE_URL}/products/${firstProductId}`);
        expect(productResponse.status()).toBe(200);
        const product = await productResponse.json();
        expect(product.id).toBe(firstProductId);
        expect(product.name).toBeDefined();
        expect(product.price).toBeDefined();
    });
    test('should return 404 for non-existent product', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/products/non-existent-id`);
        expect(response.status()).toBe(404);
    });
    test('should login via API', async({request})=>{
        const response = await request.post(`${BASE_URL}/users/login`,{
            data: {
                email: process.env.USER_EMAIL,
                password: process.env.USER_PASSWORD
            }
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.access_token).toBeDefined();
    });
    test('product added via API should appear in UI', async({request,page})=>{
        const response = await request.get(`${BASE_URL}/products`);
        const body = await response.json();
        const firstProduct = body.data[0];
        await page.goto('/');
        await expect(page.getByText(firstProduct.name)).toBeVisible();

    })
})