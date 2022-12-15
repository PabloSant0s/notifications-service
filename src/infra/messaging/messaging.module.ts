import { KafkaConsumerService } from './kafka/kafka-consumer.service';
import { Module } from '@nestjs/common';
import { NotificationsController } from './kafka/controllers/notifications.controller';
import { DatabaseModule } from '@infra/database/database.module';
import { SendNotification } from '@app/useCases/send-notification';

@Module({
  imports: [DatabaseModule],
  providers: [KafkaConsumerService, SendNotification],
  controllers: [NotificationsController],
})
export class MessagingModule {}
