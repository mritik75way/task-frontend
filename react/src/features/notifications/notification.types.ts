export interface PushSubscriptionPayload {
  data: string;
}

export interface ScheduleNotificationPayload {
  title: string;
  body: string;
  sendAt: string;
}

export interface NotificationResponse {
  message: string;
}
