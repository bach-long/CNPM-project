const app = require('./app');
const sequelize = require('./sequelize');
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

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

const server = httpServer.listen(port, () => {
    console.log(`App đang chạy trên port ${port}...`);
});

io.on("connection", socket => {
    console.log('connected to client');
})
io.on('sendMessage', ()=>{
    console.log('someone send message')
})