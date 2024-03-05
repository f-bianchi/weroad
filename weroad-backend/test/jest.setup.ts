import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { setupGlobals } from '../src/main';
import { SeederService } from '../src/seeder/seeder.service';
import { AuthService } from '../src/auth/auth.service';
import { RoleName } from '../src/roles/entities/role.entity';

export let appTest: INestApplication;
export let moduleFixture: TestingModule;
export let tokenAdmin: string;
export let tokenEditor: string;

beforeAll(async () => {
  moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  appTest = moduleFixture.createNestApplication();
  setupGlobals(appTest);

  await appTest.init();

  const seeder: SeederService = moduleFixture.get<SeederService>(SeederService);
  await seeder.dropAllTables();
  await seeder.initData();

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
    id: 'f12462bb-0588-425d-b23e-d36e5792c822',
    roles: [
      {
        id: '9442703c-dd4f-4e36-9554-a60574c408be',
        name: RoleName.Editor,
      },
    ],
  });
});

afterAll(async () => {
  await appTest.close();
  await moduleFixture.close();
});
