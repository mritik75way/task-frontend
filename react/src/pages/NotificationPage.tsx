import { useState } from "react";
import { DatePicker, Input, Button, message, Card, Typography, Space, Divider } from "antd";
import dayjs, { Dayjs } from "dayjs";
import api from "../services/axios";
import { urlBase64ToUint8Array } from "../utils/notification";
import { BellOutlined, MessageOutlined, SendOutlined, SettingOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function ScheduleNotification() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);

  const subscribeToPush = async () => {
    if (!("serviceWorker" in navigator)) {
      message.error("Service workers are not supported in this browser");
      return;
    }

    const vapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
    const convertedKey = urlBase64ToUint8Array(vapidKey);

    const registration = await navigator.serviceWorker.ready;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedKey,
    });

    await api.post("/notifications/subscribe", {
      data: JSON.stringify(subscription),
    });

    message.success("Push notifications enabled");
  };

  const scheduleNotification = async () => {
    if (!date) {
      message.error("Please select date and time");
      return;
    }

    await api.post("/notifications/schedule", {
      data: JSON.stringify({
        title,
        body,
        sendAt: date.toISOString(),
      }),
    });

    message.success("Notification scheduled");
  };

  return (
    <div className=" bg-gray-50 flex flex-col items-center  px-4">
      <Card 
        className="w-full max-w-md shadow-lg rounded-xl border-none"
      >
        <div className="flex flex-col gap-6">

          <section className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <Space direction="vertical" className="w-full">
              <div className="flex items-center gap-2 mb-1">
                <SettingOutlined className="text-slate-400" />
                <Text strong>Permission</Text>
              </div>
              <Button 
                block 
                icon={<BellOutlined />}
                onClick={subscribeToPush}
                className="hover:border-blue-500 transition-colors"
              >
                Enable Browser Notifications
              </Button>
            </Space>
          </section>

          <Divider className="my-1">Notification Details</Divider>

          <div className="space-y-4">
            <div className="space-y-1">
              <Text  className="text-slate-500 ml-1">Title</Text>
              <Input
                size="large"
                placeholder="Ex: Flash Sale! ⚡"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                prefix={<MessageOutlined className="text-slate-300" />}
              />
            </div>

            <div className="space-y-1">
              <Text  className="text-slate-500 ml-1">Message Body</Text>
              <Input.TextArea
                size="large"
                placeholder="Tell your users what's happening..."
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <Text className="text-slate-500 ml-1">Delivery Time</Text>
              <DatePicker
                showTime
                size="large"
                className="w-full"
                value={date}
                onChange={(value) => setDate(value)}
                disabledDate={(current) =>
                  current && current.isBefore(dayjs().startOf("day"))
                }
              />
            </div>
          </div>

          <Button 
            type="primary" 
            size="large" 
            block 
            icon={<SendOutlined />}
            onClick={scheduleNotification}
            className="h-12 text-md font-semibold bg-blue-600 shadow-md shadow-blue-200"
          >
            Schedule Campaign
          </Button>
        </div>
      </Card>
    </div>
  );
}
