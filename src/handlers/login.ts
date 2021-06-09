import puppeteer, { Page, Browser } from 'puppeteer';
import { getSmsPassword } from '../utils/commandLine.js';
import { Config, Credentials } from '../utils/types.js';

export const login = async (
  config: Config,
  creds: Credentials
): Promise<Browser> => {
  const browser = await puppeteer.launch({
    headless: !config.visibleBrowser,
  });
  const page: Page = (await browser.pages())[0];
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36'
  );

  await page.goto('https://www.menoramivt.co.il/customer-login/', {
    waitUntil: ['networkidle2', 'domcontentloaded'],
  });
  await page.waitForSelector(
    '#__next > div > div.Main__MainStyle-zzoc7s-0.eEjwjl > div.Login__LoginStyle-sc-1w2us3z-0.fMgtan > div > div > div > form > div.submit-btn > div > button'
  );

  await page.type('#id-num', creds.userID);

  await page.type('#phone-num', creds.phoneNumber);

  await page.click(
    '#__next > div > div.Main__MainStyle-zzoc7s-0.eEjwjl > div.Login__LoginStyle-sc-1w2us3z-0.fMgtan > div > div > div > form > div.submit-btn > div > button'
  );

  await page.waitForSelector(
    '#__next > div > div.Main__MainStyle-zzoc7s-0.eEjwjl > div.Login__LoginStyle-sc-1w2us3z-0.fMgtan > div > div > div > form > div:nth-child(2) > div.submit-btn > div > button'
  );
  const smsPass = await getSmsPassword();

  await page.type('#otp-input-1', smsPass[0]);
  await page.type('#otp-input-2', smsPass[1]);
  await page.type('#otp-input-3', smsPass[2]);
  await page.type('#otp-input-4', smsPass[3]);
  await page.type('#otp-input-5', smsPass[4]);
  await page.type('#otp-input-6', smsPass[5]);

  await page.click(
    '#__next > div > div.Main__MainStyle-zzoc7s-0.eEjwjl > div.Login__LoginStyle-sc-1w2us3z-0.fMgtan > div > div > div > form > div:nth-child(2) > div > div > button'
  );

  return browser;
};
