import { ObjectID } from 'mongodb';
import ICreateMotificationDTO from '@modules/notifications/dtos/ICreateMotificationDTO';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

class FakeNotificationsRepository implements INotificationRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateMotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, {
      id: new ObjectID(),
      content,
      recipient_id,
    });

    await this.notifications.push(notification);

    return notification;
  }
}

export default FakeNotificationsRepository;
