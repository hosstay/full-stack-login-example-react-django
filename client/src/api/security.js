import DataLoader from '../utility/data-loader';
import {errorHandler} from '../utility/utility';

export default class SecurityApi {
  constructor() {
    this.dataLoader = new DataLoader();
  }

  async verifyToken() {
    try {
      const response = await this.dataLoader.httpFetch({
        prefix: 'api/security/',
        endpoint: 'verifyToken'
      });

      return response;
    } catch (err) {
      return errorHandler({err: err, context: 'verifyToken'});
    }
  }
}