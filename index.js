//node server which will handel socket iio server
const port = process.env.PORT || 8000;
const io = require('socket.io')(port, {
    cors: { origin: "*" }
})

const users = {};

io.on('connection', Socket => {
    Socket.on('New-user-joined', name => {
        console.log("user joined", name);
        users[Socket.id] = name;
        Socket.broadcast.emit('user-joined', name);
    })
    Socket.on('send', message => {
        Socket.broadcast.emit('receive', { message: message, name: users[Socket.id] })
    });
    Socket.on('disconnect', message => {
        Socket.broadcast.emit('leave', users[Socket.id]);
        delete users[Socket.id];
    });
})