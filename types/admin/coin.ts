import { WithPaginationAndStatus } from "../shared";

export interface IAdminCoinStats {
  total_coin_bundles: number;
  total_active_coin_bundles: number;
  total_inactive_coin_bundles: number;
  total_coin_sold: number;
  total_revenue: number;
}

export type IActiveStatus = "Active" | "Inactive";

export interface IAdminCoinBundle {
  id: string;
  name: string;
  price: number;
  coin_amount: number;
  total_sold?: number;
  thumbnail?: string;
  status: IActiveStatus;
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
  is_active: boolean;
}

export interface IUpdateCoinParams {
  id: string;
  is_active?: boolean;
  price?: number;
  coin_amount?: number;
  thumbnail?: File;
}
