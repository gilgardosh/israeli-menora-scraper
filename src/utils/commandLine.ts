import inquirer from 'inquirer';
import { smsPassValidator } from './validators.js';

export const getSmsPassword = async (): Promise<string> => {
  for (let i = 0; i < 5; i++) {
    const pass = await askUserForSmsPass();
    if (smsPassValidator(pass)) {
      return pass;
    }
    console.log(`Expected 6 digits pass, got '${pass}'`);
  }
  throw new Error('SMS password is not cometible');
};

const askUserForSmsPass = async (): Promise<string> => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'SMSPassword',
      message: 'Enter the code you got in SMS:',
    },
  ]);

  return answers.SMSPassword;
};
