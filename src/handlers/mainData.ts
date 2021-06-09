import { Browser, Page } from 'puppeteer';
import { getInnerText } from '../utils/evaluationFunctions.js';
import {
  parseAccumulation,
  parseDate,
  parseFundNumber,
  parseLastConnection,
  parsePercentage,
  parseRoute,
  parseShekelString,
} from '../utils/parsers.js';
import { MenoraData } from '../utils/types.js';

export const mainPageHandler = async (
  browser: Browser
): Promise<MenoraData> => {
  const page: Page = (await browser.pages())[0];

  const button = await page.waitForSelector(
    '#page-content > div > div.MuiGrid-root.page-container.MuiGrid-container.MuiGrid-justify-xs-center > div > div:nth-child(2) > div > div.MuiGrid-root.strip-container.MuiGrid-container > div.MuiGrid-root.strip-btns-item.MuiGrid-item.MuiGrid-grid-xs-12 > div > a'
  );

  const pensionLink = await page.evaluate(
    (anchor) => anchor.getAttribute('href'),
    button
  );

  const pensionPage = await browser.newPage();
  await pensionPage.goto(pensionLink, {
    waitUntil: ['networkidle2', 'domcontentloaded'],
  });

  const userName = await getInnerText(
    pensionPage,
    '#user-header-container > div > div > div > div > div > span.user-private-details-name'
  );
  const userId = await getInnerText(
    pensionPage,
    '#user-header-container > div > div > div > div > div > span:nth-child(3)'
  );
  const lastConnection = await getInnerText(
    pensionPage,
    '#user-header-container > div > div > div > div > span'
  ).then((res) => parseLastConnection(res));

  const dataRelevanceDate = await getInnerText(
    pensionPage,
    '#page-content > div > div.Header__HeaderStyle-sc-129wj29-0.daoRqd > div > div:nth-child(1) > div > span:nth-child(2)'
  ).then((d) => parseDate(d));
  const fundNumber = await getInnerText(
    pensionPage,
    '#page-content > div > div.Header__HeaderStyle-sc-129wj29-0.daoRqd > div > div.MuiGrid-root.collective-name.MuiGrid-item.MuiGrid-grid-xs-12 > h4:nth-child(2)'
  ).then((d) => parseFundNumber(d));

  const expectedRetirementAllowance = await getInnerText(
    pensionPage,
    '#main-content-life > div > div.MuiGrid-root.policy-and-claims.MuiGrid-container > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-md-8.MuiGrid-grid-lg-7 > div > div:nth-child(1) > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-md-12.MuiGrid-grid-lg-8 > div.MuiGrid-root.MuiGrid-container > div:nth-child(1) > div > div.text-area > span'
  ).then((d) => parseShekelString(d));
  const retirementAge = await getInnerText(
    pensionPage,
    '#main-content-life > div > div.MuiGrid-root.policy-and-claims.MuiGrid-container > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-md-8.MuiGrid-grid-lg-7 > div > div:nth-child(1) > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-md-12.MuiGrid-grid-lg-8 > div.MuiGrid-root.MuiGrid-container > div:nth-child(2) > div > div.text-area > span'
  ).then((d) => parseInt(d));
  const expectedDisabilityAllowance = await getInnerText(
    pensionPage,
    '#main-content-life > div > div.MuiGrid-root.policy-and-claims.MuiGrid-container > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-md-8.MuiGrid-grid-lg-7 > div > div:nth-child(1) > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-md-12.MuiGrid-grid-lg-8 > div.MuiGrid-root.MuiGrid-container > div:nth-child(3) > div > div.text-area > span'
  ).then((d) => parseShekelString(d));
  const survivorsBenefits = await getInnerText(
    pensionPage,
    '#main-content-life > div > div.MuiGrid-root.policy-and-claims.MuiGrid-container > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-md-8.MuiGrid-grid-lg-7 > div > div:nth-child(1) > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-md-12.MuiGrid-grid-lg-8 > div.MuiGrid-root.MuiGrid-container > div:nth-child(4) > div > div.text-area > span'
  ).then((d) => parseShekelString(d));

  const accumulatedBalance = await getInnerText(
    pensionPage,
    '#main-content-life > div > div.MuiGrid-root.policy-and-claims.MuiGrid-container > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-md-8.MuiGrid-grid-lg-7 > div > div:nth-child(1) > div.MuiGrid-root.general-details-accumulation-area.MuiGrid-item.MuiGrid-grid-md-4.MuiGrid-grid-lg-4 > div.MuiGrid-root.MuiGrid-container.MuiGrid-direction-xs-column > div > div > div.text-area > span'
  ).then((d) => parseShekelString(d));
  const joinDate = await getInnerText(
    pensionPage,
    '#main-content-life > div > div.MuiGrid-root.policy-and-claims.MuiGrid-container > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-md-8.MuiGrid-grid-lg-7 > div > div:nth-child(1) > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-md-5.MuiGrid-grid-lg-8 > div.MuiGrid-root.MuiGrid-container.MuiGrid-direction-xs-column > div > div > div.text-area > span'
  ).then((d) => parseDate(d));

  const feesFromAccumulation = await getInnerText(
    pensionPage,
    '#main-content-life > div > div.MuiGrid-root.policy-and-claims.MuiGrid-container > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-md-8.MuiGrid-grid-lg-7 > div > div:nth-child(1) > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-md-5.MuiGrid-grid-lg-4 > div.MuiGrid-root.accumulation-container.MuiGrid-container.MuiGrid-direction-xs-column > div:nth-child(1) > div > div.text-area > span'
  ).then((d) => parsePercentage(d));
  const feesFromDeposit = await getInnerText(
    pensionPage,
    '#main-content-life > div > div.MuiGrid-root.policy-and-claims.MuiGrid-container > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-md-8.MuiGrid-grid-lg-7 > div > div:nth-child(1) > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-md-5.MuiGrid-grid-lg-4 > div.MuiGrid-root.accumulation-container.MuiGrid-container.MuiGrid-direction-xs-column > div:nth-child(2) > div > div > span'
  ).then((d) => parsePercentage(d));

  const benefitsRoute = await getInnerText(
    pensionPage,
    '#main-content-life > div > div.MuiGrid-root.policy-and-claims.MuiGrid-container > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-md-8.MuiGrid-grid-lg-7 > div > div:nth-child(2) > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-direction-xs-column > div:nth-child(1) > div > div > div.text-area > span'
  ).then((d) => parseRoute(d));
  const compensationRoute = await getInnerText(
    pensionPage,
    '#main-content-life > div > div.MuiGrid-root.policy-and-claims.MuiGrid-container > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-md-8.MuiGrid-grid-lg-7 > div > div:nth-child(2) > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-direction-xs-column > div:nth-child(2) > div > div > div.text-area > span'
  ).then((d) => parseRoute(d));
  const associateAccumulation = await getInnerText(
    pensionPage,
    '#main-content-life > div > div.Finance__FinanceWrapper-sc-16doiy-0.cCNakT > div > div.MuiGrid-root.details-container.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-md-12.MuiGrid-grid-lg-5 > div > div.left-main-container > div.chartLegends > div:nth-child(1) > div.details > span.detailsPrice'
  ).then((d) => parseAccumulation(d));
  const employerAccumulation = await getInnerText(
    pensionPage,
    '#main-content-life > div > div.Finance__FinanceWrapper-sc-16doiy-0.cCNakT > div > div.MuiGrid-root.details-container.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-md-12.MuiGrid-grid-lg-5 > div > div.left-main-container > div.chartLegends > div:nth-child(2) > div.details > span.detailsPrice'
  ).then((d) => parseAccumulation(d));
  const compensationsAccumulation = await getInnerText(
    pensionPage,
    '#main-content-life > div > div.Finance__FinanceWrapper-sc-16doiy-0.cCNakT > div > div.MuiGrid-root.details-container.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-md-12.MuiGrid-grid-lg-5 > div > div.left-main-container > div.chartLegends > div:nth-child(3) > div.details > span.detailsPrice'
  ).then((d) => parseAccumulation(d));

  const data: MenoraData = {
    userId,
    userName,
    lastConnection,
    dataRelevanceDate,
    fundNumber,
    expectedBenefits: {
      expectedRetirementAllowance,
      retirementAge,
      expectedDisabilityAllowance,
      survivorsBenefits,
    },
    accumulatedBalance,
    joinDate,
    managementFees: {
      fromAccumulation: feesFromAccumulation,
      fromDeposit: feesFromDeposit,
    },
    investmentRoutes: {
      benefits: benefitsRoute,
      compensations: compensationRoute,
    },
    accumulation: {
      associate: associateAccumulation,
      employer: employerAccumulation,
      compensations: compensationsAccumulation,
    },
  };

  return data;
};
