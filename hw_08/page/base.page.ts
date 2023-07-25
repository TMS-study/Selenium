import { WebDriver } from "selenium-webdriver";

export class BasePage {
    constructor(protected driver: WebDriver) {
    };

    async open(): Promise<void> {
        await this.driver.manage().window().maximize();
    };

    async close(): Promise<void> {
        await this.driver.quit();
    };
};