const puppeteer  = require('puppeteer');

async function anjuke() {
    const browser = await  puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto("https://login.anjuke.com/login/form");

    // 切换iframe
    await page.frames().map(frame => {
         console.log(frame.url());
    });

    const targetFrameUrl = 'https://login.anjuke.com/login/iframeform';
    const frame = await page.frames().find(frame => frame.url().includes(targetFrameUrl));
    const phone = await frame.waitForSelector('#phoneIpt');
    await phone.type('13411112222')

}

anjuke();