import { Options } from '../interfaces/options';

abstract class Api {
  protected options: Options & { endpoint: string };

  constructor(options: Options) {
    this.options = {
      endpoint: 'https://api.hh.ru',
      ...options,
    };
  }

  public getPublicId(): string {
    return this.options.publicId;
  }

  public getEndpoint(): string {
    return this.options.endpoint;
  }
}

export default Api;
