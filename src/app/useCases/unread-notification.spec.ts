import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notfication-not-found';
import { UnReadNotification } from './unread-notification';

describe('Unread Notification', () => {
  it('should be able unread a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnReadNotification(notificationRepository);

    const notification = makeNotification({ readAt: new Date() });

    await notificationRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toEqual(null);
  });

  it('should not be able to cancel a notification when it does not exist', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnReadNotification(notificationRepository);

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'b42dcb2c-b225-46c8-934e-4a1c664fb2d7',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
