// request
export interface CapturePaypalOrderRequest {
  orderId: string;
}

// success response
export interface CapturePaypalOrderResponse {
  success: true;
  message: string;
  data: {
    id: string;
    status: string;
    payer: {
      name: {
        given_name: string;
        surname: string;
      };
      email_address: string;
      payer_id: string;
      address: {
        country_code: string;
      };
    };
    purchase_units: {
      reference_id: string;
      payments: {
        captures: {
          id: string;
          status: string;
          amount: {
            currency_code: string;
            value: string;
          };
          create_time: string;
          update_time: string;
        }[];
      };
    }[];
  };
}

// failed response (optional but recommended)
export interface CapturePaypalOrderError {
  success: false;
  message: string;
  error: string;
}

export interface IAppCoinCheckoutOrderPaypalParams {
  sugoId: string;
  items: {
    bundle_id: string;
    quantity?: number;
    coin_amount?: number;
  }[];
}

export type IAppCoinCheckoutOrderResponsePaypal = {
  order_id: string;
  approval_url: string;
  transaction_id: string;
  orders: Array<string>;
};

export interface IAppTicketCheckoutOrderParamsPaypal {
  ticketId: string;
}

export type IAppTicketCheckoutOrderResponsePaypal = {
  order_id: string;
  approval_url: string;
  transaction_id: string;
};

export interface IAppCoinCheckoutOrderResponse {
  client_secret: string;
  transaction_id: string;
  orders: string[];
}
