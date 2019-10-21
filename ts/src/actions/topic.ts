import {Page} from "puppeteer";
import config from "../config";
import {clear} from './common';

export class TopicAction {
    public async createTopic(page: Page, tab: string, title: string, content: string) {

        await page.select('#tab-value', tab);

        // 注释为错误的方法
        // const tabOption = await page.waitForSelector('#tab-value');
        // await tabOption.click();
        // 根据tab文本定位元素
        // const allOption = await page.$$('#tab-value > option');
        // const allOptionVal = await page.$$eval('#tab-value > option', eles => (eles.map(ele => ele.textContent)));
        // const index = allOptionVal.findIndex(t => t == tab);
        // if (index > 0) {
        //     await allOption[index].click();
        // }


        // title
        const titleInput = await page.waitForSelector('#title');
        await titleInput.click();
        await clear(page);
        await titleInput.type(title);

        //content
        const contentArea = await page.waitForSelector('div.CodeMirror-scroll');
        await contentArea.click();
        await clear(page);
        // 注释为错误的方法
        // await contentArea.type(content);
        await page.keyboard.type(content);


        // submit
        const submitBtn = await page.waitForSelector('input[type="submit"]');
        await submitBtn.click();

    }

    // 修改话题
    public async editTopic(page: Page, tab: string, title: string, content: string) {
        await this.createTopic(page, tab, title, content);
    }

    // 删除话题
    public async delTopic(page: Page) {

        await page.waitForNavigation();

        page.on('dialog', async (dialog) => {
            console.log('dialog', dialog.message());
            await dialog.accept();
        });

        const delIcon = await page.waitForSelector('a[class="delete_topic_btn"]');
        await delIcon.click();

    }

}