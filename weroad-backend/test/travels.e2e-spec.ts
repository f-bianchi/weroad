import { TravelDto } from 'src/travels/dto/travel.dto';
import * as request from 'supertest';
import { TravelsService } from '../src/travels/travels.service';
import { appTest, moduleFixture, tokenAdmin, tokenEditor } from './jest.setup';

describe('Travels', () => {
  let travelsService: TravelsService;
  let newTravelId: string;

  beforeAll(async () => {
    travelsService = moduleFixture.get<TravelsService>(TravelsService);
  });

  it('/travels (GET) 200 public paginated', async () => {
    const { body } = await request(appTest.getHttpServer())
      .get('/travels')
      .query({ page: 1, pageSize: 2 })
      .expect(200);

    expect(body.items.length).toBe(2);
    expect(body.total).toBe(3);
  });

  it('/travels/slug (GET) 200 public', async () => {
    const { body } = await request(appTest.getHttpServer()).get('/travels/jordan-360').expect(200);
    expect(body.slug).toBe('jordan-360');
    expect(body.isPublic).toBe(true);
    expect(body.tours.length).toBe(3);
  });

  it('/travels/slug (GET) 404 draft', async () => {
    await request(appTest.getHttpServer()).get('/travels/cairo-egypt-express-tour').expect(404);
  });

  it('/travels/id (GET) 200 admin', async () => {
    const { body } = await request(appTest.getHttpServer())
      .get(`/admin/travels/cbf304ae-a335-43fa-9e56-811612dcb602`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .expect(200);
    expect(body.slug).toBe('cairo-egypt-express-tour');
    expect(body.isPublic).toBe(false);
  });

  it('/travels (POST) 403 for editor', () => {
    return request(appTest.getHttpServer())
      .post('/admin/travels')
      .set('Authorization', `Bearer ${tokenEditor}`)
      .expect(403);
  });

  it('/travels (PUT) 403 for editor', () => {
    return request(appTest.getHttpServer())
      .put('/admin/travels/cbf304ae-a335-43fa-9e56-811612dcb602')
      .set('Authorization', `Bearer ${tokenEditor}`)
      .expect(403);
  });

  it('/travels (DELETE) 403 for editor', () => {
    return request(appTest.getHttpServer())
      .delete('/admin/travels/cbf304ae-a335-43fa-9e56-811612dcb602')
      .set('Authorization', `Bearer ${tokenEditor}`)
      .expect(403);
  });

  it('/travels (POST) 201 create with moods', async () => {
    const newTravel: TravelDto = {
      slug: 'foo-bar',
      name: 'Foo bar',
      description: 'A foo bar travel',
      isPublic: false,
      numberOfDays: 7,
      moods: {
        nature: 5,
        relax: 10,
        history: 15,
        culture: 20,
        party: 30,
      },
    };
    const { body } = await request(appTest.getHttpServer())
      .post('/admin/travels')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(newTravel)
      .expect(201);

    newTravelId = body.id;

    const travel = await travelsService.findOneById(body.id);
    expect(travel.slug).toEqual(newTravel.slug);
    expect(travel.moods).toEqual(expect.objectContaining(newTravel.moods));
    expect(travel.numberOfNights).toBe(6);
  });

  it('/travels (PUT) 200 edit travel', async () => {
    const updateTravel: TravelDto = {
      slug: 'cairo-egypt-express-tour',
      name: 'Egypt Express: Cairo and the Great Pyramids',
      description: 'new description',
      isPublic: true,
      numberOfDays: 4,
      moods: {
        nature: 10,
        relax: 20,
        history: 30,
        culture: 40,
        party: 50,
      },
    };
    const { body } = await request(appTest.getHttpServer())
      .put('/admin/travels/cbf304ae-a335-43fa-9e56-811612dcb602')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(updateTravel)
      .expect(200);

    const travel = await travelsService.findOneById(body.id);
    expect(travel.isPublic).toEqual(true);
    expect(travel.moods).toEqual(expect.objectContaining(updateTravel.moods));
    expect(travel.numberOfNights).toBe(3);
  });

  it('/travels (DELETE) 204', async () => {
    await request(appTest.getHttpServer())
      .delete(`/admin/travels/${newTravelId}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .expect(204);
  });
});
