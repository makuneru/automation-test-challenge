import PageActions from '../PageActions';
class GlobalNavigationMenu extends PageActions {
  get lnkOpenNewAccount() {
    return $('a[href*="openaccount.htm"]');
  }

  get lnkOverview() {
    return $('a[href*="overview.htm"]');
  }

  get lnkTransferFunds() {
    return $('a[href*="transfer.htm"]');
  }

  get lnkBillPay() {
    return $('a[href*="billpay.htm"]');
  }

  get lnkFindTransactions() {
    return $('a[href*="findtrans.htm"]');
  }

  get lnkUpdateContactInfo() {
    return $('a[href*="updateprofile.htm"]');
  }

  get lnkRequestLoan() {
    return $('a[href*="requestloan.htm"]');
  }

  get lnkLogout() {
    return $('a[href*="logout.htm"]');
  }
}

export default new GlobalNavigationMenu();
