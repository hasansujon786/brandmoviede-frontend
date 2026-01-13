export interface ILoginParams {
  email: string;
  password: string;
}

export interface ILoginPayload {
  success: boolean;
  message: string;
  type: string; // User Role
  authorization: {
    type: string;
    access_token: string;
    refresh_token: string;
  };
}

export interface IAuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}
