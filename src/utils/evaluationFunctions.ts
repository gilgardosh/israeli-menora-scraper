import { Page } from 'puppeteer';

export const getInnerText = async (
  page: Page,
  selector: string
): Promise<string> => {
  const element = await page.waitForSelector(selector).catch(async () => {
    console.log(`Activating safety net for selector ${selector}`);
    await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });
    return await page.waitForSelector(selector);
  });
  const innerText = await page.evaluate(
    (element: Element): string | null => element.textContent,
    element
  );
  if (!innerText) {
    throw new Error(`Couldn't find selector ${selector}`);
  }
  return innerText || '';
};
