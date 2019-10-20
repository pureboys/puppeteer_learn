import {Browser, launch, Page} from "puppeteer";
import {UserAction} from "./actions/user";


async function run() {
    let browser: Browser = await launch({
        headless: false,
    });
    let page: Page = await browser.newPage();

    let userAction = new UserAction();
    await userAction.register(page, "user911", "123456", "1234567", "user911@123.com")
}

run();