import {Browser, launch, Page} from "puppeteer";

class Action {
    public async goUrl(page: Page, url: string) {
        await page.goto(url)
    }
}

async function main() {
    const action = new Action();
    let browser: Browser = await launch({
        headless: false,
    });
    let page: Page = await browser.newPage();
    await action.goUrl(page, 'https://www.baidu.com');
}

main();