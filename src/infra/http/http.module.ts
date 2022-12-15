import { CancelNotification } from '@app/useCases/cancel-notification';
import { CountRecipientNotification } from '@app/useCases/count-recient-notification';
import { GetRecipientNotification } from '@app/useCases/get-recipient-notification';
import { ReadNotification } from '@app/useCases/read-notification';
import { UnReadNotification } from '@app/useCases/unread-notification';
import { Module } from '@nestjs/common';
import { SendNotification } from 'src/app/useCases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { NotificatiosController } from './controller/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificatiosController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotification,
    ReadNotification,
    UnReadNotification,
    GetRecipientNotification,
  ],
})
export class HttpModule {}
