import LoginPage from '../common/ui/pages/LoginPage';
import GlobalNavigationMenu from '../common/ui/pages/GlobalNavigationMenu';
import OpenNewAccountPage from '../common/ui/pages/OpenNewAccountPage';
import FindTransactionsPage from '../common/ui/pages/FindTransactionsPage';
import RegistrationPage from '../common/ui/pages/RegistrationPage';
import Allure from '../utils/Allure';
import { ExecuteRequest } from '../common/api/BaseResponse';
import RequestConfigBuilder from '../common/api/RequestConfig';
import userDetailsSchema from '../data/schema/userDetails.json';
import createAccountSchema from '../data/schema/createAccount.json';
import findTransactionsSchema from '../data/schema/findTransactions.json';
import Chance from 'chance';
import Ajv from 'ajv';

const chance = new Chance();
const avj = new Ajv();
describe('Automation Test Challenge', async () => {
  let username: string, password: string, newAccountId: string;
  const MIN_DEPOSIT = 100;

  describe('UI Automation', async () => {
    it('Regiter a new user.', async () => {
      Allure.logStep('Navigate to parabank app.');
      await RegistrationPage.open();

      username = chance.word({ syllables: 3 });
      password = chance.word({ syllables: 4 });

      Allure.logStep('Register a new user.');
      await RegistrationPage.doRegister(username, password);

      Allure.logStep('Logout');
      await GlobalNavigationMenu.lnkLogout.click();
    });

    it('Login to parabank app.', async () => {
      Allure.logStep('Enter credentials and sign on.');
      await LoginPage.doLogin(username, password);
    });

    it('Navigate to open new account page and create a savings account.', async () => {
      Allure.logStep('Navigate to open new account page.');
      await GlobalNavigationMenu.lnkOpenNewAccount.click();
      await expect(OpenNewAccountPage.ttlOpenNewAccount).toBeExisting();

      Allure.logStep('Select savings account and click open new account.');
      await OpenNewAccountPage.ddlAccountType.selectByAttribute('value', '1'); //1 is SAVINGS
      await OpenNewAccountPage.btnOpenNewAccount.click();
      await expect(OpenNewAccountPage.ttlAccountOpened).toHaveText('Account Opened!');

      //store the newly created account ID
      newAccountId = await OpenNewAccountPage.lnkNewAccountId.getText();
    });

    it('Find transactions from created account by amount.', async () => {
      Allure.logStep('Navigate to find transactions page.');
      await GlobalNavigationMenu.lnkFindTransactions.click();
      await expect(FindTransactionsPage.lblFindTransactions).toHaveText('Find Transactions');

      Allure.logStep('Select the created account and click find transactions.');
      await FindTransactionsPage.ddlAccount.selectByAttribute('value', newAccountId);
      await FindTransactionsPage.txtTransactionByAmount.setValue(MIN_DEPOSIT);
      await FindTransactionsPage.btnFindTransactions('AMOUNT').click();

      const transactionDescription = await FindTransactionsPage.lnkTransaction.getText();

      Allure.logStep('Click on transaction details link.');
      await FindTransactionsPage.lnkTransaction.click();

      Allure.logStep('Verify transaction details.');
      await expect(await FindTransactionsPage.lblTransactionDescription.getText()).toEqual(transactionDescription);
      Allure.logStep(await FindTransactionsPage.lblTransactionAmount.getText());
      const transactionAmount = parseInt((await FindTransactionsPage.lblTransactionAmount.getText()).replace('$', ''));
      await expect(transactionAmount).toEqual(MIN_DEPOSIT);
    });
  });

  describe('API Automation', async () => {
    let customerId: string, apiNewAccountId: string;
    //Since the app does not have expose API for login to authenticate. I've use the created user to retrieve the customer ID.
    it('Get customer id using newly registered user.', async () => {
      //prepare request config
      const requestConfig = new RequestConfigBuilder()
        .setMethod('GET')
        .setUrl(`/services/bank/login/${username}/${password}`) //endpoint
        .build();

      //execute request
      const res = await ExecuteRequest(requestConfig);

      //validate response
      expect(res.status).toEqual(200);
      customerId = res.data.id;

      //validate schema
      const validateSchema = avj.compile(userDetailsSchema);
      const isValid = validateSchema(res.data);
      expect(isValid).toBeTruthy();
    });

    it('Create a savings account using createAccount via API.', async () => {
      //prepare request config
      const requestConfig = new RequestConfigBuilder()
        .setMethod('POST')
        .setUrl('/services/bank/createAccount') //endpoint
        .setParams({ customerId: customerId, newAccountType: 1, fromAccountId: newAccountId })
        .build();

      //execute request
      const res = await ExecuteRequest(requestConfig);

      //validate response
      expect(res.status).toEqual(200);
      apiNewAccountId = res.data.id;

      //validate schema
      const validateSchema = avj.compile(createAccountSchema);
      const isValid = validateSchema(res.data);
      expect(isValid).toBeTruthy();
    });

    it('Find transaction by amount using newly created account via API.', async () => {
      //prepare request config
      const requestConfig = new RequestConfigBuilder()
        .setMethod('GET')
        .setUrl(`/services/bank/accounts/${apiNewAccountId}/transactions/amount/${MIN_DEPOSIT}`) //endpoint
        .build();

      //execute request
      const res = await ExecuteRequest(requestConfig);

      //validate response
      expect(res.status).toEqual(200);

      //validate schema
      const validateSchema = avj.compile(findTransactionsSchema);
      const isValid = validateSchema(res.data);
      expect(isValid).toBeTruthy();
    });
  });
});
