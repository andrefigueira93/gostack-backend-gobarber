// import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'email@user.com',
      password: '123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Admin Updated',
      email: 'admin@user.com',
    });

    expect(updatedUser.name).toBe('Admin Updated');
    expect(updatedUser.email).toBe('admin@user.com');
  });

  it('should not be able to change the email to one which already belongs to another user', async () => {
    await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'email@user.com',
      password: '123123',
    });

    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'admin@user.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Admin Updated',
        email: 'email@user.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the profile from a non existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user',
        name: 'Admin Updated',
        email: 'email@user.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'email@user.com',
      password: '123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Admin Updated',
      email: 'admin@user.com',
      old_password: '123123',
      password: '123456',
    });

    expect(updatedUser.name).toBe('Admin Updated');
    expect(updatedUser.email).toBe('admin@user.com');
  });

  it('should not be able to update the password without the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'email@user.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Admin Updated',
        email: 'admin@user.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'email@user.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Admin Updated',
        email: 'admin@user.com',
        old_password: '123456',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
