//  node server which will handle socket.io connections

const io = require('socket.io')(process.env.PORT || 8000)
const users= {};
console.log("WORKING")
io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        socket.broadcast.emit('user-joined', name);
        users[socket.id]=name;
    });
    socket.on('send', message=>{
        socket.broadcast.emit('receive',{message:message, name:users[socket.id]})
    });
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })
})
