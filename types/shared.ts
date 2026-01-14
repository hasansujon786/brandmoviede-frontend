export interface WithStatus<T> {
  data: T;
  success: boolean;
}

export interface ISuccessMessage {
  success: boolean;
  message: string;
}

export interface IPaginationMetaData {
  total: number;
  page: number;
  limit: number;
}

export interface IPaginationParams {
  page?: number;
  limit?: number;
}
