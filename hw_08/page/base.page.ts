import { By, WebDriver } from "selenium-webdriver";

export class BasePage {
    constructor(protected driver: WebDriver) {
    };

    async open() {
        await this.driver.manage().window().maximize();
    };

    async close() {
        await this.driver.quit();
    };

    async onlyFind(elem: By) {
        return await this.driver.findElement(elem);
    }

    async findAndSend(elem: By, value: string) {
        await this.driver.findElement(elem).sendKeys(value);
    }

    async findAdnClick(elem: By) {
        return await this.driver.findElement(elem).click()
    }


};