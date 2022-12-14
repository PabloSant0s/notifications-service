import { NotificationsRepositories } from 'src/app/repositories/notifications-repositories';
import { PrismaNotificationsRepositories } from './prisma/repositories/prisma-notifications-repositories';
import { PrismaService } from './prisma/prisma.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: NotificationsRepositories,
      useClass: PrismaNotificationsRepositories,
    },
  ],
  exports: [NotificationsRepositories],
})
export class DatabaseModule {}
