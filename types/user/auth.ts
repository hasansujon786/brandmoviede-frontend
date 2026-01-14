export interface ILoginParams {
  email: string;
  password: string;
}

export interface ILoginPayload {
  success: boolean;
  message: string;
  type: string; // User Role: admin | user
  authorization: {
    type: string; // auth type such as: bearer
    access_token: string;
    refresh_token: string;
  };
}

export interface IAuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  address: string | null;
  phone_number: string | null;
  type: "user" | "admin"; // User Role
  gender: "male" | "female" | "other" | null;
  date_of_birth: string | null; // ISO date string
  created_at: string; // ISO datetime string
}
