export interface WithStatus<T> {
  data: T;
  success: boolean;
}

export interface ISuccessMessage {
  success: boolean;
  message: string;
}
