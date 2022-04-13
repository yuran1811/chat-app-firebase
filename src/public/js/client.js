const socket = io();

const thisUserName = prompt('Your name is: ');
const chatForm = document.querySelector('#chat-container');
const chatMes = document.querySelector('#chat-mes');
const numActive = document.querySelector('.active-count');
const messages = document.querySelector('#messages');
const typingDots = messages.querySelector('.typing-dots');

let fiConnect = 0;

const scrollMes = () => messages.scrollBy(0, 1000);
const renderMes = (mes) => {
	const isThisUser = mes.name === thisUserName;
	const eleClass = isThisUser ? 'me' : 'other';
	messages.innerHTML += `
	<li class="${eleClass}">
		<span class="mesFrom"> ${mes.name} </span>
		<p class="mesContent"> ${mes.message} </p>
	</li>`;

	scrollMes();
};

chatForm.onsubmit = (e) => {
	e.preventDefault();

	const message = chatMes.value.trim();
	if (message) {
		socket.emit('on-chat', {
			name: thisUserName,
			message: message,
		});
		socket.emit('typing', {
			name: thisUserName,
			status: 0,
		});
	}
	chatMes.value = '';
};
chatForm.onkeydown = (e) => {
	if (e.key === 'Enter') return;

	const message = chatMes.value.trim();
	socket.emit('typing', {
		name: thisUserName,
		status: !!message,
	});
};

socket.on('fi-connected', (allMes) => {
	if (fiConnect) return;
	fiConnect = 1;
	socket.emit('count-active', 1);
	allMes.forEach(renderMes);
});
socket.on('user-chat', renderMes);
socket.on('num-active', (num) => {
	numActive.innerHTML = num;
});
socket.on('typing-status', (user) => {
	if (!user.status || user.name === thisUserName)
		typingDots.classList.add('hide');
	else typingDots.classList.remove('hide');
});
