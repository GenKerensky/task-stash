import { useNavigate } from '@solidjs/router';
import { RxDocument } from 'rxdb';

import { db$ } from '../data';
import { NotificationDocType } from '../data/rxSchemas/notifications';

const handleNotificationClick =
  (document: RxDocument<NotificationDocType>) => () => {
    const { data } = document;
    if (
      Object.prototype.hasOwnProperty.call(data, 'url') &&
      typeof data.url === 'string'
    ) {
      const navigate = useNavigate();
      navigate(data.url);
    }
    document.remove();
  };

const notificationFromNotificationDoc = (
  doc: RxDocument<NotificationDocType>
) => {
  const { title, body, icon, data, timestamp } = doc;
  const notificationInstance = new Notification(title, {
    body,
    icon,
    data,
    timestamp,
  });
  notificationInstance.onclick = handleNotificationClick(doc);
  return notificationInstance;
};

const processNotifications = () =>
  db$.subscribe((dbstatus) => {
    const dbContext = dbstatus.db;
    if (dbContext) {
      return dbContext.notifications
        .find()
        .sort({
          updatedAt: 'asc',
        })
        .$.subscribe((notifications) => {
          notifications.forEach((notification) => {
            if (notification.timestamp > Date.now()) {
              const { timestamp } = notification;
              const delay = timestamp - Date.now();
              setTimeout(() => {
                notificationFromNotificationDoc(notification);
              }, delay);
            } else {
              notificationFromNotificationDoc(notification);
            }
          });
        });
    }
  });

export const initializeNotifications = async (): Promise<void> => {
  while (Notification.permission === 'default') {
    // eslint-disable-next-line no-await-in-loop
    await Notification.requestPermission();
  }
  if (Notification.permission === 'granted') {
    processNotifications();
  }
  // else if (Notification.permission === 'denied') {
  // }
};
