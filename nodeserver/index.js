//  Node server which will handle socket io connections

// use socket io and we are using 8000 port
const io=require('socket.io')(8000)

const users={};

// io.on = socket.io instances  ye listen karega events  ye sabhi loga ka coonection dekhega
// socket.on =  one instance  ye listen karega events pr sirf specific person ke liye


io.on('connection',socket =>{
    // if any new user joined let other users connected to the server
    socket.on('new-user-joined',name =>{
        
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
 });
 // if someone sends a message broadcast it to other
 socket.on('send',message =>{
    socket.broadcast.emit('recieve',{ message: message,name: users[socket.id]})
 });
 // if someone leaves the chat let others know
 socket.on('disconnect',message =>{
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
 });
});


