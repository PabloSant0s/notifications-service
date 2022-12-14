import { Notification } from '../../src/app/entities/notification';
import { NotificationsRepositories } from '../../src/app/repositories/notifications-repositories';

export class InMemoryNotificationsRepository
  implements NotificationsRepositories
{
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
