import Api from './api';
import ApiService from './api/service';
import { Options } from './interfaces';

export class HeadHunter extends Api {
  protected client: ApiService;

  constructor(options: Options) {
    super(options);
    this.client = HeadHunter.createClientApi(this.options);
  }

  public static createClientApi(options: Options) {
    return new ApiService(options);
  }

  public getClientApi() {
    return this.client;
  }
}
