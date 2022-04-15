import { Vacancy } from './../services/headhunter/interfaces/response';
export class Utils {
  static async vacancyMapper(vacancy: Vacancy) {
    const newVacancy: Partial<Vacancy> = {};
    await Object.keys(vacancy).map((key) => {
      if (vacancy[key]) {
        newVacancy[key] = vacancy[key];
      }
    });

    return newVacancy;
  }
}
