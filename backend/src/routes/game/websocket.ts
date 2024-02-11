import { FastifyReply, RouteOptions } from 'fastify';
import { SocketStream } from '@fastify/websocket';
import { gameSessionController } from '../../lib/GameSessionController';

const websocket = (connection: SocketStream) => {
	try {
		const currenSession = gameSessionController.getCurrentSession();
		connection.socket.send(JSON.stringify({
			event: 'SESSION',
			data: currenSession,
		}));
	} catch(error) {
		console.log(error);
	}
};

export default {
	method: 'GET',
	url: '/game',
	handler: (_, reply: FastifyReply) => {
		reply.status(501).send('Websocket endpoint only');
	},
	wsHandler: websocket,
} satisfies RouteOptions;