export interface WithStatus<T> {
  data: T;
  success: boolean;
  message: string;
}

export interface WithPaginationAndStatus<T> {
  data: T;
  success: boolean;
  message: string;
  meta_data: {
    total: number;
    page: number;
    limit: number;
  };
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
  search?: string;
}
