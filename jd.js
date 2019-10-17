const puppeteer  = require('puppeteer');

async function jd() {
    const browser = await  puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto("https://www.jd.com");

    const input = await  page.$('#key');
    await input.type('手机');
    await page.keyboard.press('Enter');

    await page.waitForSelector('ul.gl-warp>li');

    const list = await page.$$eval('ul.gl-warp>li', eles => eles.map(ele => ele.innerText));
    console.log('List ==', list);
}

jd();