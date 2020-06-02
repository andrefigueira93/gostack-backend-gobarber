import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('Create user', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Fulano',
      email: 'email@user.com',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create new users with the same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Fulano',
      email: 'email@user.com',
      password: '123123',
    });

    expect(
      createUser.execute({
        name: 'Fulano',
        email: 'email@user.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
