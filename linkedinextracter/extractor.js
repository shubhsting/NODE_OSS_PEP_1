const puppeteer = require("puppeteer");
const fs = require("fs");
const id = "priyanshiverma1840@gmail.com";
const pw = "Shubham@123";

let target;
let arr = ["@olx.com", "@postman.com", "@delhivery.com", "@synopsys.com", "@urbancompany.com", "@dream11.com", "@zomato.com", "@swiggy.in","@freecharge.com"];
// console.log(data);
(async function () {

    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        args: ["--start-maximized"],
    });
    let allPages = await browser.pages();
    let page = allPages[0];
    tab = page;
    await page.goto("https://www.linkedin.com/checkpoint/lg/login");
    await page.type("#username", id);
    await page.type("#password", pw);
    await page.click('.login__form_action_container');
    await page.waitForSelector('.search-global-typeahead__input.always-show-placeholder', { visible: true, timeout: "100000" });
    await page.click('.search-global-typeahead__input.always-show-placeholder');




    await page.click('.search-global-typeahead__input.always-show-placeholder');

    await page.type('.search-global-typeahead__input.always-show-placeholder', "@udaan.com");
    await page.keyboard.press('Enter');
    await page.waitForSelector('.search-vertical-filter__filter-item.mr2', { visible: true, timeout: "100000" });
    let example = await page.$$('.search-vertical-filter__filter-item.mr2');

    await example[2].click();
    await page.waitForSelector('#voyager-feed', { visible: true, timeout: "100000" });
    // let arr = await autoScroll(page);
    const items = await scrapeInfiniteScrollItems(page, extractItems, 100);

    let data = fs.readFileSync("emails.txt");
    data = JSON.parse(data);


    for (let i = 0; i < items.length; i++) data.push(items[i]);

    data = JSON.stringify(data);
    fs.writeFileSync("emails.txt", data);
    console.log(items);


    // 'a[href$="@unacademy.com"]'
    //
    //
    //
    //
    //
    //
    //
    //



})();

async function scrapeInfiniteScrollItems(
    page,
    extractItems,
    itemTargetCount,
    scrollDelay = 1000,
) {
    let items = [];
    try {
        let previousHeight = 0;

        while (items.length < itemTargetCount) {
            let newitems = await page.evaluate(extractItems);
            for (let i = 0; i < newitems.length; i++) {
                let item = newitems[i];
                if (items.indexOf(item) == -1) items.push(item);
            }
            let newFullHeight = await page.evaluate('document.body.scrollHeight');

            if (newFullHeight > previousHeight) {
                previousHeight = newFullHeight;
                await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
                await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
                await page.waitForTimeout(scrollDelay);
            }
            else break;

        }
    } catch (e) { }
    return items;
}


function extractItems() {
    const extractedElements = document.querySelectorAll(`a[href$="@udaan.com"]`);
    const items = [];
    for (let element of extractedElements) {
        items.push(element.innerText);
    }
    return items;
}


