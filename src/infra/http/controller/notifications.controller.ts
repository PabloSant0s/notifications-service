import { CountRecipientNotification } from './../../../app/useCases/count-recient-notification';
import { CancelNotification } from '@app/useCases/cancel-notification';
import { ReadNotification } from '@app/useCases/read-notification';
import { UnReadNotification } from '@app/useCases/unread-notification';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from 'src/app/useCases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification.body';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { GetRecipientNotification } from '@app/useCases/get-recipient-notification';

@Controller('notifications')
export class NotificatiosController {
  constructor(
    private readonly sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnReadNotification,
    private countRecipientNotification: CountRecipientNotification,
    private getRecipientNotification: GetRecipientNotification,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string): Promise<void> {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotification.execute({
      recipientId,
    });

    return { count };
  }
  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotification.execute({
      recipientId,
    });

    return { notifications: notifications.map(NotificationViewModel.toHTTP) };
  }
  @Patch(':id/read')
  async read(@Param('id') id: string): Promise<void> {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string): Promise<void> {
    await this.unreadNotification.execute({ notificationId: id });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });

    return { notification: NotificationViewModel.toHTTP(notification) };
  }
}
