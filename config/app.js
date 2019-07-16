const express = require('express');
const app = express();
require('dotenv').config();
global.Env = process.env

const http = require('http').Server(app);
const bodyParser = require('body-parser');

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))

http.listen(Env.PORT, ()=>{
    console.log('Port' + ' '+`${Env.PORT}` + ' ' +'server is running...');
});
const io = require('socket.io')(http,{
  pingTimeout:30000,
  pingInterval:60000
});

let connected = [];
io.on('connect', (socket)=>{
  connected.push(socket.id)
  console.log("Client_connect_with" + " " +socket.id);
 // console.log(io.sockets.connected);
  
  io.emit('client_connect', socket.id)
  socket.on('message', function(data){
    console.log(data);
    
  })

  socket.on('disconnect', function(data){
    connected = connected.filter(con => con !== socket.id)
    console.log("Client_disconnect_with" + " " +socket.id);

    io.emit('client_disconnect', socket.id)
  })
});

module.exports =app;