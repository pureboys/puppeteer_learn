import {Browser, launch, Page} from "puppeteer";
import {UserAction} from "./actions/user";
import {TopicAction} from './actions/topic';
import config from "./config";


async function run() {
    let browser: Browser = await launch({
        headless: false,
        slowMo: 100,
        defaultViewport: {width: 1366, height: 700}
    });
    let page: Page = await browser.newPage();

    let userAction = new UserAction();
    let topicAction = new TopicAction();
    // await userAction.register(page, "user911", "123456", "1234567", "user911@123.com")

    await userAction.login(page, "user1", "123456");
    await page.waitFor(3 * 1000);

    // await page.goto(config.url + '/topic/create', {waitUntil: 'networkidle2'});
    // await topicAction.createTopic(page, 'ask', "感恩作者!", "作者好帅!");

    // await page.goto(config.url + '/topic/5dac47ee5675d33f74c1df39/edit', {waitUntil: 'networkidle2'});
    // await topicAction.editTopic(page, 'ask', '再次感恩作者!', '作者好nb!!');

    // await page.goto(config.url, {waitUntil: 'networkidle2'});
    // await userAction.navToTabByName(page, '招聘');
    // await userAction.navToTabByName(page, '分享');

    await userAction.goToUserCenter(page);
    const topic = await userAction.findTopicByName(page, "postman学习10月19测试关联的列子1");
    await topic.click();
    await topicAction.delTopic(page);


}

run();