import { NotificationsRepositories } from '@app/repositories/notifications-repositories';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from './errors/notfication-not-found';

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(
    private readonly notificationRepositories: NotificationsRepositories,
  ) {}

  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notificationId } = request;
    const notification = await this.notificationRepositories.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();

    await this.notificationRepositories.save(notification);
  }
}
