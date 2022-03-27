const request = require('supertest');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const app = require('../app');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Good = require('../models/Good');
const sequelize = require('../database/database');

describe('Xử lý ảnh', () => {
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

    describe('POST /api/fileupload', () => {
        let links = [];

        it('Trả về link ảnh đã upload', async () => {
            const file = {
                path: path.join(__dirname, 'imgs/pikachu.png'),
            };
            const response = await request(app)
                .post('/api/fileupload')
                .attach('formFile', file.path)
                .set('Cookie', `jwt=${token}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('link');

            links.push(response.body.link);
        });

        afterAll(async () => {
            for (let link of links) {
                fs.unlinkSync('uploads/' + link);
            }
        });
    });

    afterAll(async () => {
        await Good.destroy({ where: { goodId: good.goodId } });
        await User.destroy({ where: { userId: user.userId } });
        await sequelize.close();
    });
});
