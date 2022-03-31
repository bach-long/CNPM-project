const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../app');
const sequelize = require('../sequelize');
const { User } = require('../sequelize').models;

describe('Đăng ký, Đăng nhập, Lấy User Info và Đăng xuất', () => {
    describe('POST /api/auth/register', () => {
        it('Trả về 201 và user nếu thông tin hợp lệ', async () => {
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
        it('Trả về 400 và thông báo lỗi nếu thông tin không hợp lệ', async () => {
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
                .expect(400);
            expect(response.body).toEqual(
                expect.objectContaining({
                    errors: expect.objectContaining({
                        email: expect.any(String),
                        username: expect.any(String),
                        sdt: expect.any(String),
                    }),
                })
            );
        });
    });
    describe('POST /api/auth/login', () => {
        it('Trả về user đã đăng nhập cùng token nếu thông tin hợp lệ', async () => {
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
        it('Trả về jwt trong cookie nếu thông tin hợp lệ', async () => {
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
    });
    describe('GET /api/auth/me', () => {
        it('Trả về Unauthorized (401) nếu đang không đăng nhập', async () => {
            const response = await request(app)
                .get('/api/auth/me')
                .expect('Content-Type', /json/)
                .expect(401);
            expect(response.body).toEqual(
                expect.objectContaining({
                    error: expect.any(String),
                })
            );
        });

        it('Trả về user đã đăng nhập nếu có jwt hợp lệ', async () => {
            const token = jwt.sign(
                { username: 'testuser' },
                process.env.JWT_SECRET
            );
            const response = await request(app)
                .get('/api/auth/me')
                .set('Cookie', [`jwt=${token}`])
                .expect('Content-Type', /json/)
                .expect(200);
            expect(response.body).toEqual(
                expect.objectContaining({
                    userId: expect.any(Number),
                    email: 'testuser@example.com',
                    username: 'testuser',
                    address: '123 Xuan Thuy, Cau Giay, Hanoi',
                    sdt: '0899551999',
                })
            );
        });
    });

    describe('PATCH /api/auth/me', () => {
        it('Trả về Unauthorized (401) nếu đang không đăng nhập', async () => {
            const response = await request(app)
                .patch('/api/auth/me')
                .expect('Content-Type', /json/)
                .expect(401);
            expect(response.body).toEqual(
                expect.objectContaining({
                    error: expect.any(String),
                })
            );
        });

        it('Trả về user đã cập nhật nếu thông tin hợp lệ (sdt hoặc address) và cập nhật db', async () => {
            const token = jwt.sign(
                { username: 'testuser' },
                process.env.JWT_SECRET
            );
            const response = await request(app)
                .patch('/api/auth/me')
                .send({
                    sdt: '0987654321',
                    address: '999 Xuan Thuy, Cau Giay, Hanoi',
                })
                .set('Cookie', [`jwt=${token}`])
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toEqual(
                expect.objectContaining({
                    username: 'testuser',
                    sdt: '0987654321',
                    address: '999 Xuan Thuy, Cau Giay, Hanoi',
                })
            );

            const dbUser = await User.findOne({
                where: { username: 'testuser' },
            });
            expect(dbUser).toEqual(
                expect.objectContaining({
                    username: 'testuser',
                    sdt: '0987654321',
                    address: '999 Xuan Thuy, Cau Giay, Hanoi',
                })
            );
        });
    });

    describe('GET /api/auth/logout', () => {
        it('Trả về jwt rỗng và exprire lâu nhất 1 giây sau khi đăng xuất', async () => {
            const token = jwt.sign(
                { username: 'testuser' },
                process.env.JWT_SECRET
            );
            const response = await request(app)
                .get('/api/auth/logout')
                .set('Cookie', [`jwt=${token}`])
                .expect('Content-Type', /json/)
                .expect(200);
            expect(response.headers['set-cookie']).toEqual(
                expect.arrayContaining([expect.stringContaining('jwt=;')])
            );
            const jwtExpireString =
                response.headers['set-cookie'][0].split(';')[2];
            const jwtExpire = new Date(jwtExpireString.split('=')[1]).getTime();
            // The jwt should expire in less than 3 senconds from now
            expect(jwtExpire).toBeLessThanOrEqual(new Date().getTime() + 1200);
        });
    });
    afterAll(async () => {
        await User.destroy({ where: { username: 'testuser' } });
        await sequelize.close();
    });
});
