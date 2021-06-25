import DataLoader from '../utility/data-loader';
import {errorHandler, timeoutPromise} from '../utility/utility';

export default class UserApi {
  constructor() {
    this.dataLoader = new DataLoader();
  }

  async logIn(user, pass, goToHomepage) {
    try {
      const response = await this.dataLoader.httpFetch({
        prefix: 'api/user/',
        endpoint: 'login',
        payload: {
          username: user,
          password: pass
        }
      });

      if (response.success) {
        document.getElementById('error-text').innerHTML = 'You have successfully logged in.';

        await timeoutPromise(2000);

        goToHomepage();
      } else {
        document.getElementById('error-text').innerHTML = response.msg;
      }
    } catch (err) {
      return errorHandler({err: err, context: 'logIn'});
    }
  }

  async addUser(user, pass) {
    try {
      const response = await this.dataLoader.httpFetch({
        prefix: 'api/user/',
        endpoint: 'create',
        payload: {
          username: user,
          password: pass
        }
      });

      if (response.success) {
        document.getElementById('error-text').innerHTML =
          'You have successfully registered. ' +
          'This page will navigate back to the login screen in 3 seconds.';

        await timeoutPromise(2000);

        // return this.router.navigateToRoute('login');
      } else {
        document.getElementById('error-text').innerHTML = response.msg;
      }
    } catch (err) {
      return errorHandler({err: err, context: 'addUser'});
    }
  }

  async logout() {
    try {
      const response = await this.dataLoader.httpFetch({
        prefix: 'api/user/',
        endpoint: 'logout'
      });

      return response;
    } catch (err) {
      return errorHandler({err: err, context: 'logout'});
    }
  }
}