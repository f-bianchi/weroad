import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import { Role, RoleName } from '../src/roles/entities/role.entity';
import { UsersService } from '../src/users/users.service';
import { appTest, moduleFixture, tokenAdmin, tokenEditor } from './jest.setup';

const EDITOR_ID = 'f12462bb-0588-425d-b23e-d36e5792c822';

describe('Users API', () => {
  let usersService: UsersService;

  beforeAll(async () => {
    usersService = moduleFixture.get<UsersService>(UsersService);
  });

  it('should return 403 for editor on list users', () => {
    return request(appTest.getHttpServer())
      .post('/admin/users')
      .set('Authorization', `Bearer ${tokenEditor}`)
      .expect(403);
  });

  it('should return 200 on list users', async () => {
    const { body } = await request(appTest.getHttpServer())
      .get('/admin/users')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .expect(200);
    expect(Array.isArray(body)).toBe(true);
  });

  it('should return 400 for incorrect role on create user', () => {
    return request(appTest.getHttpServer())
      .post('/admin/users')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ email: 'foo@bar.com', password: 'foo', roles: ['bar'] })
      .expect(400);
  });

  it('should return 400 for duplicate email on create user', async () => {
    const { body } = await request(appTest.getHttpServer())
      .post('/admin/users')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ email: 'admin@example.com', password: 'foo', roles: ['admin'] })
      .expect(400);
    expect(body.message).toEqual('Key (email)=(admin@example.com) already exists.');
  });

  it('should create user with password', async () => {
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

  it('should return 200 on get user', async () => {
    const { body } = await request(appTest.getHttpServer())
      .get(`/admin/users/${EDITOR_ID}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .expect(200);

    expect(body.email).toEqual('editor@example.com');
    expect(body.roles[0].name).toEqual(RoleName.Editor);
  });

  it('should update user (with password update)', async () => {
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

  it('should delete user', async () => {
    await request(appTest.getHttpServer())
      .delete(`/admin/users/${EDITOR_ID}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .expect(204);

    const user = await usersService.findOneById(EDITOR_ID);
    expect(user).toBe(null);
  });
});
