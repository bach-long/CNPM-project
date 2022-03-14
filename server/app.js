const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello World!',
        sos: '127.0.0.1:5000/sos',
    });
});

app.get('/sos', (req, res) => {
    const message = 'ét o ét';

    res.status(200).json({
        abcdefghijklmnopqrstuvwxyz: message,
    });
});

app.all('*', (req, res) => {
    res.status(404).send('Không tìm thấy route này!');
});

module.exports = app;
