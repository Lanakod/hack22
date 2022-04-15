export type RequestMethod =
  | 'POST'
  | 'GET'
  | 'PUT'
  | 'PATCH'
  | 'DELETE';

/**
 *
 * Тип занятости
 *
 * {full} - Полная занятость
 * {part} - Частичная занятость
 * {project} - Проектная работа
 * {volunteer} - Волонтерство
 * {probation} - Стажировка
 *
 */
export type Employment =
  | 'full'
  | 'part'
  | 'project'
  | 'volunteer'
  | 'probation';

/**
 *
 * Область поиска:
 *
 * {name} - В названии вакансии
 * {company_name} - В названии компании
 * {description} - В описании вакансии
 *
 */
export type SearchField = 'name' | 'company_name' | 'description';

/**
 *
 * Опыт работы:
 *
 * {noExperience} - Нет опыта
 * {between1And3} - От 1 года до 3 лет
 * {between3And6} - От 3 до 6 лет
 * {moreThan6} - Более 6 лет
 *
 */
export type Experience =
  | 'noExperience'
  | 'between1And3'
  | 'between3And6'
  | 'moreThan6';

/**
 *
 * График работы:
 *
 * {fullDay} - Полный день
 * {shift} - Сменный график
 * {flexible} - Гибкий график
 * {remote} - Удаленная работа
 * {flyInFlyOut} - Вахтовый метод
 *
 */
export type Schedule =
  | 'fullDay'
  | 'shift'
  | 'flexible'
  | 'remote'
  | 'flyInFlyOut';

/**
 *
 * Код валюты:
 *
 * {AZN} - Манаты
 * {BYR} - Белорусские рубли
 * {EUR} - Евро
 * {GEL} - Грузинский лари
 * {KGS} - Киргизский сом
 * {KZT} - Тенге
 * {RUR} - Рубли
 * {UAH} - Гривны
 * {USD} - Доллары
 * {UZS} - Киргизский сум
 *
 */
export type Currency =
  | 'AZN'
  | 'BYR'
  | 'EUR'
  | 'GEL'
  | 'KGS'
  | 'KZT'
  | 'RUR'
  | 'UAH'
  | 'USD'
  | 'UZS';

/**
 *
 * Фильтр по меткам вакансий
 *
 * {with_address} - Только с адресом
 * {accept_handicapped} - Только доступные для людей с инвалидностью
 * {not_from_agency} - Без вакансий агентств
 * {accept_kids} - Только доступные для соискателей от 14 лет
 *
 */
export type VacancyLabel =
  | 'with_address'
  | 'accept_handicapped'
  | 'not_from_agency'
  | 'accept_kids';

/**
 *
 * Сортировка
 *
 * {publication_time} - По дате
 * {salary_desc} - По убыванию дохода
 * {salary_asc} - По возрастанию дохода
 * {relevance} - По соответсвию
 * {distance} - По удаленности
 *
 */
export type OrderBy =
  | 'publication_time'
  | 'salary_desc'
  | 'salary_asc'
  | 'relevance'
  | 'distance';

/**
 *
 * Вакансии для подработки
 *
 * {only_saturday_and_sunday} - Работа только по субботам и воскресеньям
 * {from_four_to_six_hours_in_a_day} - Работа сменами по 4 - 6 часов
 * {start_after_sixteen} - Работа по 16:00
 * {accept_temporary} - Вакансии с временным трудоустройством
 * {project} - Проектная работа
 * {part} - Неполный рабочий день
 *
 */
export type PartTimeWork =
  | 'only_saturday_and_sunday'
  | 'from_four_to_six_hours_in_a_day'
  | 'start_after_sixteen'
  | 'accept_temporary'
  | 'project'
  | 'part';
