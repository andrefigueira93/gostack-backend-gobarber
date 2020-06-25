import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;

describe('Create user', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
  });
  it('should be able to create a new user', async () => {
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );

    const user = await createUser.execute({
      name: 'Fulano',
      email: 'email@user.com',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create new users with the same email', async () => {
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );

    await createUser.execute({
      name: 'Fulano',
      email: 'email@user.com',
      password: '123123',
    });

    await expect(
      createUser.execute({
        name: 'Fulano',
        email: 'email@user.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
