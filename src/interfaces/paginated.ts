export default interface IPaginated<T> {
  data: T[];
  totalElements: number;
  page: number;
  elements: number;
  elementsPerPage: number;
  totalPages: number;
  firstPage: boolean;
  lastPage: boolean;
}
