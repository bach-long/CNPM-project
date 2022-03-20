const sequelize = require('./database/database.js');
const app = require('./app');

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch((error) => {
//         console.error('Unable to connect to the database:', error);
//     });

const initDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await sequelize.sync({ alter: true });
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
