const puppeteer = require('puppeteer');

// puppeteer.launch({
//     headless: false,
//     defaultViewport: {
//         width: 1366,
//         height: 768
//     }
// }).then(browser => {
//     browser.newPage().then(page => {
//         page.goto("https://www.baidu.com")
//     });
// });


async function run() {
    const browser = await puppeteer.launch({headless: false, defaultViewport: {width: 1366, height: 768}});
    const page = await browser.newPage();
    await page.goto("https://www.baidu.com");
    const input_area = await page.$("#kw");
    await input_area.type("Hello World");

    const search_btn = await page.$("#su");
    await search_btn.click();

    await page.waitFor('div#content_left > div.result-op.c-container.xpath-log', {visiable: true});

    let resultText = await page.$eval('div#content_left > div.result-op.c-container.xpath-log', ele => ele.innerText);
    console.log("result Text=", resultText);

}

run();


