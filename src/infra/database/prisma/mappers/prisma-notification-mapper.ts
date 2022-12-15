import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { Notification as RawNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      createdAt: notification.createdAt,
    };
  }

  static toDomain(raw: RawNotification) {
    return new Notification(
      {
        category: raw.category,
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        createdAt: raw.createdAt,
        canceledAt: raw.cancelAt,
        readAt: raw.readAt,
      },
      raw.id,
    );
  }
}
