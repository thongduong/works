const puppeteer = require("puppeteer");
const validator = require("validator");
const scrapedDomain = "shopee.vn";
const scrapedURL = `https://${scrapedDomain}/`;
const patternDetail =
  "https?://[a-zA-Z0-9][a-zA-Z0-9-.]+.[a-zA-Z]{2,3}/?.*-i.(.*)[0-9]+.[0-9]+\\?.*$";
const isSameDomain = (domain, url) => {
  return url.includes(domain);
};
const parseURL = (domain, url, patternDetail) => {
  if (!isSameDomain(domain, url)) return [false, false];
  let matchResult = url.match(patternDetail);
  console.log(url);
  return Array.isArray(matchResult) && matchResult.length
    ? matchResult
    : [false, false];
};

const scraping = async (url) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector("section", { timeout: 0 });
  await page.click("body", {
    delay: 3000,
    button: puppeteer.Mouse,
  });
  await page.mouse.down();
  await page.mouse.down();
  await page.mouse.down();
  await page.waitForSelector(
    "section.stardust-tabs-panels__panel > div > div > a",
    {
      timeout: 0,
    }
  );
  // await page.waitForSelector(".home-popup", { visible: true });
  // await page.waitForSelector("#main", {
  //   timeout: 0,
  // });
  let result = await page.evaluate(() => {
    // await window.scrollTo(0, window.document.body.scrollHeight);
    return [...document.links].map((l) => l.href);
  });
  result = result.filter((l) => {
    return validator.isURL(l) && isSameDomain(scrapedDomain, l);
  });
  // console.log(result);
  result.forEach(async (url) => {
    // console.log(`${url}`);
    let [matchedURL, parsedID] = await parseURL(
      scrapedDomain,
      url,
      patternDetail
    );
    parsedID && console.log(`${parsedID}: ${url}`);
    // await scraping(url);
  });

  await browser.close();
};
scraping(scrapedURL);
