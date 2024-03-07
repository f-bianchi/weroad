import * as request from 'supertest';
import { appTest, tokenEditor } from './jest.setup';

const TRAVEL_SLUG = 'jordan-360';
const TRAVEL_ID = 'd408be33-aa6a-4c73-a2c8-58a70ab2ba4d';

describe('Tours API', () => {
  it('should list tours paginated with default sorting (ASC)', async () => {
    const { body } = await request(appTest.getHttpServer())
      .get(`/travels/${TRAVEL_SLUG}/tours`)
      .query({ page: 1, pageSize: 2 })
      .expect(200);

    expect(body.items.length).toBe(2);
    expect(body.items[0].startingDate).toBe('2021-11-01');
    expect(body.items[1].startingDate).toBe('2021-11-12');
    expect(body.total).toBe(3);
  });

  it('should list tours sorted by price in ascending order', async () => {
    const { body } = await request(appTest.getHttpServer())
      .get(`/travels/${TRAVEL_SLUG}/tours`)
      .query({ page: 1, pageSize: 10, sort: 'price', order: 'ASC' })
      .expect(200);

    expect(body.items.length).toBe(3);
    expect(body.items[0].price).toBe(1899);
    expect(body.items[1].price).toBe(1999);
    expect(body.items[2].price).toBe(2149);
  });

  it('should filter tours by date range', async () => {
    const { body } = await request(appTest.getHttpServer())
      .get(`/travels/${TRAVEL_SLUG}/tours`)
      .query({ page: 1, pageSize: 10, startingDate: '2021-11-01', endingDate: '2021-11-10' })
      .expect(200);

    expect(body.items.length).toBe(1);
  });

  it('should return 400 for invalid date format during filtering', async () => {
    const { body } = await request(appTest.getHttpServer())
      .get(`/travels/${TRAVEL_SLUG}/tours`)
      .query({ page: 1, pageSize: 10, startingDate: '01/10/2021' })
      .expect(400);

    expect(body.message).toEqual(['startingDate must be a valid ISO 8601 date string']);
  });

  it('should return 400 for invalid date range during filtering', async () => {
    const { body } = await request(appTest.getHttpServer())
      .get(`/travels/${TRAVEL_SLUG}/tours`)
      .query({ page: 1, pageSize: 10, startingDate: '2021-11-01', endingDate: '2021-10-31' })
      .expect(400);

    expect(body.message).toEqual(['endingDate must be same or after startingDate']);
  });

  it('should return 400 for missing travelId during listing', async () => {
    await request(appTest.getHttpServer())
      .get(`/admin/tours`)
      .set('Authorization', `Bearer ${tokenEditor}`)
      .expect(400);
  });

  it('should allow editor to list tours for a specific travelId', async () => {
    const { body } = await request(appTest.getHttpServer())
      .get(`/admin/tours`)
      .query({ travelId: TRAVEL_ID })
      .set('Authorization', `Bearer ${tokenEditor}`)
      .expect(200);

    expect(body.items.length).toBe(3);
  });

  it('should allow editor to get a specific tour by id', async () => {
    const { body } = await request(appTest.getHttpServer())
      .get(`/admin/tours/2a0edc99-c9fe-4206-8da5-413586667a21`)
      .set('Authorization', `Bearer ${tokenEditor}`)
      .expect(200);

    expect(body.name).toBe('ITJOR20211101');
  });

  it('should allow editor to create a new tour', async () => {
    const newTour = {
      name: 'foo-bar-tour',
      startingDate: '2024-03-01',
      endingDate: '2024-03-05',
      price: 2990,
      travelId: TRAVEL_ID,
    };
    const { body } = await request(appTest.getHttpServer())
      .post(`/admin/tours`)
      .send(newTour)
      .set('Authorization', `Bearer ${tokenEditor}`)
      .expect(201);

    expect(body.name).toBe('foo-bar-tour');
    expect(body.travel.slug).toBe(TRAVEL_SLUG);
  });

  it('should return 400 for invalid date range during tour creation', async () => {
    const newTour = {
      name: 'foo-bar-tour',
      startingDate: '2024-03-05',
      endingDate: '2024-03-01',
      price: 2990,
      travelId: TRAVEL_ID,
    };
    const { body } = await request(appTest.getHttpServer())
      .post(`/admin/tours`)
      .send(newTour)
      .set('Authorization', `Bearer ${tokenEditor}`)
      .expect(400);

    expect(body.message).toEqual(['endingDate must be same or after startingDate']);
  });

  it('should forbid editor from updating a tour', async () => {
    const updateTour = {
      name: 'update-foo-bar',
      startingDate: '2021-11-01',
      endingDate: '2021-11-09',
      price: 9999,
      travelId: TRAVEL_ID,
    };

    const { body } = await request(appTest.getHttpServer())
      .put('/admin/tours/2a0edc99-c9fe-4206-8da5-413586667a21')
      .send(updateTour)
      .set('Authorization', `Bearer ${tokenEditor}`)
      .expect(200);

    expect(body.name).toBe(updateTour.name);
    expect(body.price).toBe(updateTour.price);
  });

  it('should allow editor to delete a tour by id', () => {
    return request(appTest.getHttpServer())
      .delete('/admin/tours/2a0edc99-c9fe-4206-8da5-413586667a21')
      .set('Authorization', `Bearer ${tokenEditor}`)
      .expect(204);
  });
});
