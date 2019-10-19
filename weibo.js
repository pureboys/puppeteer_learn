const puppeteer = require('puppeteer');
const username = '18561679969';
const password = 'wushuang12345';

async function run() {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {width: 1200, height: 700},
        ignoreDefaultArgs: ['--enable-automation'],
        slowMo: 200,
        args: ['--window-size=1200,700']
    });

    const page = await browser.newPage();

    await page.goto('http://wufazhuce.com/', {waitUntil: 'networkidle2'});
    const OneText = await page.$eval('div.fp-one-cita > a', ele => ele.innerText);
    console.log('OneText:', OneText);

    await page.goto("https://weibo.com/", {waitUntil: 'networkidle2'});
    await page.waitFor(2 * 1000);
    await page.reload();

    const loginUserInput = await page.waitForSelector('input#loginname');
    await loginUserInput.click();
    await loginUserInput.type(username);

    const loginUserPassWdInput = await page.waitForSelector('input[type="password"]');
    await loginUserPassWdInput.click();
    await loginUserPassWdInput.type(password);

    const loginBtn = await page.waitForSelector('a[action-type="btn_submit"]');
    await loginBtn.click();

    const textarea = await page.waitForSelector('textarea[class="W_input"]');
    await textarea.click();
    await textarea.type(OneText);

    const sendBtn = await page.waitForSelector('a[node-type="submit"]');
    await sendBtn.click();

}

run();