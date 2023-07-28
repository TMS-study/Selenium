import { Builder, By, WebElement, until } from "selenium-webdriver";
import { NotebookPage } from "../page/catalog_notebook.page";
import { StartPage } from "../page/start.page";

describe('UI test by site Onliner', () => {
    let driver: any;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    test('1 check open modal search window', async () => {

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



    test('3 open list with filter', async () => {
        const openFilter = new NotebookPage(driver);
        openFilter.open();
        openFilter.openUrl();
        await openFilter.findAndClickBothElem();

        const fe1Element = await openFilter.fe1();
        const fe2Element = await openFilter.fe2();


        expect(await fe1Element.isSelected()).toBeTruthy();
        expect(await fe2Element.isSelected()).toBeTruthy();

        await openFilter.fe3();
        const fe3Element = await openFilter.fe3();
        expect(await fe3Element.isDisplayed()).toBeTruthy();

        openFilter.close();
    });

    test('5 place an ad by an unauthorized user', async () => {
        const placeAd = new NotebookPage(driver);
    
        placeAd.open();
        placeAd.openUrl();
    
        const f4Element = await placeAd.f4();
        await driver.executeScript("arguments[0].click();", f4Element);
    
        placeAd.fc();
    
        const loginElement = await placeAd.f5();
        expect(await loginElement.isDisplayed()).toBeTruthy();
    
        placeAd.close();
    });

});