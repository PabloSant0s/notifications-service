import { NotificationsRepositories } from '@app/repositories/notifications-repositories';
import { Injectable } from '@nestjs/common';

interface CountRecipientNotificationResquest {
  recipientId: string;
}
interface CountRecipientNotificationResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotification {
  constructor(private notificationRepository: NotificationsRepositories) {}

  async execute(
    request: CountRecipientNotificationResquest,
  ): Promise<CountRecipientNotificationResponse> {
    const { recipientId } = request;
    const count = await this.notificationRepository.countManyByRecipientId(
      recipientId,
    );
    return { count };
  }
}
