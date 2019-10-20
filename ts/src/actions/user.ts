import {Page} from "puppeteer";
import config from "../config";

export class UserAction {
    public async register(page: Page, username: string, password: string, resPassword: string, email: string) {
        await page.goto(config.url, {waitUntil: 'networkidle2'});

        const registerLink = await page.waitForSelector('a[href="/signup"]');
        await registerLink.click();

        const userInput = await page.waitForSelector('#loginname');
        await userInput.type(username);

        const passwordInput = await page.waitForSelector('#pass');
        await passwordInput.type(password);

        const resPasswordInput = await page.waitForSelector('#re_pass');
        await resPasswordInput.type(resPassword);

        const emailInput = await page.waitForSelector('#email');
        await emailInput.type(email);

        const registerBtn = await page.waitForSelector('input[type="submit"]');
        await registerBtn.click();


    }
}