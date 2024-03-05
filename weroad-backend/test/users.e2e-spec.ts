import * as request from 'supertest';
import { AuthService } from '../src/auth/auth.service';
import { Role, RoleName } from '../src/roles/entities/role.entity';
import { moduleFixture, appTest } from './jest.setup';
import { UsersService } from '../src/users/users.service';
import * as bcrypt from 'bcrypt';

const EDITOR_ID = 'f12462bb-0588-425d-b23e-d36e5792c822';

describe('Users', () => {
  let tokenAdmin: string;
  let tokenEditor: string;
  let usersService: UsersService;

  beforeAll(async () => {
    usersService = moduleFixture.get<UsersService>(UsersService);

    const authService: AuthService = moduleFixture.get<AuthService>(AuthService);
    tokenAdmin = await authService.getAccessToken({
      email: 'admin@example.com',
      id: 'b1fb0518-efce-4684-8477-a59dc09d336a',
      roles: [
        {
          id: 'baf18948-721e-49f5-aa7f-bed1a5415cb6',
          name: RoleName.Admin,
        },
      ],
    });
    tokenEditor = await authService.getAccessToken({
      email: 'editor@example.com',
      id: EDITOR_ID,
      roles: [
        {
          id: '9442703c-dd4f-4e36-9554-a60574c408be',
          name: RoleName.Editor,
        },
      ],
    });
  });

  it('/users (GET) 403 for editor', () => {
    return request(appTest.getHttpServer())
      .post('/admin/users')
      .set('Authorization', `Bearer ${tokenEditor}`)
      .expect(403);
  });

  it('/users (GET) 200', async () => {
    const { body } = await request(appTest.getHttpServer())
      .get('/admin/users')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .expect(200);
    expect(Array.isArray(body)).toBe(true);
  });

  it('/users (POST) 400 role not correct', () => {
    return request(appTest.getHttpServer())
      .post('/admin/users')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ email: 'foo@bar.com', password: 'foo', roles: ['bar'] })
      .expect(400);
  });

  it('/users (POST) 400 email unique', async () => {
    const { body } = await request(appTest.getHttpServer())
      .post('/admin/users')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ email: 'admin@example.com', password: 'foo', roles: ['admin'] })
      .expect(400);
    expect(body.message).toEqual('Key (email)=(admin@example.com) already exists.');
  });

  it('/users (POST) 201 user created with password', async () => {
    const email = 'another-admin@example.com';
    const password = 'foo';

    await request(appTest.getHttpServer())
      .post('/admin/users')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ email, password, roles: [RoleName.Admin] })
      .expect(201);

    const user = await usersService.findOneByEmail(email);

    expect(user.roles[0].name).toEqual(RoleName.Admin);
    expect(user.email).toEqual(email);

    const isMatch = await bcrypt.compare(password, user.password);
    expect(isMatch).toBe(true);
  });

  it('/users (GET) 200 get user', async () => {
    const { body } = await request(appTest.getHttpServer())
      .get(`/admin/users/${EDITOR_ID}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .expect(200);

    expect(body.email).toEqual('editor@example.com');
    expect(body.roles[0].name).toEqual(RoleName.Editor);
  });

  it('/users (PUT) update user (with update password)', async () => {
    const email = 'another-email@example.com';
    const password = 'another-foo';

    const { body } = await request(appTest.getHttpServer())
      .put(`/admin/users/${EDITOR_ID}`)
      .send({ email, password, roles: [RoleName.Admin, RoleName.Editor] })
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .expect(200);

    expect(body.email).toEqual(email);
    expect(body.roles.map((r: Role) => r.name)).toEqual([RoleName.Admin, RoleName.Editor]);

    const user = await usersService.findOneByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);
    expect(isMatch).toBe(true);
  });

  it('/users (DELETE)', async () => {
    await request(appTest.getHttpServer())
      .delete(`/admin/users/${EDITOR_ID}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .expect(204);

    const user = await usersService.findOne(EDITOR_ID);
    expect(user).toBe(null);
  });
});
