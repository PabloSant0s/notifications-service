import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from 'src/app/useCases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification.body';

@Controller('notifications')
export class NotificatiosController {
  constructor(private readonly sendNotification: SendNotification) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });

    return { notification };
  }
}
