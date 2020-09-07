const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const {
  addUser,
  removeUser,
  getUser,
  getUsersIntestRoom,
} = require('./users.js');

PORT = process.env.PORT || 5000;
// router
const router = require('./router');

const app = express();

const server = http.createServer(app);
const io = socketio(server);
let online = 0;
io.on('connection', socket => {
  // 1 lắng nghe khi user vào browser
  socket.on('join', ({ name, testRoom }, callback) => {
    console.log(testRoom);
    // lắng nghe join , nhận vào data là name && testRoom
    const { error, user } = addUser({ id: socket.id, name, testRoom });
    // chạy hàm add user : nếu user tồn tại trả về error , ngược lại là user
    if (error) return callback(error);
    // xử lý callback nếu error
    online++;
    io.sockets.emit('onliners', online);
    // nếu user không tồn tại , emit tiếp message , kèm data là  user + text về client
    // socket.emit => chỉ socket id đấy nhận đc thôi
    socket.emit('message', {
      user: 'admin',
      text: `${user.name} , welcome to the testRoom ${user.testRoom}`,
    });
    // socket broadcast => trỏ tới tất cả trừ socket.id request
    socket.broadcast
      .to(user.testRoom)
      .emit('message', { user: 'admin', text: `${user.name},has joined!` });

    socket.join(user.testRoom);
  });

  socket.on('sendMessage', (message, callback) => {
    // lắng nghe sendMessage rồi nhận vào message
    const user = getUser(socket.id);
    // socket gửi tới các user có same testRoom
    io.to(user.testRoom).emit('message', { user: user.name, text: message });
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    online = online - 1;
    socket.broadcast.emit('onliners2', online);
    if (user) {
      io.to(user.testRoom).emit('message', {
        user: 'admin',
        text: `${user.name} has left`,
      });
    }
  });
});

app.use(router);

server.listen(PORT, () => console.log(`server has started on port ${PORT}`));
