import PageActions from '../PageActions';
class OpenNewAccountPage extends PageActions {
  get ttlOpenNewAccount() {
    return $('.title');
  }

  get ddlAccountType() {
    return $('#type');
  }

  get ddlFromAccount() {
    return $('#fromAccountId');
  }

  get btnOpenNewAccount() {
    return $('input[value="Open New Account"]');
  }

  get lnkNewAccountId() {
    return $('#newAccountId');
  }

  get ttlAccountOpened() {
    return $('.title');
  }
}

export default new OpenNewAccountPage();
