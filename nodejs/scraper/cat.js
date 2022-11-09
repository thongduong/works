const puppeteer = require("puppeteer");
const validator = require("validator");
const fs = require("fs");
const dataPath = "./data/url.json";
const scrapedDomain = "shopee.vn";
const scrapedURL = `https://${scrapedDomain}/`;
const patternDetail =
  "https?://[a-zA-Z0-9][a-zA-Z0-9-.]+.[a-zA-Z]{2,3}/?.*-cat.([0-9]+.*[0-9]*.*[0-9]*).*$";
//   const patternDetail =
//   "https?://[a-zA-Z0-9][a-zA-Z0-9-.]+.[a-zA-Z]{2,3}/?.*-i.(.*)[0-9]+.[0-9]+\\?.*$";
const setViewport = {
  width: 1920,
  height: 1080,
  deviceScaleFactor: 1,
  delay: 3000,
};
const pageDownTry = 6;
const isSameDomain = (domain, url) => {
  return url.includes(domain);
};
const parseURL = (domain, url, patternDetail) => {
  if (!isSameDomain(domain, url)) return [false, false];
  let matchResult = url.match(patternDetail);
  return Array.isArray(matchResult) && matchResult.length
    ? matchResult
    : [false, false];
};

const scraping = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.setViewport(setViewport);
  // click login button
  await page.click("a.navbar__link--login", {
    delay: 3000,
    button: puppeteer.Mouse,
  });
  // press pageDown
  for (let index = 0; index < pageDownTry; index++) {
    await page.keyboard.press("PageDown", { delay: 1000 });
  }
  // wait for list product
  await page.waitForSelector(
    "section.stardust-tabs-panels__panel > div > div > a"
  );
  let result = await page.evaluate(() => {
    return [...document.links].map((l) => l.href);
  });
  result = result.filter((l) => {
    return validator.isURL(l) && isSameDomain(scrapedDomain, l);
  });
  // try to parse URL
  result.forEach(async (url) => {
    let [matchedURL, parsedID] = parseURL(scrapedDomain, url, patternDetail);
    if (!parsedID) return;
    writeURL([...parsedID.split(".")]);
    console.log(`${parsedID}`);
  });

  await browser.close();
};
const writeURL = (data) => {
  file = fs.createWriteStream(dataPath);
  file.write(data.join(", ") + "\n");
  file.end();
};
scraping(scrapedURL);
