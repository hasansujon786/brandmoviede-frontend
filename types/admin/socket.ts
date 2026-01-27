export interface ISocketEmmitData {
  sender_id: null;
  receiver_id: string;
  text: string;
  type: string;
}

// admin/notification
export interface IAdminNotificationItem {
  id: string;
  sender_id?: string;
  receiver_id: string;
  entity_id?: string;
  created_at: string;
  sender?: string;
  receiver: Receiver;
  notification_event: NotificationEvent;
}

export interface Receiver {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface NotificationEvent {
  id: string;
  type: string;
  text: string;
}
