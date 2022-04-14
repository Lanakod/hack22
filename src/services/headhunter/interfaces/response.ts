import { Schedule, Currency } from '../types';
export interface Department {
  id: string;
  name: string;
}

export interface ResponseVacancyData {
  items: Vacancy[];
  found: number;
  pages: number;
  per_page: number;
  page: number;
}

export interface ExtendedVacancyData extends ResponseVacancyData {
  clusters: any;
  arguments: any;
  alternative_url: string;
}

export interface Area {
  id: string;
  name: string;
  url: string;
}

export interface Address {
  city?: string;
  street?: string;
  buidling?: string;
  description?: string;
  lat?: number;
  lng?: number;
  raw?: any;
  metro?: Metro;
  metro_stations?: Metro[];
  id: string;
}

export interface VacancyType {
  id: string;
  name: string;
}

export interface ResponseEmployer {
  id: string;
  name: string;
  url: string;
  alternate_url: string;
  logo_urls: object;
  vacancies_url: string;
  trusted: boolean;
}

export interface Salary {
  from: number;
  to: number;
  currency: Currency;
  gross: boolean;
}

export interface Metro {
  station_name: string;
  line_name: string;
  station_id: string;
  line_id: string;
  lat: number;
  lng: number;
}

export interface ResponseSnippet {
  requirement: string;
  responsibility: string;
}

export interface ResponseSchedule {
  id: Schedule;
  name: string;
}

export interface BaseResponse {
  status: number;
  statusText: string;
  data: ResponseVacancyData | ExtendedVacancyData;
}

export interface Vacancy {
  id: string;
  premium: boolean;
  name: string;
  department: Department | null;
  has_test: false;
  response_letter_required: false;
  area: Area;
  salary: Salary;
  type: VacancyType;
  address: string | null;
  response_url: string | null;
  sort_point_distance: string | null;
  archived: boolean;
  created_at: Date;
  published_at: Date;
  apply_alternate_url: string;
  url: string;
  alternate_url: string;
  relations: [];
  employer: ResponseEmployer;
  snippet: ResponseSnippet;
  contacts: any;
  schedule: ResponseSchedule;
  counters: { responses: number };
  working_days: any;
  working_time_intervals: any;
  working_time_modes: any;
  accept_temporary: boolean;
}
