import { useState, useMemo } from "react";
import {
  DatePicker,
  Input,
  Button,
  message,
  Card,
  Typography,
  Space,
  Divider,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { urlBase64ToUint8Array } from "../utils/notification";
import {
  BellOutlined,
  MessageOutlined,
  SendOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  subscribeNotification,
  scheduleNotification,
} from "../features/notifications/notification.api";

const { Text } = Typography;

export default function ScheduleNotification() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);
  
  const convertedKey = useMemo(() => {
    const vapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
    return urlBase64ToUint8Array(vapidKey);
  }, []);

  const subscribeToPush = async () => {
    if (!("serviceWorker" in navigator)) {
      message.error("Service workers are not supported in this browser");
      return;
    }
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedKey,
      });
      await subscribeNotification({
        data: JSON.stringify(subscription),
      });
      message.success("Push notifications enabled");
    } catch (err) {
      console.log(err);
      message.error("Failed to enable notifications");
    }
  };

  const handleScheduleNotification = async () => {
    if (!date) {
      message.error("Please select date and time");
      return;
    }
    try {
      await scheduleNotification({
        title,
        body,
        sendAt: date.toISOString(),
      });
      message.success("Notification scheduled");
    } catch (err) {
      console.log(err);
      message.error("Failed to schedule notification");
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center px-4">
      <Card className="w-full max-w-md shadow-lg rounded-xl border-none">
        <div className="flex flex-col gap-6">
          <section className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <Space direction="vertical" className="w-full">
              <div className="flex items-center gap-2 mb-1">
                <SettingOutlined className="text-slate-400" />
                <Text strong>Permission</Text>
              </div>
              <Button block icon={<BellOutlined />} onClick={subscribeToPush}>
                Enable Browser Notifications
              </Button>
            </Space>
          </section>

          <Divider className="my-1">Notification Details</Divider>

          <div className="space-y-4">
            <Input
              size="large"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              prefix={<MessageOutlined />}
            />

            <Input.TextArea
              rows={4}
              placeholder="Message"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />

            <DatePicker
              showTime
              className="w-full"
              value={date}
              onChange={setDate}
              disabledDate={(current) =>
                current && current.isBefore(dayjs().startOf("day"))
              }
            />
          </div>

          <Button
            type="primary"
            size="large"
            block
            icon={<SendOutlined />}
            onClick={handleScheduleNotification}
          >
            Schedule Campaign
          </Button>
        </div>
      </Card>
    </div>
  );
}
