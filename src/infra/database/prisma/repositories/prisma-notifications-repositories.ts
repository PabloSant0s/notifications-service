import { Injectable } from '@nestjs/common/decorators';
import { Notification } from 'src/app/entities/notification';
import { NotificationsRepositories } from 'src/app/repositories/notifications-repositories';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepositories
  implements NotificationsRepositories
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id: notification.id,
        content: notification.content.value,
        category: notification.category,
        recipientId: notification.recipientId,
        createdAt: notification.createdAt,
      },
    });
  }
}
