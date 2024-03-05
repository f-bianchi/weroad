import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { setupGlobals } from '../src/main';
import { AuthService } from '../src/auth/auth.service';
import { RoleName } from '../src/roles/entities/role.entity';

describe('Auth', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupGlobals(app);

    authService = moduleFixture.get<AuthService>(AuthService);

    await app.init();
  });

  it('/login (POST) 400 no body', () => {
    return request(app.getHttpServer()).post('/auth/login').expect(400);
  });

  it('/login (POST) 400 not valid email', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'foo', password: 'bar' })
      .expect(400)
      .expect({ message: ['email must be an email'], statusCode: 400, error: 'Bad Request' });
  });

  it('/login (POST) 401 user not found', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'foo@example.com', password: 'bar' })
      .expect(401)
      .expect({ message: 'Bad Credentials', statusCode: 401 });
  });

  it('/login (POST) 401 password not correct', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@example.com', password: 'bar' })
      .expect(401)
      .expect({ message: 'Bad Credentials', statusCode: 401 });
  });

  it('/login (POST) 200 return access token', (done) => {
    request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@example.com', password: 'password' })
      .expect(200)
      .end((err, response) => {
        expect(typeof response.body.access_token).toBe('string');
        done();
      });
  });

  it('/me (GET) 401 without token', () => {
    return request(app.getHttpServer()).get('/auth/me').expect(401);
  });

  it('/me (GET) 200 return me', async () => {
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
    const response = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toEqual(expect.objectContaining(user));
  });
});
