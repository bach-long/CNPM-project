const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../app');
const sequelize = require('../sequelize');
const { User, Good } = require('../sequelize').models;

describe('Các Route với User', () => {
    let token;
    beforeAll(async () => {
        token = jwt.sign({ username: 'user1' }, process.env.JWT_SECRET);
    });

    describe('GET /api/chat/chatList', () => {
        it('Trả về danh sách các cuộc trò chuyện của user', async () => {
            const response = await request(app)
                .get(`/api/chat/chatList`)
                .set('Cookie', `jwt=${token}`)
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        conversationId: expect.any(Number),
                        username1: expect.any(String),
                        username2: expect.any(String),
                    }),
                ])
            );
        });
    });

    describe('GET /api/chat/messages/:conversationId', () => {
        it('Trả về chat giữa 2 người (conversationId=1)', async () => {
            const response = await request(app)
                .get(`/api/chat/messages/1`)
                .set('Cookie', `jwt=${token}`)
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        chatContextId: expect.any(Number),
                        conversationId: expect.any(Number),
                        username: expect.any(String),
                        context: expect.any(String),
                    }),
                ])
            );
        });
    });
});
