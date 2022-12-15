import { Notification } from '@app/entities/notification';
import { NotificationsRepositories } from '@app/repositories/notifications-repositories';

export class InMemoryNotificationsRepository
  implements NotificationsRepositories
{
  public notifications: Notification[] = [];

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (notification) => notification.id === notificationId,
    );

    if (!notification) {
      return null;
    }

    return notification;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter((item) => item.recipientId == recipientId);
  }
  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter((item) => item.recipientId == recipientId)
      .length;
  }

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.indexOf(notification);

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }
}
