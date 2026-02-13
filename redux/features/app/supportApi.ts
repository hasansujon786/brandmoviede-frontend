import { baseApi } from "@/redux/api/baseApi";
import { WithStatus } from "@/types";

export type EmailContactParms = {
  name: string
  email: string
  subject: string
  message: string
}

const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendEmailToSupport: builder.mutation<WithStatus<void>, EmailContactParms>({
      query: (params) => ({
        url: "/contact",
        method: "POST",
        body: params,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSendEmailToSupportMutation } = supportApi;
export default supportApi;
