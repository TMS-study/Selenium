import { By, until } from "selenium-webdriver";
import { BasePage } from "./base.page";

export class StartPage extends BasePage {
    private readonly originInput: By = By.className('fast-search__input');
    private readonly modalSearch: By = By.id('fast-search-modal');
    private readonly hrefNotebook: By = By.xpath('//a[contains(@class, "project-navigation__link_primary") and @href="https://catalog.onliner.by/notebook"]');

    async openUrl() {
        await this.driver.get('https:onliner.by.');
    };

    async fs() {
        await this.findAndSend(this.originInput, 'xbox');
    }

    async f1() {
        const modalElement = await this.onlyFind(this.modalSearch);
        return modalElement;
    }

    async fc() {
        const f = await this.onlyFind(this.hrefNotebook);
        await this.driver.wait(until.elementIsVisible(f), 10000);
        await f.click();
    }


}