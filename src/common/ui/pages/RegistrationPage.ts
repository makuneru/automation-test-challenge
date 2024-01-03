import PageActions from '../PageActions';
import Chance from 'chance';
import dotenv from 'dotenv';
import { env } from 'process';
dotenv.config();

const chance = new Chance();
class RegistrationPage extends PageActions {
  get txtfirstName() {
    return $('#customer\\.firstName');
  }
  get txtlastName() {
    return $('#customer\\.lastName');
  }
  get txtAddress() {
    return $('#customer\\.address\\.street');
  }
  get txtCity() {
    return $('#customer\\.address\\.city');
  }
  get txtState() {
    return $('#customer\\.address\\.state');
  }
  get txtZipCode() {
    return $('#customer\\.address\\.zipCode');
  }
  get txtPhoneNumber() {
    return $('#customer\\.phoneNumber');
  }
  get txtSSN() {
    return $('#customer\\.ssn');
  }
  get txtUserName() {
    return $('#customer\\.username');
  }
  get txtPassword() {
    return $('#customer\\.password');
  }
  get txtConfirmPassword() {
    return $('#repeatedPassword');
  }
  get btnPanelRegister() {
    return $('#loginPanel > :nth-child(3) > a');
  }
  get btnRegister() {
    return $('input[value="Register"]');
  }

  async doRegister(username: string, password: string) {
    await this.btnPanelRegister.click();
    await this.txtfirstName.setValue(chance.name());
    await this.txtlastName.setValue(chance.last());
    await this.txtAddress.setValue(chance.street());
    await this.txtCity.setValue(chance.city());
    await this.txtState.setValue(chance.state());
    await this.txtZipCode.setValue(chance.zip());
    await this.txtPhoneNumber.setValue(chance.phone());
    await this.txtSSN.setValue(chance.ssn());

    await this.txtUserName.setValue(username);
    await this.txtPassword.setValue(password);
    await this.txtConfirmPassword.setValue(password);

    await this.btnRegister.click();
  }

  open() {
    return super.openPage(env.BASE_URL as string);
  }
}

export default new RegistrationPage();
