const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../app');
const sequelize = require('../sequelize');
const { User, Good, Comment } = require('../sequelize').models;

describe('Các Route với Good', () => {
    let testVar;
    let user;
    let token;

    beforeAll(async () => {
        testVar = 1;

        user = await User.create({
            email: 'testuser@example.com',
            username: 'testuser',
            password: '123456',
            address: '123 Xuan Thuy, Cau Giay, Hanoi',
            sdt: '0899551999',
        });

        token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
    });

    it('`this` phải có biến test', () => {
        expect(testVar).toEqual(1);
    });

    describe('POST /api/goods tạo good', () => {
        it('Trả về Unauthorized (401) nếu đang không đăng nhập', async () => {
            const response = await request(app)
                .post('/api/goods')
                .send({
                    name: 'Good từ Test Good',
                    description:
                        'Good từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test Good',
                    address: '123 Xuan Thuy, Cau Giay, Hanoi',
                    price: 1500000,
                    state: 'new',
                    userId: user.userId,
                    tagId: 1,
                })
                .expect('Content-Type', /json/)
                .expect(401);

            expect(response.body).toEqual(
                expect.objectContaining({
                    error: expect.any(String),
                })
            );
        });

        it('Trả về 201 và good đã tạo nếu thành công, good mới tạo không được để đã bán', async () => {
            const response = await request(app)
                .post('/api/goods')
                .send({
                    name: 'Good từ Test Good',
                    description:
                        'Good từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test Good',
                    address: '123 Xuan Thuy, Cau Giay, Hanoi',
                    price: 1500000,
                    state: 'new',
                    userId: user.userId,
                    tagId: 1,
                })
                .set('Cookie', [`jwt=${token}`])
                .expect('Content-Type', /json/)
                .expect(201);

            expect(response.body).toEqual(
                expect.objectContaining({
                    isSold: false,
                    goodId: expect.any(Number),
                    userId: user.userId,
                    name: 'Good từ Test Good',
                    description:
                        'Good từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test Good',
                    address: '123 Xuan Thuy, Cau Giay, Hanoi',
                    price: 1500000,
                    state: 'new',
                    tagId: 1,
                })
            );
        });
    });

    describe('GET /api/goods lấy ra tất cả các goods', () => {
        it('Trả về page 1 và tối đa 20 goods nếu không có query', async () => {
            const response = await request(app)
                .get('/api/goods')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toEqual(
                expect.objectContaining({
                    page: 1,
                    limit: 20,
                    totalPageCount: expect.any(Number),
                    goods: expect.arrayContaining([
                        expect.objectContaining({
                            isSold: expect.any(Boolean),
                            goodId: expect.any(Number),
                            userId: expect.any(Number),
                            name: expect.any(String),
                            description: expect.any(String),
                            address: expect.any(String),
                            price: expect.any(Number),
                            state: expect.any(String),
                        }),
                    ]),
                })
            );
        });

        it('Goods được sắp xếp theo thứ tự thời gian giảm dần theo createdAt', async () => {
            const response = await request(app)
                .get('/api/goods')
                .expect('Content-Type', /json/)
                .expect(200);

            const count = response.body.goods.length;

            for (let i = 0; i < count - 1; i++) {
                expect(
                    new Date(response.body.goods[i].createdAt).getTime()
                ).toBeGreaterThanOrEqual(
                    new Date(response.body.goods[i + 1].createdAt).getTime()
                );
            }
        });

        it('GET /api/goods/:id Trả về good đúng với id', async () => {
            const response = await request(app)
                .get('/api/goods/2')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toEqual(
                expect.objectContaining({
                    isSold: expect.any(Boolean),
                    goodId: 2,
                    userId: expect.any(Number),
                    name: expect.any(String),
                    description: expect.any(String),
                    address: expect.any(String),
                    price: expect.any(Number),
                    state: expect.any(String),
                })
            );
        });
        it('GET /api/goods/:id trả về phải có trường isBookmarkedByCurrentUser nếu user đã log in', async () => {
            const response = await request(app)
                .get('/api/goods/2')
                .set('Cookie', [`jwt=${token}`])
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toEqual(
                expect.objectContaining({
                    isBookmarkedByCurrentUser: expect.any(Boolean),
                })
            );
        });

        it('Các good trả về phải có trường isBookmarkedByCurrentUser nếu user đã log in', async () => {
            const response = await request(app)
                .get('/api/goods')
                .set('Cookie', [`jwt=${token}`])
                .expect('Content-Type', /json/)
                .expect(200);

            const count = response.body.goods.length;

            for (let i = 0; i < count - 1; i++) {
                expect(response.body.goods[i]).toEqual(
                    expect.objectContaining({
                        isBookmarkedByCurrentUser: expect.any(Boolean),
                    })
                );
            }
        });
    });

    describe('DELETE /api/goods/:id/', () => {
        let good;
        beforeAll(async () => {
            good = await Good.create({
                name: 'Good từ Test Good',
                description:
                    'Good từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test GoodGood từ Test Good',
                address: '123 Xuan Thuy, Cau Giay, Hanoi',
                price: 1500000,
                state: 'new',
                userId: user.userId,
            });
        });

        it('Trả về Unauthorized (401) nếu token không hợp lệ', async () => {
            const response = await request(app)
                .delete('/api/goods/1')
                .expect('Content-Type', /json/)
                .expect(401);

            expect(response.body).toEqual(
                expect.objectContaining({
                    error: expect.any(String),
                })
            );
        });

        it('Trả về không tìm thấy good (404) nếu goodId không tồn tại', async () => {
            await request(app)
                .delete('/api/goods/11561351516165165165')
                .set('Cookie', [`jwt=${token}`])
                .expect('Content-Type', /json/)
                .expect(404);
        });

        it('Trả về 403 nếu userId không phải là userId của chủ good', async () => {
            await request(app)
                .delete('/api/goods/1')
                .set('Cookie', [`jwt=${token}`])
                .expect('Content-Type', /json/)
                .expect(403);
        });

        it('Trả về 204 No content nếu xóa thành công', async () => {
            await request(app)
                .delete(`/api/goods/${good.goodId}`)
                .set('Cookie', [`jwt=${token}`])
                .expect(204);
        });
    });

    describe('GET /api/goods/:id/comments', () => {
        beforeAll(async () => {
            this.response = await request(app)
                .get('/api/goods/1/comments')
                .expect('Content-Type', /json/)
                .expect(200);

            this.count = this.response.body.length;
        });

        it('Trả về tất cả comments của đúng goodId', async () => {
            for (let i = 0; i < this.count; i++) {
                expect(this.response.body[i].goodId).toBe(1);
            }
        });

        it('Trả về comments theo createdAt giảm dần', async () => {
            for (let i = 0; i < this.count - 1; i++) {
                expect(
                    new Date(this.response.body[i].createdAt).getTime()
                ).toBeGreaterThanOrEqual(
                    new Date(this.response.body[i + 1].createdAt).getTime()
                );
            }
        });
    });

    describe('POST /api/goods/:id/comments', () => {
        it('Trả về Unauthorized (401) nếu token không hợp lệ', async () => {
            const response = await request(app)
                .post('/api/goods/1/comments')
                .send({
                    comment: 'Comment từ Test Comment',
                })
                .expect('Content-Type', /json/)
                .expect(401);

            expect(response.body).toEqual(
                expect.objectContaining({
                    error: expect.any(String),
                })
            );
        });

        it('Trả về 201 nếu comment thành công, đúng userId và goodId', async () => {
            const response = await request(app)
                .post('/api/goods/1/comments')
                .send({
                    content: 'Comment từ Test Comment',
                })
                .set('Cookie', [`jwt=${token}`])
                .expect('Content-Type', /json/)
                .expect(201);

            expect(response.body).toEqual(
                expect.objectContaining({
                    content: 'Comment từ Test Comment',
                    goodId: 1,
                    userId: user.userId,
                })
            );

            await Comment.destroy({
                where: { commentId: response.body.commentId },
            });
        });
    });

    describe('POST /api/goods/:goodId/bookmark', () => {
        it('Trả về Unauthorized (401) nếu token không hợp lệ', async () => {
            const response = await request(app)
                .post('/api/goods/1/bookmark')
                .expect('Content-Type', /json/)
                .expect(401);

            expect(response.body).toEqual(
                expect.objectContaining({
                    error: expect.any(String),
                })
            );
        });

        it('bookmarkersCount phải +1 nếu được bookmark bởi 1 user', async () => {
            let good1 = await Good.findOne({ where: { goodId: 1 } });
            let oldCount = good1.bookmarkersCount;

            await request(app)
                .post('/api/goods/1/bookmark')
                .set('Cookie', [`jwt=${token}`])
                .expect('Content-Type', /json/)
                .expect(200);

            good1 = await Good.findOne({ where: { goodId: 1 } });
            expect(good1.bookmarkersCount).toBe(oldCount + 1);
        });

        it('bookmarkersCount phải -1 nếu bị unbookmark bởi 1 user', async () => {
            let good1 = await Good.findOne({ where: { goodId: 1 } });
            let oldCount = good1.bookmarkersCount;

            await request(app)
                .post('/api/goods/1/bookmark')
                .set('Cookie', [`jwt=${token}`])
                .expect('Content-Type', /json/)
                .expect(200);

            good1 = await Good.findOne({ where: { goodId: 1 } });
            expect(good1.bookmarkersCount).toBe(oldCount - 1);
        });
    });

    afterAll(async () => {
        await User.destroy({ where: { userId: user.userId } });
        await sequelize.close();
    });
});