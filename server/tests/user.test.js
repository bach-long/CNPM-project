const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../app');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Good = require('../models/Good');
const sequelize = require('../database/database');

describe('Các Route với User', () => {
    let token;
    let user;
    let good;
    beforeAll(async () => {
        user = await User.create({
            email: 'testuser@example.com',
            username: 'testuser',
            password: '123456',
            address: '123 Xuan Thuy, Cau Giay, Hanoi',
            sdt: '0899551999',
        });
        token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
        good = await Good.create({
            name: 'Good từ Test User',
            description:
                'Good từ Test User Good từ Test User Good từ Test User Good từ Test User Good từ Test User Good từ Test User Good từ Test User Good từ Test User Good từ Test User ',
            address: '123 Xuan Thuy, Cau Giay, Hanoi',
            price: 1500000,
            state: 'old',
            userId: user.userId,
        });
    });

    describe('GET /api/users/:username', () => {
        it('Trả về user đúng với username', async () => {
            const response = await request(app)
                .get(`/api/users/user1`)
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toEqual(
                expect.objectContaining({
                    username: 'user1',
                })
            );
        });

        it('Trả về 404 nếu username không tồn tại', async () => {
            await request(app)
                .get(`/api/users/xxxxxthisxuserxdoesxnotxexistxxxxx`)
                .expect('Content-Type', /json/)
                .expect(404);
        });

        it('Trả về user với trường isFollowedByCurrentUser nếu có user đang đăng nhập', async () => {
            const response = await request(app)
                .get(`/api/users/user1`)
                .set('Cookie', `jwt=${token}`)
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toEqual(
                expect.objectContaining({
                    isFollowedByCurrentUser: expect.any(Boolean),
                })
            );
        });
    });

    describe('GET /api/users/:username/goods', () => {
        let data;
        beforeAll(async () => {
            const response = await request(app)
                .get(`/api/users/user1/goods`)
                .expect('Content-Type', /json/)
                .expect(200);
            data = response.body;
        });
        it('Trả về list các goods của đúng userId', async () => {
            for (let good of data) {
                expect(good.userId).toBe(1);
            }
        });
        it('Trả về list các goods giảm dần theo createdAt', async () => {
            for (let i = 0; i < data.length - 1; i++) {
                expect(
                    new Date(data[i].createdAt).getTime()
                ).toBeGreaterThanOrEqual(
                    new Date(data[i + 1].createdAt).getTime()
                );
            }
        });
        it('Các good trả về phải có trường isBookmarkedByCurrentUser nếu user đã log in', async () => {
            const response = await request(app)
                .get('/api/users/user1/goods')
                .set('Cookie', [`jwt=${token}`])
                .expect('Content-Type', /json/)
                .expect(200);

            const count = response.body.length;

            for (let i = 0; i < count - 1; i++) {
                expect(response.body[i]).toEqual(
                    expect.objectContaining({
                        isBookmarkedByCurrentUser: expect.any(Boolean),
                    })
                );
            }
        });
    });

    describe('POST /api/users/:username/follow', () => {
        it('Trả về Unauthorized (401) nếu token không hợp lệ', async () => {
            const response = await request(app)
                .post('/api/users/1/follow')
                .expect('Content-Type', /json/)
                .expect(401);

            expect(response.body).toEqual(
                expect.objectContaining({
                    error: expect.any(String),
                })
            );
        });

        it('FollowerCount phải +1 nếu được follow bởi 1 user khác', async () => {
            let user1 = await User.findOne({ where: { username: 'user1' } });
            const oldFollowersCount = user1.followersCount;

            const response = await request(app)
                .post('/api/users/user1/follow')
                .set('Cookie', [`jwt=${token}`])
                .expect('Content-Type', /json/)
                .expect(200);

            user1 = await User.findOne({ where: { username: 'user1' } });
            expect(user1.followersCount).toBe(oldFollowersCount + 1);
        });

        it('FollowerCount phải -1 nếu bị unfollow bởi 1 user khác', async () => {
            let user1 = await User.findOne({ where: { username: 'user1' } });
            const oldFollowersCount = user1.followersCount;

            const response = await request(app)
                .post('/api/users/user1/follow')
                .set('Cookie', [`jwt=${token}`])
                .expect('Content-Type', /json/)
                .expect(200);

            user1 = await User.findOne({ where: { username: 'user1' } });
            expect(user1.followersCount).toBe(oldFollowersCount - 1);
        });

        it('Không được follow chính bản thân mình (400)', async () => {
            await request(app)
                .post(`/api/users/${user.username}/follow`)
                .set('Cookie', [`jwt=${token}`])
                .expect('Content-Type', /json/)
                .expect(400);
        });
    });

    describe('GET /api/users/:username/followers', () => {
        it('Trả về count và list follower của user ứng với username', async () => {
            const response = await request(app)
                .get(`/api/users/${user.username}/followers`)
                .expect('Content-Type', /json/)
                .expect(200);
            expect(response.body).toEqual(
                expect.objectContaining({
                    count: expect.any(Number),
                    followers: expect.any(Array),
                })
            );
        });
    });

    afterAll(async () => {
        await Good.destroy({ where: { goodId: good.goodId } });
        await User.destroy({ where: { userId: user.userId } });
        await sequelize.close();
    });
});
