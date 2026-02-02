import { useEffect, useMemo, useState } from "react";
import { message } from "antd";
import { urlBase64ToUint8Array } from "../utils/notification";
import {
  subscribeNotification,
} from "../features/notifications/notification.api";

export function usePushNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>(
    Notification.permission,
  );
  const [isSubscribing, setIsSubscribing] = useState(false);

  const convertedKey = useMemo(() => {
    const vapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
    if (!vapidKey) {
      throw new Error("VAPID public key is missing");
    }
    return urlBase64ToUint8Array(vapidKey);
  }, []);

  useEffect(() => {
    setPermission(Notification.permission);
  }, []);

  const subscribe = async () => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      message.error("Push notifications are not supported in this browser");
      return;
    }

    if (permission === "granted") {
      message.info("Notifications already enabled");
      return;
    }

    if (permission === "denied") {
      message.error(
        "Notifications are blocked. Enable them from browser settings.",
      );
      return;
    }

    try {
      setIsSubscribing(true);

      const registration = await navigator.serviceWorker.ready;
      const existingSubscription =
        await registration.pushManager.getSubscription();

      if (existingSubscription) {
        setPermission("granted");
        message.success("Push notifications already active");
        return;
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedKey,
      });

      await subscribeNotification({
        data: JSON.stringify(subscription),
      });

      setPermission("granted");
      message.success("Push notifications enabled");
    } catch (err) {
      console.error(err);
      message.error("Failed to enable notifications");
    } finally {
      setIsSubscribing(false);
    }
  };
  const unsubscribe = async () => {
  if (!("serviceWorker" in navigator)) return;

  try {
    setIsSubscribing(true);

    const registration = await navigator.serviceWorker.ready;
    const subscription =
      await registration.pushManager.getSubscription();

    if (!subscription) {
      setPermission("default");
      message.info("No active subscription found");
      return;
    }

    await subscription.unsubscribe();

    setPermission("default");
    message.success("Push notifications disabled");
  } catch (err) {
    console.error(err);
    message.error("Failed to disable notifications");
  } finally {
    setIsSubscribing(false);
  }
};


  return {
    permission,
    isSubscribing,
    subscribe,
    unsubscribe,
    isGranted: permission === "granted",
    isDenied: permission === "denied",
  };
}
