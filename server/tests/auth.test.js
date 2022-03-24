const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Register and Login', () => {
    it('POST /api/auth/register should return status code 201 and user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'testuser@example.com',
                username: 'testuser',
                password: '123456',
                passwordConfirm: '123456',
                address: '123 Xuan Thuy, Cau Giay, Hanoi',
                sdt: '0899551999',
            })
            .expect('Content-Type', /json/)
            .expect(201);
        expect(response.body).toEqual(
            expect.objectContaining({
                email: 'testuser@example.com',
                username: 'testuser',
                address: '123 Xuan Thuy, Cau Giay, Hanoi',
                sdt: '0899551999',
            })
        );
        expect(response.body).not.toContain({ password: '123456' });
    });

    it('POST /api/auth/login should return logged in user and token', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: '123456',
            })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toEqual(
            expect.objectContaining({
                token: expect.any(String),
                user: expect.objectContaining({
                    userId: expect.any(Number),
                    email: 'testuser@example.com',
                    username: 'testuser',
                    address: '123 Xuan Thuy, Cau Giay, Hanoi',
                    sdt: '0899551999',
                }),
            })
        );
        expect(response.body).not.toContain({ password: '123456' });
    });

    it('POST /api/auth/login should return jwt cookie', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: '123456',
            })
            .expect('Content-Type', /json/)
            .expect(200);

        // There should be a cookie called "jwt"
        expect(response.headers['set-cookie']).toEqual(
            expect.arrayContaining([expect.stringContaining('jwt=')])
        );
    });

    afterAll(async () => {
        await User.destroy({ where: { username: 'testuser' } });
    });
});
