import { Notification } from '../entities/notification';

export abstract class NotificationsRepositories {
  abstract create(notification: Notification): Promise<void>;
  abstract findById(notificationId: string): Promise<Notification | null>;
  abstract save(notification: Notification): Promise<void>;
  abstract findManyByRecipientId(recipientId: string): Promise<Notification[]>;
  abstract countManyByRecipientId(recipientId: string): Promise<number>;
}
