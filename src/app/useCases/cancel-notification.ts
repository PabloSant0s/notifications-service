import { NotificationsRepositories } from '@app/repositories/notifications-repositories';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from './errors/notfication-not-found';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(
    private readonly notificationRepositories: NotificationsRepositories,
  ) {}

  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = request;
    const notification = await this.notificationRepositories.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();

    await this.notificationRepositories.save(notification);
  }
}
