const app = require('./app');
const { ChatContext, Conversation} = require('./sequelize').models;
const sequelize = require('./sequelize');
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const { Op } = require('sequelize');
const e = require('cors');
const { emit } = require('process');
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

io.on("connection", function(socket) {
  sockets = new Object();
  console.log('connected');
    socket.on("online", data => {
      sockets[data.username] = socket.id;
      console.log(data, sockets);
    });
    socket.on("sendMessage", function(data) {
      const conversation= Conversation.findOne({
      where:{ 
      [Op.or]: [{
        username1: data.username1,
        username2: data.username2,
      },{
        username1: data.username2,
        username2: data.username1,
      }]
      }
      }).then((resolve)=>{
        //console.log(resolve.conversationId);
        if(resolve){
          ChatContext.create({conversationId: resolve.conversationId, username: data.username1, context: data.context}).then((message)=>{
            console.log(message);
          });
        } else {
          Conversation.create({username1: data.username1, username2: data.username2}).then(resolve=>{
            ChatContext.create({conversationId: resolve.conversationId, username: data.username1, context: data.context}).then((message)=>{
              console.log(message);
            });
          })
        }
      }); 
      io.to(sockets[data.username2]).emit('getMessage', data.context);
    });
  });
