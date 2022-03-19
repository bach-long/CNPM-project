const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const authRouter = require('./routes/authRoutes');

// Config
dotenv.config({ path: './.env' });

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.options('*', cors());

// Routes
app.use('/api/auth', authRouter);

app.all('*', (req, res) => {
    res.status(404).json({ message: 'Không tìm thấy route này!' });
});

module.exports = app;
