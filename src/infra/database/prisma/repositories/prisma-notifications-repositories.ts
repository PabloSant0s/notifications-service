import { Injectable } from '@nestjs/common/decorators';
import { Notification } from 'src/app/entities/notification';
import { NotificationsRepositories } from 'src/app/repositories/notifications-repositories';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepositories
  implements NotificationsRepositories
{
  constructor(private readonly prismaService: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: { id: notificationId },
    });
    if (!notification) {
      return null;
    }
    return PrismaNotificationMapper.toDomain(notification);
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: { recipientId: recipientId },
    });
    return notifications.map((notification) =>
      PrismaNotificationMapper.toDomain(notification),
    );
  }
  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: { recipientId: recipientId },
    });

    return count;
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prismaService.notification.create({
      data: raw,
    });
  }
  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prismaService.notification.update({
      where: { id: notification.id },
      data: raw,
    });
  }
}
