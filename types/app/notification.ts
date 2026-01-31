export interface IAppNotificationItem {
  id: string;
  sender_id: string | null;
  receiver_id: string;
  entity_id: string | null;
  created_at: string;

  sender: null | {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
  };

  receiver: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
  };

  notification_event: {
    id: string;
    type: string;
    text: string;
  };
}
