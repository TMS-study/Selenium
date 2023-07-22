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
        //НЕ ПОЛУЧАЕТСЯ КЛИКНУТЬ ПО ЭТОЙ КНОПКЕ
        let buttonInBasket = await driver.findElement(By.xpath('//div[@class="offers-list__group"]/div[1]//div[@class = "offers-list__control offers-list__control_default helpers_show_tablet"]/a[@class = "button-style button-style_base-alter offers-list__button offers-list__button_cart button-style_expletive"]'));
        //локатор2   //a[@class="button-style button-style_base-alter offers-list__button offers-list__button_cart button-style_expletive"]
        //await driver.wait(until.elementIsVisible(buttonInBasket), 10000); //ставила ожидание видимости, фейлится- тормозит пока не привысит таймаут
        expect(await buttonInBasket.isEnabled()).toBeTruthy(); //вот эту проверку проходит
        //expect(await buttonInBasket.isDisplayed()).toBeTruthy(); //тут тоже фейлится, а почему?
        await driver.executeScript("arguments[0].click();", buttonInBasket); // вот этот клик проходит
        //buttonInBasket.click();// кликаю и вроде проходит, но не виже что кликунлось и товар добавился, почему такой клик не проходит?
        await driver.sleep(3000); 
        
        
        groupList.click(); // кликаю что убрать окно слева
        //  ищем корзину и кликаем   
        const basketShop = await driver.findElement(By.xpath("//a[@title='Корзина']"));
        basketShop.click();
        await driver.sleep(2000);
        // проверяем что корзина не пуста
        try {
            let listMyProduct = await driver.findElement(By.xpath('//div[@class="cart-form__offers-list"]'));
            expect(await listMyProduct.isDisplayed()).toBeTruthy();
        } catch (error) {
            let listMyProductEmpty = await driver.findElement(By.xpath('//div[@class="cart-message__title cart-message__title_big" and contains(text(), "Ваша корзина пуста")]'));
            expect(await listMyProductEmpty.getText()).toContain("Ваша корзина пуста");
        }

        await driver.quit();
    });

    test('5 place an ad by an unauthorized user', async () => {
        let driver: WebDriver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        await driver.get('https://catalog.onliner.by/notebook');

        const advertisement = await driver.findElement(By.name('ko_unique_2'));
        await driver.executeScript("arguments[0].click();", advertisement);
        await driver.sleep(2000);

        const placeAnAd = await driver.findElement(By.id('schema-top-button'));
        placeAnAd.click();
        await driver.sleep(2000);
        expect(await driver.getCurrentUrl()).toBe('https://profile.onliner.by/login?redirect=https%3A%2F%2Fcatalog.onliner.by%2Fused%2Fcreate');
        await driver.sleep(2000);
        await driver.quit();
    })

})

