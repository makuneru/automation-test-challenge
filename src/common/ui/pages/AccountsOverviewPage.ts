import PageActions from '../PageActions';
class AccountsOverview extends PageActions {
  get ttlAccountOverview() {
    return $('.title');
  }

  get ttlAccountDetails() {
    return $('div[ng-if="showDetails"] h1[class="title"]');
  }

  get lblAccountNumber() {
    return $('td#accountId');
  }

  get lblAccountType() {
    return $('td#accountType');
  }

  get lblBalance() {
    return $('td#balance');
  }

  get lblAvailableBalance() {
    return $('td#availableBalance');
  }

  lnkAccountByAccountNumber(accountNumber: string) {
    return $(`a[href*="activity.htm?id=${accountNumber}"]`);
  }
}

export default new AccountsOverview();
