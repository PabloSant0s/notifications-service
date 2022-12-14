import { Module } from '@nestjs/common';
import { SendNotification } from 'src/app/useCases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { NotificatiosController } from './controller/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificatiosController],
  providers: [SendNotification],
})
export class HttpModule {}
