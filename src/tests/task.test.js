import request from 'supertest';
import app from '../app.js';
let token;

beforeAll(async () => {
    const res = await request(app)
        .post('/api/users/login')
        .send({
            username: 'testuser',
            password: 'testpassword'
        });
    token = res.body.token;
});

describe('Task Endpoints', () => {
    it('should create a new task', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Task',
                description: 'Test Task Description'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('should fetch tasks for a user', async () => {
        const res = await request(app)
            .get('/api/tasks')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});
