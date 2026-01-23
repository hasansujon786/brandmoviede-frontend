import { IPaginationMetaData, WithPaginationAndStatus } from "../shared";

export interface ICoins extends IPaginationMetaData {
  data: ICoin[];
}

export interface ICoin {
  id: string;
  name: string;
  price: number;
  thumbnail: string;
  coin_amount: number;
  thumbnail_url: string;
}

export interface IAdminCoinBundle {
  id: string;
  name: string;
  price: number;
  coin_amount: number;
  total_sold?: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export type IAdminCoinBundleDataPayload = WithPaginationAndStatus<
  IAdminCoinBundle[]
>;

export interface ICreateCoinParams {
  price: number;
  thumbnail: File;
  coin_amount: number;
}
