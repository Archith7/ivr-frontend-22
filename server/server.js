const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

let adminSocket = null;
const adminId = 'admin123';

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('adminLogin', (id, callback) => {
    if (id === adminId) {
      adminSocket = socket;
      console.log('Admin logged in');
      callback({ success: true });
    } else {
      callback({ success: false, message: 'Invalid admin ID' });
    }
  });

  socket.on('userLogin', (id, callback) => {
    console.log('User logged in with ID:', id);
    callback({ success: true });
  });

  socket.on('checkAdmin', (callback) => {
    if (adminSocket) {
      callback({ success: true });
    } else {
      callback({ success: false });
    }
  });

  socket.on('offer', (offer) => {
    if (adminSocket) {
      adminSocket.emit('offer', offer);
    } else {
      socket.emit('adminNotAvailable');
    }
  });

  socket.on('answer', (answer) => {
    socket.broadcast.emit('answer', answer);
  });

  socket.on('candidate', (candidate) => {
    socket.broadcast.emit('candidate', candidate);
  });

  socket.on('endCall', () => {
    socket.broadcast.emit('endCall');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    if (socket === adminSocket) {
      adminSocket = null;
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
