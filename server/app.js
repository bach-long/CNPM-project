
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const authRouter = require('./routes/auth');
const goodRouter = require('./routes/good');
const userRouter = require('./routes/user');
const fileUploadRouter = require('./routes/image');

// Config
dotenv.config({ path: './.env' });

const app = express();

// Middlewares
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.options('*', cors());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/goods', goodRouter);
app.use('/api/users', userRouter);
app.use('/api/fileupload', fileUploadRouter);
app.use(express.static('uploads'))
app.all('*', (req, res) => {
    res.status(404).json({ message: 'Không tìm thấy route này!' });
});

app.use((error, req, res, next) => {
    res.status(500).json({
        errors: 'Lỗi chưa xác định!!!',
        error,
    });
});

module.exports = app;