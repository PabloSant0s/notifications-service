import { NotificationsRepositories } from '@app/repositories/notifications-repositories';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from './errors/notfication-not-found';

interface UnReadNotificationRequest {
  notificationId: string;
}

type UnReadNotificationResponse = void;

@Injectable()
export class UnReadNotification {
  constructor(
    private readonly notificationRepositories: NotificationsRepositories,
  ) {}

  async execute(
    request: UnReadNotificationRequest,
  ): Promise<UnReadNotificationResponse> {
    const { notificationId } = request;
    const notification = await this.notificationRepositories.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();

    await this.notificationRepositories.save(notification);
  }
}
