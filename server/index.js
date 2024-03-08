import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

let onlineUser = [];
const addNewUser = (username, socketID) => {
  !onlineUser.some((user) => user.username === username) && onlineUser.push({ username, socketID });
};
const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketID !== socketId);
};
const getUser = (username) => {
  return onlineUser.find(user => user.username = username);
};

io.on('connection', (socket) => {
  console.log(`User connected: User Client ID(${socket.id})`);

  socket.on('newUser', (username) => addNewUser(username, socket.id));

  socket.on('sendNotification', ({ senderName, receiverName, type }) => {
    const receiver = getUser(receiverName);
    io.to(receiver.socketID).emit('getNotification', {
      senderName,
      type,
    });
  });

  socket.on('disconnect', () => {
    console.log(`User Disconnect: User Client ID(${socket.id})`);
    removeUser(socket.id);
  });
});

app.use(cors({
  origin: 'http://localhost:5173',
}));

const PORT = process.env.PORT;
server.listen(process.env.PORT, () => {
  console.log(`listening on port ${PORT}`);
});
