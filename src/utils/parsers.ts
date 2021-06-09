import { Accumulation, Route } from './types.js';

export const parseLastConnection = (raw: string): Date => {
  const textSplit = raw.split(': ');
  if (textSplit.length != 2) {
    throw new Error(`Couldn't parse ${raw} into date`);
  }
  const dateTimeAplit = textSplit[1].split(' ,');
  if (dateTimeAplit.length != 2) {
    throw new Error(`Couldn't parse ${textSplit[1]} into date`);
  }
  const dateSplit = dateTimeAplit[0].split('.').map((d) => parseInt(d));
  if (dateSplit.length != 3) {
    throw new Error(`Couldn't parse ${dateTimeAplit[0]} into date`);
  }
  const timeSplit = dateTimeAplit[1].split(':').map((d) => parseInt(d));
  if (timeSplit.length != 2) {
    throw new Error(`Couldn't parse ${dateTimeAplit[1]} into time`);
  }
  return new Date(
    dateSplit[2],
    dateSplit[1] - 1,
    dateSplit[0],
    timeSplit[0],
    timeSplit[1]
  );
};

export const parseDate = (rawDate: string): Date => {
  try {
    const dateParts = rawDate.split('.').map((part) => parseInt(part));
    switch (dateParts.length) {
      case 2:
        return new Date(dateParts[1], dateParts[0] - 1, 1);
      case 3:
        return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
      default:
        throw new Error();
    }
  } catch (e) {
    throw new Error(`Error parsing date: cannot parse ${rawDate}`);
  }
};

export const parseShekelString = (raw: string): number => {
  raw = raw.replace('₪', '').replace(',', '');
  const number = parseFloat(raw);
  return number;
};

export const parsePercentage = (raw: string): number => {
  raw = raw.replace('%', '');
  const number = parseFloat(raw);
  return number;
};

export const parseFundNumber = (raw: string): string => {
  const fundNum = raw.replace('מספר קופה ', '');
  return fundNum;
};

export const parseRoute = (raw: string): Route => {
  const textSplit = raw.split('% ');
  if (textSplit.length != 2) {
    throw new Error(`Couldn't parse ${raw} into route`);
  }
  const route: Route = {
    name: textSplit[1],
    percentage: parseFloat(textSplit[0]),
  };

  return route;
};

export const parseAccumulation = (raw: string): Accumulation => {
  const textSplit = raw.split(' | ');
  if (textSplit.length != 2) {
    throw new Error(`Couldn't parse ${raw} into accumulation`);
  }
  const accumulation: Accumulation = {
    balance: parseShekelString(textSplit[1]),
    percentage: parsePercentage(textSplit[0]),
  };

  return accumulation;
};
