import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import { gameSessionController } from '../../lib/GameSessionController';

const stopGame = (request: FastifyRequest, reply: FastifyReply) => {
	if (gameSessionController.hasGame()) {
		gameSessionController.stopSession();
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