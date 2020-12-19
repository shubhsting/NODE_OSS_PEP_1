const puppeteer = require("puppeteer");
const fs = require("fs");
const id = "teamstudentscorner.tyb@gmail.com";
const pw = "Shubham@123";
let data = [];
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
    await page.type('.search-global-typeahead__input.always-show-placeholder', "@unacademy.com");
    await page.keyboard.press('Enter');
    await page.waitForSelector('.search-vertical-filter__filter-item.mr2', { visible: true, timeout: "100000" });
    let example = await page.$$('.search-vertical-filter__filter-item.mr2');
    await example[2].click();
    await page.waitForSelector('#voyager-feed', { visible: true, timeout: "100000" });
    await autoScroll(page, data);

    // console.log(data);



//
//
//@olx.com
//@postman.com

//@delhivery.com
//@synopsys.com
//@urbancompany.com
//@dream11.com
//@zomato.com
//@swiggy.in
    async function autoScroll(page, data) {
        await page.evaluate(async () => {
            await new Promise((resolve, reject) => {
                var totalHeight = 0;
                var distance = 100;
                let data = [];
                var timer = setInterval(() => {
                    var scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
                    let anchor = document.querySelectorAll('a[href$="@unacademy.com"]');
                    for (let i = 0; i < anchor.length; i++) {
                        let op = anchor[i].textContent;
                        if (data.indexOf(op) == -1)
                            data.push(op);
                    }
                    if (data.length > 200) { console.log(data); resolve(); }
                    if (totalHeight >= scrollHeight) {
                        clearInterval(timer);
                        console.log(data);
                        resolve();
                    }
                }, 1000);
            });
        });
    }






})();


