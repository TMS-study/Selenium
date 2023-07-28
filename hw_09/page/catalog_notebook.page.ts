import { By, until } from "selenium-webdriver";
import { BasePage } from "./base.page";

export class NotebookPage extends BasePage {
    private readonly checkboxMinipay: By = By.css('label.schema-filter__bonus-item.schema-filter__bonus-item_primary .i-checkbox__faux');
    private readonly checkboxPrime: By = By.css('label.schema-filter__bonus-item.schema-filter__bonus-item_alter .i-checkbox__faux');
    private readonly selectMinipay: By = By.css('label.schema-filter__bonus-item.schema-filter__bonus-item_primary  .i-checkbox__real')
    private readonly selectPrime: By = By.css('label.schema-filter__bonus-item.schema-filter__bonus-item_alter .i-checkbox__real');
    private readonly listProductFilter: By = By.css('.js-schema-results.schema-grid__center-column');
    private readonly advertisement: By = By.name('ko_unique_2');
    private readonly placeAnAd: By = By.id('schema-top-button');
    private readonly loginUser: By = By.css('.no-touch');

    async openUrl() {
        await this.driver.get('https://catalog.onliner.by/notebook');
    };

    async findAndClickBothElem() {
        const checkboxMinipayElement = await this.onlyFind(this.checkboxMinipay);
        const checkboxPrimeElement = await this.onlyFind(this.checkboxPrime);

        await Promise.all([
            this.driver.wait(until.elementIsVisible(checkboxMinipayElement)),
            this.driver.wait(until.elementIsVisible(checkboxPrimeElement))
        ]);

        checkboxMinipayElement.click();
        checkboxPrimeElement.click();

    }

    async fe1() {
        return await this.onlyFind(this.selectMinipay);
    }
    async fe2() {
        return await this.onlyFind(this.selectPrime);
    }
    async fe3() {
        return await this.onlyFind(this.listProductFilter);
    }

    async f4() {
        return await this.onlyFind(this.advertisement);
    }

    async fc() {
        return await this.onlyFind(this.placeAnAd);
    }
    async f5() {
        return await this.onlyFind(this.loginUser);
    }

};
