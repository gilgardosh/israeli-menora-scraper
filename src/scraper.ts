import { Config, Credentials, MenoraData } from './utils/types.js';
import { mainPageHandler } from './handlers/mainData.js';
import { login } from './handlers/login.js';

export class menoraScraper {
  private _config: Config = {
    validate: true,
    visibleBrowser: true,
    getAnnualFinancialData: false,
    getDeposits: false,
    getDepositsDetails: false,
    getCoverages: false,
    getCoveragesDetails: false,
    getPersonalDetails: false,
  };
  private _creds: Credentials = {
    userID: '',
    phoneNumber: '',
  };
  constructor(config: Partial<Config> = {}, credentials?: Credentials) {
    this.updateConfigurations(config);
    this.updateCredentials(credentials);
  }

  updateConfigurations = (config: Partial<Config> = {}): void => {
    this._config = Object.assign(this._config, config);
  };

  updateCredentials = (credentials?: Credentials): void => {
    this._creds.userID = credentials?.userID || (process.env.USER_ID as string);
    this._creds.phoneNumber =
      credentials?.phoneNumber || (process.env.USER_PHONE as string);
  };

  scrape = async (): Promise<MenoraData> => {
    const loggedBrowser = await login(this._config, this._creds);

    const data = await mainPageHandler(loggedBrowser);
    loggedBrowser.close();
    return data;
  };
}
