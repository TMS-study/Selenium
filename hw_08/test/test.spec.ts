import { Builder, By, WebDriver, WebElement, until } from "selenium-webdriver";
import { NotebookPage } from "../page/catalog_notebook.page";
import { StartPage } from "../page/start.page";

describe('UI test by site Onliner', () => {
let driver: any;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    test('1 check open modal search window', async () => {
        //let driver: WebDriver = await new Builder().forBrowser('chrome').build();
        const origin = new StartPage(driver);
        origin.open();
        origin.openUrl();
        origin.fs();

        const modalWindow = await origin.f1();
        expect(modalWindow instanceof WebElement).toBe(true);
        expect(await modalWindow.isDisplayed()).toBeTruthy();
        origin.close();
    });



    test('2 open tab notebook in project-navigation__link_primary', async () => {

        const tabNotebook = new StartPage(driver);
        tabNotebook.open();
        tabNotebook.openUrl();
        tabNotebook.fc();

        await driver.wait(until.urlIs('https://catalog.onliner.by/notebook'), 20000);
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toBe('https://catalog.onliner.by/notebook');

        tabNotebook.close();
    });
});