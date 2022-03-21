'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'users',
            [
                {
                    userId: 1,
                    email: 'user1@example.com',
                    username: 'user1',
                    password:
                        '$2b$10$St1d73RfkAoIs/kYOCSm/.ekQY2OCfD9tUF0BciGSX7wYnwJyK2XW',
                    address: null,
                    sdt: '0899551001',
                    createdAt: '2022-03-21T11:40:27.605Z',
                    updatedAt: '2022-03-21T11:40:27.605Z',
                },
                {
                    userId: 2,
                    email: 'user2@example.com',
                    username: 'user2',
                    password:
                        '$2b$10$St1d73RfkAoIs/kYOCSm/.ekQY2OCfD9tUF0BciGSX7wYnwJyK2XW',
                    address: null,
                    sdt: '0899551002',
                    createdAt: '2022-03-21T12:42:13.910Z',
                    updatedAt: '2022-03-21T12:42:13.910Z',
                },
            ],
            {}
        );
        await queryInterface.bulkInsert(
            'goods',
            [
                {
                    goodId: 1,
                    userId: 2,
                    name: 'Bình nước ABC',
                    description:
                        'A Test Good A Test Good A Test Good A Test Good A Test Good A Test Good A Test Good ',
                    address: '123 Xuan Thuy, Cau Giay, Hanoi',
                    price: 150000,
                    isSold: false,
                    state: 'new',
                    createdAt: '2022-03-21T12:42:38.890Z',
                    updatedAt: '2022-03-21T12:42:38.890Z',
                },
                {
                    goodId: 2,
                    userId: 1,
                    name: 'Điện thoại XYZ cũ',
                    description:
                        'A Test Good A Test Good A Test Good A Test Good A Test Good A Test Good A Test Good ',
                    address: '119 Xuan Thuy, Cau Giay, Hanoi',
                    price: 1500000,
                    isSold: false,
                    state: 'secondhand',
                    createdAt: '2022-03-21T12:42:51.908Z',
                    updatedAt: '2022-03-21T12:42:51.908Z',
                },
                {
                    goodId: 3,
                    userId: 1,
                    name: 'Tủ lạnh Panasonic',
                    description:
                        'A Test Good A Test Good A Test Good A Test Good A Test Good A Test Good A Test Good ',
                    address: 'Phu Tho',
                    price: 4500000,
                    isSold: false,
                    state: 'old',
                    createdAt: '2022-03-21T12:43:03.839Z',
                    updatedAt: '2022-03-21T12:43:03.839Z',
                },
            ],
            {}
        );
        await queryInterface.bulkInsert('comments', [
            {
                commentId: 1,
                goodId: 1,
                userId: 1,
                content:
                    'Test Comment Content Test Comment Content Test Comment Content',
                createdAt: '2022-03-21T12:47:03.839Z',
                updatedAt: '2022-03-21T12:47:03.839Z',
            },
            {
                commentId: 2,
                goodId: 1,
                userId: 1,
                content: 'Test Comment Number 2',
                createdAt: '2022-03-21T12:49:03.839Z',
                updatedAt: '2022-03-21T12:49:03.839Z',
            },
            {
                commentId: 3,
                goodId: 2,
                userId: 2,
                content: 'Trông cũ quá!!!',
                createdAt: '2022-03-21T12:54:30.839Z',
                updatedAt: '2022-03-21T12:54:30.839Z',
            },
            {
                commentId: 4,
                goodId: 1,
                userId: 2,
                content: 'Mại zô Mại zô',
                createdAt: '2022-03-21T12:57:30.839Z',
                updatedAt: '2022-03-21T12:57:30.839Z',
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users');
        await queryInterface.bulkDelete('goods');
        await queryInterface.bulkDelete('comments');
        await queryInterface.bulkDelete('sqlite_sequence'); // auto increment table
    },
};