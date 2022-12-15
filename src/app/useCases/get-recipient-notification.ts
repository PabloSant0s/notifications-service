import { Injectable } from '@nestjs/common';
import { Notification } from '@app/entities/notification';
import { NotificationsRepositories } from '@app/repositories/notifications-repositories';

interface GetRecipientNotificationResquest {
  recipientId: string;
}
interface GetRecipientNotificationResponse {
  notifications: Notification[];
}
@Injectable()
export class GetRecipientNotification {
  constructor(private notificationRepository: NotificationsRepositories) {}

  async execute(
    request: GetRecipientNotificationResquest,
  ): Promise<GetRecipientNotificationResponse> {
    const { recipientId } = request;
    const notifications =
      await this.notificationRepository.findManyByRecipientId(recipientId);

    return { notifications };
  }
}
