import { HttpStatusCode } from 'axios';
type ResponseAPI<T> = {
  statusCode: HttpStatusCode;
  message?: string;
  data: T;
};

type HitsResponse<T> = {
  data: T;
  total: number;
};
