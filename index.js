const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const port = 1811;

const { Server, Socket } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	console.log('User Connected');
	socket.on('on-chat', (data) => {
		io.emit('user-chat', data);
	});
});

server.listen(port, () => {
	console.log('Listening');
});
