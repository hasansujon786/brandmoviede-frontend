export interface IAppCoinBundle {
  id: string;
  name: string;
  price: number;
  thumbnail: string;
  coin_amount: number;
  thumbnail_url: string;
}

export type IAppCoinCheckoutParams = {
  sugo_id: string;
  items: IAppCoinCheckoutItem[];
};

export type IAppCoinCheckoutItem = {
  bundle_id: string;
  quantity: number;
};

export interface IAppCoinCartCheckoutDraftList {
  id: string;
  user_id: string;
  sugo_id: string;
  items: IAppCoinCartCheckoutDraftItem[];
}

export interface IAppCoinCartCheckoutDraftItem {
  id: string;
  quantity: number;
  created_at: string; // ISO date string
  coin_bundle: {
    id: string;
    name: string;
    price: number;
    coin_amount: number;
    total_coin: number;
    thumbnail: string;
    thumbnail_url: string;
    created_at: string; // ISO date string
  };
}
