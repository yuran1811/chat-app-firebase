import room from './room.js';

const route = (app) => {
	app.use('/room', room);
};

export default route;
