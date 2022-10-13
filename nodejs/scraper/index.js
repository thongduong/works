const puppeteer = require("puppeteer");

(async () => {
  let url = "https://shopee.vn/";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  page.waitForSelector("#main");
  const result = await page.evaluate(() => {
    const elements = document.querySelectorAll("a");
    // do something with elements, like mapping elements to an attribute:
    return Array.from(elements).map((element) => element.href);
  });
  console.log(result);
  // page
  //   .eval(() => {
  //     let element = document.querySelector("a");
  //     return element.innerText;
  //   })
  //   .then((text) => {
  //     console.log(text);
  //   });

  // const elementHandle = await page.$$("a");
  // console.log(elementHandle);
  // elementHandle.forEach((el) => {
  //   el.evaluate((domElement) => {
  //     console.log(domElement);
  //   });
  // });
  // console.log(getAtag);
  // console.log(getAtag);
  // const getInnerHTMLProperty = await getAtag.getProperty("href");
  // const getPtagValues = await getInnerHTMLProperty.jsonValue();
  // console.log(getPtagValues);

  // .then(() => console.log("First URL with image: " + url));
  // for (currentURL of [
  //   "https://example.com",
  //   "https://google.com",
  //   // "https://bbc.com",
  // ]) {
  //   await page.goto(currentURL);
  // }
  // console.log(`Navigating to ${url}...`);
  // // Navigate to the selected page
  // await page.goto(url);
  // // page.waitFor(7000);
  // // Wait for the required DOM to be rendered
  // await page.waitForSelector(".section-recommend-products-wrapper");
  // await page.$("div").forEach((el) => {
  //   console.log(el);
  // });
  // const doc = await page.evaluate(() => document);
  // console.log(doc);

  // Get the link to all the required books
  // let urls = await page.$$eval(
  //   ".stardust-tabs-panels section.stardust-tabs-panels__panel a",
  //   (links) => {
  //     // Make sure the book to be scraped is in stock
  //     // links = links.filter(
  //     //   (link) =>
  //     //     link.querySelector(".instock.availability > i").textContent !==
  //     //     "In stock"
  //     // );
  //     // Extract the links from the data
  //     // links = links.map((el) => el.querySelector("h3 > a").href);
  //     links = links.map((el) => el?.href);
  //     return links;
  //   }
  // );
  // console.log(urls);

  // await page.goto(url);
  // await page.waitForSelector("body");

  // // await page.$("a").forEach((el) => {
  // //   console.log(el);
  // // });
  // // const body = await page.evaluate(() => {
  // //   const hrefElement = document.querySelector("body");
  // //   console.log(hrefElement);
  // //   return hrefElement;
  // // });
  // // console.log(body);

  // let urls = await page.$$eval("body", (links) => {
  //   // Make sure the book to be scraped is in stock
  //   // links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== "In stock")
  //   // // Extract the links from the data
  //   // links = links.map(el => el.querySelector('h3 > a').href)
  //   return links;
  // });
  // console.log(urls);

  await browser.close();
})();

// const browserObject = require("./browser");
// const scraperController = require("./pageController");

// //Start the browser and create a browser instance
// let browserInstance = browserObject.startBrowser();

// // Pass the browser instance to the scraper controller
// scraperController(browserInstance);
