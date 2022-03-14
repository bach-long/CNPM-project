const app = require('./app');

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(`App đang chạy trên port ${port}...`);
});
