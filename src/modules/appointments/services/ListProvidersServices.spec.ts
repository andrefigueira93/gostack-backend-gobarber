import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@email.com',
      password: '123123',
    });
    const user2 = await fakeUsersRepository.create({
      name: 'Beltrano',
      email: 'Beltrano@email.com',
      password: '123123',
    });
    const loggedUser = await fakeUsersRepository.create({
      name: 'Siclano',
      email: 'siclano@email.com',
      password: '123123',
    });

    const providers = await listProviders.execute({ user_id: loggedUser.id });

    expect(providers).toEqual([user1, user2]);
  });
  // it('should not be able to show the profile from non existing user', async () => {});
});
