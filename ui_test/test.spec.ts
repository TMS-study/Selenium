import { Builder, By, WebDriver, WebElement, until } from "selenium-webdriver";


describe('UI test by site Onliner', () => {

    test('1 check open modal search window', async () => {
        let driver: WebDriver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        await driver.get('https:onliner.by.');
        const originInput = await driver.findElement(By.className('fast-search__input'));
        originInput.sendKeys('xbox');
        const modalSearch = await driver.findElement(By.id('fast-search-modal'));
        expect(await modalSearch.isDisplayed()).toBeTruthy();
        await driver.quit();
    })



    test('2 open tab notebook in project-navigation__link_primary', async () => {
        let driver: WebDriver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        await driver.get('https:onliner.by.');
        const hrefNotebook = await driver.findElement(By.xpath('//a[contains(@class, "project-navigation__link_primary") and @href="https://catalog.onliner.by/notebook"]'));
        await driver.wait(until.elementIsVisible(hrefNotebook), 10000); // Ожидание видимости элемента
        await hrefNotebook.click();
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toBe('https://catalog.onliner.by/notebook');
        await driver.quit();
    });

    test('2 open tab notebook in project-navigation__link_primary', async () => {
        let driver: WebDriver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        await driver.get('https:onliner.by.');
        const hrefNotebook = await driver.findElement(By.xpath('//a[contains(@class, "project-navigation__link_primary") and @href="https://catalog.onliner.by/notebook"]'));
        await driver.wait(until.elementIsVisible(hrefNotebook), 10000); // Ожидание видимости элемента
        await hrefNotebook.click();
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toBe('https://catalog.onliner.by/notebook');
        await driver.quit();
    });

    test('3 open list with filter', async () => {
        let driver: WebDriver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        await driver.get('https://catalog.onliner.by/notebook');
        const checkboxMinipay = await driver.findElement(By.css('label.schema-filter__bonus-item.schema-filter__bonus-item_primary .i-checkbox__faux'));
        const checkboxPrime = await driver.findElement(By.css('label.schema-filter__bonus-item.schema-filter__bonus-item_alter .i-checkbox__faux'));

        await Promise.all([
            driver.wait(until.elementIsVisible(checkboxMinipay)),
            driver.wait(until.elementIsVisible(checkboxPrime))
        ]);

    await checkboxMinipay.click();
    await checkboxPrime.click();

    await driver.sleep(2000);

    const selectMinipay = await driver.findElement(By.css('label.schema-filter__bonus-item.schema-filter__bonus-item_primary  .i-checkbox__real'))
    const selectPrime = await driver.findElement(By.css('label.schema-filter__bonus-item.schema-filter__bonus-item_alter .i-checkbox__real'));
    expect(await selectMinipay.isSelected()).toBeTruthy();
    expect(await selectPrime.isSelected()).toBeTruthy();

    // let listProductFilter; не помню зачем делала, хм
    // try {
    //     listProductFilter = await driver.findElements(By.css('.js-schema-results.schema-grid__center-column'));
    //     const isDisplayedResults = await Promise.all(listProductFilter.map(element => element.isDisplayed()));
    //     expect(isDisplayedResults.every(isDisplayed => isDisplayed)).toBeTruthy();
    // } catch (error) {
    //     console.error('Элементов не найдено', error);
    // }
        const listProductFilter = await driver.findElement(By.css('.js-schema-results.schema-grid__center-column'));
        expect(await listProductFilter.isDisplayed()).toBeTruthy();

        await driver.quit();
    });



    test('4 add product in basket', async () => {
        let driver: WebDriver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        await driver.get('https://catalog.onliner.by/notebook');

        // кликаем по кнопке Предложений в первом элементе продуктов
        const product = await driver.findElement(By.xpath('//*[@id="schema-products"]/div[@class = "schema-product__group"][1]//a[@class = "schema-product__button button button_orange js-product-price-link"]'));
        product.click();
        await driver.sleep(2000);

        // скроллим к группе прдлоежний и кликаем ( чтобы убрать все модалки, который могут заслонять кнопки)
        const groupList = await driver.findElement(By.xpath('//div[@class="offers-list__group"]'));
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });", groupList);
        groupList.click();

        // здесь хочу кликунть по кнопке Вкорзину первого элемента в группе
        let buttonInBasket = await driver.findElement(By.xpath('//div[@class="offers-list__group"]/div[1]//div[@class = "offers-list__control offers-list__control_default helpers_show_tablet"]/a[@class = "button-style button-style_base-alter offers-list__button offers-list__button_cart button-style_expletive"]'));
        expect(await buttonInBasket.isEnabled()).toBeTruthy(); //вот эту проверку проходит
        await driver.executeScript("arguments[0].click();", buttonInBasket); // вот этот клик проходит


        groupList.click(); // кликаю что убрать окно слева
        //  ищем корзину и кликаем   
        const basketShop = await driver.findElement(By.xpath("//a[@title='Корзина']"));
        basketShop.click();

        // проверяем что корзина не пуста
        try {
            let listMyProduct = await driver.findElement(By.xpath('//div[@class="cart-form__offers-list"]'));
            expect(await listMyProduct.isDisplayed()).toBeTruthy();
        } catch (error) {
            console.error("Ошибка:", error.message);
        }

        await driver.quit();
    });


    test('5 place an ad by an unauthorized user', async () => {
        let driver: WebDriver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        await driver.get('https://catalog.onliner.by/notebook');

        const advertisement = await driver.findElement(By.name('ko_unique_2'));
        await driver.executeScript("arguments[0].click();", advertisement);

        const placeAnAd = await driver.findElement(By.id('schema-top-button'));
        placeAnAd.click();
        const login = await driver.findElement(By.css('.no-touch'));
        expect(await driver.findElement(By.css('.no-touch')).isDisplayed()).toBeTruthy();
        //expect(await driver.getCurrentUrl()).toBe('https://profile.onliner.by/login?redirect=https%3A%2F%2Fcatalog.onliner.by%2Fused%2Fcreate');
        await driver.quit();
    })
})


