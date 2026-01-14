import { IPaginationMetaData } from "../shared";

export interface ICoins {
  data: ICoin[];
  meta_data: IPaginationMetaData;
}

export interface ICoin {
  id: string;
  name: string;
  price: number;
  thumbnail: string;
  coin_amount: number;
  thumbnail_url: string;
}
