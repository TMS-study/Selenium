import { WebDriver } from "selenium-webdriver";

export class NotebookPage {
    constructor(protected driver: WebDriver) {
    };

    async open(): Promise<void> {
        await this.driver.get('https://catalog.onliner.by/notebook');
    };
}