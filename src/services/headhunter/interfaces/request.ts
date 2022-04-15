import {
  Employment,
  Experience,
  Schedule,
  SearchField,
  Currency,
  VacancyLabel,
  OrderBy,
} from '../types';

export interface Headers {
  [key: string]: string;
}

export interface RequestVacancy {
  text?: string;
  search_field?: SearchField;
  experience?: Experience;
  emplyment?: Employment;
  schedule?: Schedule;
  area?: number;
  metro?: number; // id станции метро
  specialization?: number; // id специализации
  industry?: number; // id индустрии
  employer_id?: number; // id комании
  currency?: Currency;
  salary?: number;
  label?: VacancyLabel;
  only_with_salary?: boolean;
  period?: number; // число от 1 до 30
  order_by?: OrderBy;
  sort_point_lat?: number; // Указывать если order_by = distance
  sort_point_lng?: number; // Указывать если order_by = distance
  date_from?: string; // Дата в формате ISO 8601 - YYYY-MM-DD или с точностью до секунды YYYY-MM-DDhh:mm:ss;
  date_to?: string; // Дата в формате ISO 8601 - YYYY-MM-DD или с точностью до секунды YYYY-MM-DDhh:mm:ss;
  clusters?: boolean;
  responses_count_enabled?: boolean;
  describe_arguments?: boolean;
  no_magic?: boolean; // Преобразование запроса text=Москва бухгалтер 100500 в запрос text=бухгалтер&only_with_salary=true&area=1&salary=100500
  premium?: boolean;
  part_time?: string;
  professional_role?: number;
  per_page?: number;
  page?: number;
}
