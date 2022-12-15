import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notfication-not-found';
import { ReadNotification } from './read-notification';

describe('Read Notification', () => {
  it('should be able read a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationRepository);

    const notification = makeNotification();

    await notificationRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a notification when it does not exist', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationRepository);

    expect(() => {
      return readNotification.execute({
        notificationId: 'b42dcb2c-b225-46c8-934e-4a1c664fb2d7',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
