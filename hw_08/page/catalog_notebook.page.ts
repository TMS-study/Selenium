import { WebDriver } from "selenium-webdriver";
import { BasePage } from "./base.page";

export class NotebookPage extends BasePage {

    async openUrl() {
        await this.driver.get('https://catalog.onliner.by/notebook');
    };
}