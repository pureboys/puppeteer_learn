const puppeteer = require('puppeteer');

async function run() {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {width: 1200, height: 700},
        ignoreDefaultArgs: ['--enable-automation'],
        slowMo: 200,
        args: ['--window-size=1200,700']
    });
    const page = await browser.newPage();

    await page.goto('http://39.107.96.138:3000/signin', {waitUntil: 'networkidle2'});

    const username = await page.waitForSelector('#name');
    await username.click();
    await username.type('user1');

    const password = await page.waitForSelector('#pass');
    await password.click();
    await password.type('123456');

    const loginBtn = await page.waitForSelector('.span-primary');
    await loginBtn.click();

    const createTopicBtn = await page.waitForSelector('#create_topic_btn');
    await createTopicBtn.click();

    const inputTopic = await page.waitForSelector('.CodeMirror-code');
    await inputTopic.click();
    await page.keyboard.type('hello world!');

    await page.keyboard.down('Control');
    await page.keyboard.down('a');
    await page.keyboard.up('a');
    await page.keyboard.up('Control');

    await page.keyboard.down('Control');
    await page.keyboard.down('b');
    await page.keyboard.up('b');
    await page.keyboard.up('Control');


}

run();