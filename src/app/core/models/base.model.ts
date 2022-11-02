export interface IModelResponse<T> {
  data: T;
  status: boolean;
  error: string;
}

export interface ICollectionResponse<T> {
  result: Array<T>;
  skip: null | number;
  take: null | number;
  total: null | number;
}

export interface IResponseError<T> {
  data: '';
  status: boolean;
  error: string;
}
