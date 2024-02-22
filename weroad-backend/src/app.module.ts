import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SeederService } from './seeder/seeder.service';
import { SeederModule } from './seeder/seeder.module';
import { JwtModule } from '@nestjs/jwt';
import { RolesModule } from './roles/roles.module';
import { TravelsModule } from './travels/travels.module';
import { ToursModule } from './tours/tours.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        LOG_LEVEL: Joi.string()
          .valid('log', 'error', 'warn', 'debug', 'verbose', 'fatal')
          .default('error'),
        PORT: Joi.number().required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USERNAME: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DATABASE: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        ENABLE_IMPORT_MOCK_DATA: Joi.boolean(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
    UsersModule,
    SeederModule,
    RolesModule,
    TravelsModule,
    ToursModule,
  ],
  controllers: [],
  providers: [SeederService],
})
export class AppModule {}
