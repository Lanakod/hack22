import { RequestMethod } from '../types';
import Api from '.';
import fetch from 'node-fetch';
import { Headers } from '../interfaces/request';
import { BaseResponse } from '../interfaces/response';

abstract class ApiRequest extends Api {
  /**
   *
   * HTTP Client
   *
   */
  public get client(): typeof fetch {
    return fetch;
  }

  /**
   *
   * Request to API endpoint
   *
   */
  public async call<R extends BaseResponse>(
    uri: string,
    method: RequestMethod,
    params?: object,
    data?: object
  ): Promise<R> {
    const headers: Headers = {
      'Content-Type': 'application/json',
    };

    let fetchUrl = this.getEndpoint().concat(uri);
    if (params) {
      fetchUrl =
        fetchUrl +
        '?' +
        new URLSearchParams({ ...params }).toString();
    }

    const response = await this.client(fetchUrl, {
      headers,
      method,
      body: data ? JSON.stringify(data) : undefined,
    });

    return (await response.json()) as R;
  }
}

export default ApiRequest;
