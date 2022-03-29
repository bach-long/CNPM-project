const request = require('supertest');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const app = require('../app');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Good = require('../models/Good');
const sequelize = require('../database/database');
const Image = require('../models/Image');

describe('Xử lý ảnh', () => {
    let token;
    let user;
    let good;
    let comment;
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

        comment = await Comment.create({
            content: 'Comment từ Test User',
            userId: user.userId,
            goodId: good.goodId,
        });
    });

    describe('POST /api/fileupload', () => {
        let links = [];
        let firstTestImgPath = path.join(__dirname, 'imgs/pikachu.png');

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

        it('Bắt buộc phải có 1 trong userImgId, goodImgId, cmtImgId', async () => {
            await request(app)
                .post('/api/fileupload')
                .set('Cookie', `jwt=${token}`)
                .attach('formImageFiles', firstTestImgPath)
                .expect(400)
                .expect('Content-Type', /json/);
        });

        it('Không được cập nhật ảnh cho nhiều model cùng lúc, trả về 400 bad request', async () => {
            await request(app)
                .post('/api/fileupload')
                .field('cmtImgId', 1)
                .field('goodImgId', 1)
                .attach('formImageFiles', firstTestImgPath)
                .set('Cookie', `jwt=${token}`)
                .expect(400)
                .expect('Content-Type', /json/);
        });

        it('Không được cập nhật ảnh của user khác không phải mình, trả về 400 bad request', async () => {
            const response = await request(app)
                .post('/api/fileupload')
                .field('userImgId', 1)
                .attach('formImageFiles', firstTestImgPath)
                .set('Cookie', `jwt=${token}`)
                .expect(400)
                .expect('Content-Type', /json/);
        });

        it('Nếu cập nhật ảnh cho user thì cần xóa ảnh cũ trong database và trả về 1 ảnh đã upload', async () => {
            const dummyPath = path.join(__dirname, '../uploads/pikachu.png');
            fs.copyFileSync(firstTestImgPath, dummyPath);

            const image = await Image.create({
                link: 'pikachu.png',
                userImgId: user.userId,
            });

            links.push('pikachu.png');

            const response = await request(app)
                .post('/api/fileupload')
                .field('userImgId', user.userId)
                .attach('formImageFiles', firstTestImgPath)
                .set('Cookie', `jwt=${token}`)
                .expect(200)
                .expect('Content-Type', /json/);

            expect(response.body).toHaveProperty('link');
            expect(await user.getAvatar()).not.toEqual(
                expect.objectContaining({ link: 'pikachu.png' })
            );

            links.push(response.body.link);

            expect(fs.existsSync(dummyPath)).toBe(false);
        });

        it('Trả về không tìm thấy good (404) nếu goodImgId không tồn tại', async () => {
            await request(app)
                .post('/api/fileupload')
                .field('goodImgId', 974642313518564)
                .attach('formImageFiles', firstTestImgPath)
                .set('Cookie', [`jwt=${token}`])
                .expect('Content-Type', /json/)
                .expect(404);
        });

        it('Không được tải lên ảnh good của user khác không phải mình, trả về 400 bad request', async () => {
            const response = await request(app)
                .post('/api/fileupload')
                .field('goodImgId', 1)
                .attach('formImageFiles', firstTestImgPath)
                .set('Cookie', `jwt=${token}`)
                .expect(400)
                .expect('Content-Type', /json/);
        });

        it('Có thể tải lên nhiều ảnh cho good, trả về Array các ảnh đã upload', async () => {
            const imgPath1 = path.join(__dirname, 'imgs/pikachu.png');
            const imgPath2 = path.join(__dirname, 'imgs/portal.jpg');

            const response = await request(app)
                .post('/api/fileupload/')
                .field('goodImgId', good.goodId)
                .attach('formImageFiles', imgPath1)
                .attach('formImageFiles', imgPath2)
                .set('Cookie', `jwt=${token}`)
                .expect(200)
                .expect('Content-Type', /json/);

            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        link: expect.stringContaining('pikachu.png'),
                    }),
                    expect.objectContaining({
                        link: expect.stringContaining('portal.jpg'),
                    }),
                ])
            );

            links.push(response.body[0].link, response.body[1].link);
        });

        it('Có thể tải lên nhiều ảnh cho comment, trả về Array các ảnh đã upload', async () => {
            const imgPath1 = path.join(__dirname, 'imgs/pikachu.png');
            const imgPath2 = path.join(__dirname, 'imgs/portal.jpg');

            const response = await request(app)
                .post('/api/fileupload/')
                .field('cmtImgId', comment.commentId)
                .attach('formImageFiles', imgPath1)
                .attach('formImageFiles', imgPath2)
                .set('Cookie', `jwt=${token}`)
                .expect(200)
                .expect('Content-Type', /json/);

            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        link: expect.stringContaining('pikachu.png'),
                    }),
                    expect.objectContaining({
                        link: expect.stringContaining('portal.jpg'),
                    }),
                ])
            );

            links.push(response.body[0].link, response.body[1].link);
        });

        afterAll(async () => {
            for (let link of links) {
                if (fs.existsSync(`uploads/${link}`)) {
                    fs.unlinkSync('uploads/' + link);
                }
                await Image.destroy({ where: { link } });
            }
        });
    });

    afterAll(async () => {
        await Good.destroy({ where: { goodId: good.goodId } });
        await User.destroy({ where: { userId: user.userId } });
        await sequelize.close();
    });
});
