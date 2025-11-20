import * as request from 'supertest';

import {
  completeUser,
  missingFirstName,
  missingEmail,
  missingPassword,
} from './users.post.e2e-spec.sample-data';

import { App } from 'supertest/types';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { bootstrapNestApplication } from 'test/helpers/bootstrap-nest-application.helper';
import { dropDatabase } from 'test/helpers/drop-database.helper';

// Helper to generate a fresh user for each test
const makeUser = () => ({
  ...completeUser,
  email: `user${Date.now()}@example.com`, // unique email
});

describe('[Users] @Post Endpoints', () => {
  let app: INestApplication;
  let config: ConfigService;
  let httpServer: App;

  beforeEach(async () => {
    app = await bootstrapNestApplication();
    config = app.get<ConfigService>(ConfigService);
    httpServer = app.getHttpServer();
  });

  afterEach(async () => {
    await dropDatabase(config);
    await app.close();
  });

  // Invalid payload tests
  it('/users - Endpoint is public', () => {
    return request(httpServer).post('/users').send({}).expect(400);
  });

  it('/users - firstName is mandatory', () => {
    return request(httpServer)
      .post('/users')
      .send(missingFirstName)
      .expect(400);
  });

  it('/users - email is mandatory', () => {
    return request(httpServer).post('/users').send(missingEmail).expect(400);
  });

  it('/users - password is mandatory', () => {
    return request(httpServer).post('/users').send(missingPassword).expect(400);
  });

  // Valid payload test
  it('/users - Valid request successfully creates user and hides sensitive fields', async () => {
    const user = makeUser();

    const { body } = await request(httpServer)
      .post('/users')
      .send(user)
      .expect(201);

    const createdUser = body.data;

    // Ensure user is returned
    expect(createdUser).toBeDefined();
    expect(createdUser.firstName).toBe(user.firstName);
    expect(createdUser.lastName).toBe(user.lastName);
    expect(createdUser.email).toBe(user.email);

    // Ensure sensitive fields are not returned
    expect(createdUser.password).toBeUndefined();
    expect(createdUser.googleId).toBeUndefined();
  });
});
