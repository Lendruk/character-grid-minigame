import { FastifyReply, RouteOptions } from 'fastify';
import { gameSession } from '../../lib/GameSession';
import { SocketStream } from '@fastify/websocket';

const websocket = (connection: SocketStream) => {
	try {
		const currenSession = gameSession.getCurrentSession();
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