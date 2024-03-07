import * as request from 'supertest';
import { AuthService } from '../src/auth/auth.service';
import { RoleName } from '../src/roles/entities/role.entity';
import { moduleFixture } from './jest.setup';
import { appTest } from './jest.setup';

describe('Auth API', () => {
  let authService: AuthService;

  beforeAll(async () => {
    authService = moduleFixture.get<AuthService>(AuthService);
  });

  it('should return 400 for missing body on login', () => {
    return request(appTest.getHttpServer()).post('/auth/login').expect(400);
  });

  it('should return 400 for not valid email on login', () => {
    return request(appTest.getHttpServer())
      .post('/auth/login')
      .send({ email: 'foo', password: 'bar' })
      .expect(400)
      .expect({ message: ['email must be an email'], statusCode: 400, error: 'Bad Request' });
  });

  it('should return 401 for user not found on login', () => {
    return request(appTest.getHttpServer())
      .post('/auth/login')
      .send({ email: 'foo@example.com', password: 'bar' })
      .expect(401)
      .expect({ message: 'Bad Credentials', statusCode: 401 });
  });

  it('should return 401 for incorrect password on login', () => {
    return request(appTest.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@example.com', password: 'bar' })
      .expect(401)
      .expect({ message: 'Bad Credentials', statusCode: 401 });
  });

  it('should return 200 with access token on successful login', (done) => {
    request(appTest.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@example.com', password: 'password' })
      .expect(200)
      .end((err, response) => {
        expect(typeof response.body.access_token).toBe('string');
        done();
      });
  });

  it('should return 401 without token on /me', () => {
    return request(appTest.getHttpServer()).get('/auth/me').expect(401);
  });

  it('should return 200 and user details on /me with token', async () => {
    const user = {
      email: 'admin@example.com',
      id: 'b1fb0518-efce-4684-8477-a59dc09d336a',
      roles: [
        {
          id: 'baf18948-721e-49f5-aa7f-bed1a5415cb6',
          name: RoleName.Admin,
        },
      ],
    };
    const token = await authService.getAccessToken(user);
    const response = await request(appTest.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body).toEqual(expect.objectContaining(user));
  });
});
