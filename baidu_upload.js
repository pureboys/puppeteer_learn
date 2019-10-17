const puppeteer  = require('puppeteer');

async function upload() {
    const browser = await  puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto("https://www.baidu.com");
    const soutuBtn = await page.waitForSelector('span.soutu-btn');
    await soutuBtn.click();
    const uploadPic = await page.waitForSelector('input.upload-pic');
    await uploadPic.uploadFile('./upload_test_pic.webp');
}

upload();