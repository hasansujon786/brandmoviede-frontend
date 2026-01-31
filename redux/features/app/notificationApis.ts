import { baseApi } from "@/redux/api/baseApi";
import { WithStatus } from "@/types";
import { IAppNotificationItem } from "@/types/app/notification";

const notificationApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAppNotifications: builder.query<IAppNotificationItem[], void>({
      query: () => ({
        url: "/notification",
        method: "GET",
      }),
      transformResponse: (response: WithStatus<IAppNotificationItem[]>) =>
        response.data,
      providesTags: ["AppNotification"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAppNotificationsQuery } = notificationApis;
export default notificationApis;
