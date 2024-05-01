import app from '../../app';
import request from 'supertest';

describe('Feedback', () => {
  let newFeedback = {};

  afterAll(async () => {
    await request(app).delete('/api/feedback/newFeedback.id');
  });

  it('should return status code 200', async () => {
    const res = await request(app).post('/api/feedback').send({
      title: 'from test',
      category: 'Planned',
      detail: 'This is created from supertest',
    });

    newFeedback = res.body;
    expect(res.statusCode).toEqual(200);
  });

  it('should return status code 500', async () => {
    const res = await request(app).post('/api/feedback').send({});
    expect(res.statusCode).toEqual(400);
  });
});
