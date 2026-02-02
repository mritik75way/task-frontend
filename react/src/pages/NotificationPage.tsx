import { useState } from "react";
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
import {
  BellOutlined,
  SendOutlined,
  SettingOutlined,
  BellFilled,
} from "@ant-design/icons";
import { scheduleNotification } from "../features/notifications/notification.api";
import { usePushNotifications } from "../hooks/usePushNotifications";

const { Text } = Typography;

export default function ScheduleNotification() {
  const { isSubscribing, subscribe, isGranted, isDenied, unsubscribe } =
    usePushNotifications();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);

  const [isScheduling, setIsScheduling] = useState(false);

  const handleScheduleNotification = async () => {
    if (!title.trim()) {
      message.error("Title is required");
      return;
    }

    if (!body.trim()) {
      message.error("Message is required");
      return;
    }

    if (!date) {
      message.error("Please select date and time");
      return;
    }

    if (date.isBefore(dayjs())) {
      message.error("Notification time must be in the future");
      return;
    }

    try {
      setIsScheduling(true);

      await scheduleNotification({
        title: title.trim(),
        body: body.trim(),
        sendAt: date.toISOString(),
      });

      message.success("Notification scheduled");

      setTitle("");
      setBody("");
      setDate(null);
    } catch (err) {
      console.error(err);
      message.error("Failed to schedule notification");
    } finally {
      setIsScheduling(false);
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col h-full items-center px-4">
      <Card className="w-full max-w-md shadow-lg rounded-xl border-none ">
        <div className="flex flex-col gap-6">
          <section className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <Space direction="vertical" className="w-full">
              <div className="flex items-center gap-2 mb-1">
                <SettingOutlined className="text-slate-400" />
                <Text strong>Permission</Text>
              </div>
              <Button
                block
                loading={isSubscribing}
                icon={isGranted ? <BellFilled /> : <BellOutlined />}
                onClick={isGranted ? unsubscribe : subscribe}
              >
                {isGranted
                  ? "Disable Notifications"
                  : "Enable Browser Notifications"}
              </Button>

              {isDenied && (
                <Text type="danger" className="text-xs">
                  Notifications are blocked in browser settings
                </Text>
              )}
            </Space>
          </section>

          <Divider className="my-1">Notification Details</Divider>

          <div className="flex flex-col gap-4">
            <Input
              size="large"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <Input.TextArea
              rows={10}
              placeholder="Message"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />

            <DatePicker
              showTime
              className="w-full"
              value={date}
              required
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
            loading={isScheduling}
            disabled={!isGranted}
          >
            Schedule Campaign
          </Button>
        </div>
      </Card>
    </div>
  );
}