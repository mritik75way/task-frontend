import api from "../../services/api";
import type {
  PushSubscriptionPayload,
  ScheduleNotificationPayload,
  NotificationResponse,
} from "./notification.types";

export async function subscribeNotification(
  payload: PushSubscriptionPayload
) {
  return await api.post<NotificationResponse>("/notifications/subscribe", payload);
}

export async function scheduleNotification(
  payload: ScheduleNotificationPayload
) {
  return await api.post<NotificationResponse>("/notifications/schedule", {
    data: JSON.stringify(payload),
  });
}