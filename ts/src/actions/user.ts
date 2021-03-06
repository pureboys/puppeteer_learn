import {Page} from "puppeteer";
import config from "../config";
import {findItemByTwoCss} from "./common";

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

    public async login(page: Page, username: string, password: string) {
        await page.goto(config.url, {waitUntil: 'networkidle2'});
        const loginLink = await page.waitForSelector('a[href="/signin"]');
        await loginLink.click();

        const usernameInput = await page.waitForSelector('#name');
        await usernameInput.type(username);

        const passwordInput = await page.waitForSelector('#pass');
        await passwordInput.type(password);

        const loginBtn = await page.waitForSelector('input[type="submit"]');
        await loginBtn.click();
    }

    public async navToTabByName(page: Page, tabName: string) {
        const css = 'div[class="header"] > a.topic-tab';
        await page.waitForSelector(css);
        const allTab = await page.$$(css);
        const allTabText = await page.$$eval(css, eles => eles.map(ele => ele.textContent));
        const index = allTabText.findIndex(t => {
            t = t ? t : '';
            return t.includes(tabName);
        });

        if (index < 0) {
            throw new Error(`找不到元素${tabName},请检查拼写, 页面上的元素值为${allTabText}`);
        }

        const tab = allTab[index];
        await tab.click();

    }

    // 到达个人中心页面
    public async goToUserCenter(page: Page) {
        const userAvatar = await page.waitForSelector('a[class="user_avatar"]');
        await userAvatar.click();
    }

    // 个人中心页面打开自己创建的话题
    public async findTopicByName(page: Page, name: string) {
        const css1 = 'div[id="content"] > div.panel';
        const css2 = 'div[id="content"] > div.panel > div[class="header"]';
        const panel = await findItemByTwoCss(page, css1, css2, '最近创建的话题');

        const cells = await panel.$$('div[class="cell"] a[class="topic_title"]');
        const cellTitles = await panel.$$eval('div[class="cell"] a[class="topic_title"]', eles => eles.map(ele => ele.textContent));
        console.log('cellTitles == ', cellTitles);

        const index = cellTitles.findIndex(cell => {
            if (cell) {
               return cell.includes(name);
            }
        });

        console.log('index == ', index);
        if (index == -1) throw new Error(`找不到元素${name}`);

        return cells[index];
    }


}