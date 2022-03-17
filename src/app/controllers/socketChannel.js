export const onChat = (io, messages) => (data) => {
	messages.push(data);
	io.emit('user-chat', data);
};

export const disconnect = (io, numActive) => () => {
	console.log('User Disconnected');
	if (!--numActive) numActive = 1;
	io.emit('num-active', numActive);
};

export const countActive = (io, numActive) => (data) => {
	numActive += data;
	io.emit('num-active', numActive);
};
