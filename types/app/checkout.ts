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
