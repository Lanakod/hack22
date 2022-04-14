import { BaseResponse } from '../interfaces/response';
import { ApiResponse } from './response';
import { RequestVacancy } from '../interfaces/request';
import ApiRequest from './request';
import { RequestMethods } from '../enums';

class ApiService extends ApiRequest {
  private area: number = 1;
  private responses_count_enabled: boolean = true;

  public async vacancies(params: RequestVacancy) {
    if (!params.responses_count_enabled) {
      params.responses_count_enabled = this.responses_count_enabled;
    }

    return new ApiResponse(
      await this.call<BaseResponse>(
        '/vacancies',
        RequestMethods.GET,
        { area: this.area, ...params }
      )
    );
  }
}

export default ApiService;
