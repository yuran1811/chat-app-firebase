import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import express from 'express';
import http from 'http';
import path from 'path';
import route from './routes/index.js';
// import * as socketChannel from './app/controllers/socketChannel.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 1811;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

route(app);

const messages = [];
let numActive = 0;

io.on('connection', (socket) => {
	console.log('User Connected');
	io.emit('fi-connected', messages);

	socket.on('typing', (user) => {
		io.emit('typing-status', user);
	});
	socket.on('on-chat', (data) => {
		messages.push(data);
		io.emit('user-chat', data);
	});
	socket.on('disconnect', () => {
		console.log('User Disconnected');
		if (!--numActive) numActive = 1;
		io.emit('num-active', numActive);
	});
	socket.on('count-active', (data) => {
		numActive += data;
		io.emit('num-active', numActive);
	});
});

server.listen(PORT, () => console.log(`Listening: http://localhost:${PORT}`));
