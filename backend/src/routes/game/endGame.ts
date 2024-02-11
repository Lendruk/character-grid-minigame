import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import { gameSessionController } from '../../lib/GameSessionController';
import { checkAuth } from '../../lib/hooks/checkAuth';

const stopGame = (request: FastifyRequest, reply: FastifyReply) => {
	if (gameSessionController.hasGame()) {
		gameSessionController.stopSession();
		reply.send({ message: 'Session stopped' });
	} else {
		reply.send({ message: 'No session in progress' });
	}
};

export default {
	method: 'DELETE',
	url: '/game',
	preValidation: checkAuth,
	handler: stopGame,
} satisfies RouteOptions;