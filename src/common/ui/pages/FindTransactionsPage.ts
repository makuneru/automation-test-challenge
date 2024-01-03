import PageActions from '../PageActions';
class FindTransactions extends PageActions {
  get lblFindTransactions() {
    return $('.title');
  }
  get ddlAccount() {
    return $('select[id="accountId"]');
  }

  get txtTransactionById() {
    return $('input[id="criteria.transactionId"]');
  }

  get txtTransactionByDate() {
    return $('input[id="criteria.onDate"');
  }

  get txtTransactionByDateRaneFromDate() {
    return $('input[id="criteria.fromDate"');
  }

  get txtTransactionByDateRaneToDate() {
    return $('input[id="criteria.toDate"');
  }

  get txtTransactionByAmount() {
    return $('input[id="criteria.amount"');
  }

  get lnkTransaction() {
    return $('a[href*="transaction.htm"]');
  }

  get lblTransactionDescription() {
    return $('//td[normalize-space()="Funds Transfer Received"]');
  }

  get lblTransactionAmount() {
    return $('//td[normalize-space()="$100.00"]');
  }

  btnFindTransactions(searchType: string) {
    return $(`button[ng-click="criteria.searchType = '${searchType}'"]`);
  }
}

export default new FindTransactions();
