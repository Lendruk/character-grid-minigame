import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import { gameSession } from '../../lib/GameSession';

const stopGame = (request: FastifyRequest, reply: FastifyReply) => {
	if (gameSession.hasGame()) {
		gameSession.stopSession();
		reply.send('Session stopped');
	} else {
		reply.send('No session in progress');
	}
};

export default {
	method: 'DELETE',
	url: '/game',
	handler: stopGame,
} satisfies RouteOptions;