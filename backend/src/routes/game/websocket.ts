import { FastifyReply, RouteOptions } from 'fastify';
import { SocketStream } from '@fastify/websocket';
import { GameSession, gameSessionController } from '../../lib/GameSessionController';

const websocket = (connection: SocketStream) => {
	let currentSession: GameSession;
	try {
		currentSession = gameSessionController.getCurrentSession();
		connection.socket.send(JSON.stringify({
			event: 'SESSION',
			data: currentSession,
		}));
	} catch {
		// No session in progress
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