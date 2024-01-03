import PageActions from '../PageActions';
import dotenv from 'dotenv';
import { env } from 'process';
dotenv.config();

class LoginPage extends PageActions {
  get txtUsername() {
    return $('input[name="username"]');
  }

  get txtPassword() {
    return $('input[name="password"]');
  }

  get btnLogin() {
    return $('input[value="Log In"]');
  }

  get hdrCustomerLogin() {
    return $('div[id="leftPanel"] h2');
  }

  setUsername = async (username: string) => {
    await this.txtUsername.clearValue();
    await this.txtUsername.setValue(username);
  };

  setPassword = async (password: string) => {
    await this.txtPassword.clearValue();
    await this.txtPassword.setValue(password);
  };

  clickLogin = async () => {
    await this.btnLogin.click();
  };

  doLogin = async (username: string, password: string) => {
    await this.setUsername(username);
    await this.setPassword(password);
    await this.clickLogin();
  };

  open() {
    return super.openPage(env.BASE_URL as string);
  }
}

export default new LoginPage();
