import { BaseResponse, ExtendedVacancyData, ResponseVacancyData } from '../interfaces';

export class ApiResponse<T extends BaseResponse> {
  protected readonly response: T;

  constructor(_response: T) {
    this.response = _response;
  }

  public getResponse(): T {
    return this.response;
  }

  public getData(): ExtendedVacancyData | ResponseVacancyData {
    return this.response.data;
  }
}
