import { baseApi } from "@/redux/api/baseApi";
import { IAdminNotificationItem, WithStatus } from "@/types/";

const notificationApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminNotifications: builder.query<IAdminNotificationItem[], void>({
      query: () => ({
        url: "/admin/notification",
        method: "GET",
      }),
      transformResponse: (response: WithStatus<IAdminNotificationItem[]>) =>
        response.data,
      providesTags: ["Notifications"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAdminNotificationsQuery } = notificationApis;

export default notificationApis;
