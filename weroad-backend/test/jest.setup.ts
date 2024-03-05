import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { setupGlobals } from '../src/main';
import { SeederService } from '../src/seeder/seeder.service';

export let appTest: INestApplication;
export let moduleFixture: TestingModule;

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
});

afterAll(async () => {
  await appTest.close();
  await moduleFixture.close();
});
