const sequelize = require('./sequelize');
const app = require('./app');

const initDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // await sequelize.sync({ alter: true }); // alter can break association
        await sequelize.sync(); // force can break association
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Error at database init:', error);
    }
};
initDatabase();

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(`App đang chạy trên port ${port}...`);
});
