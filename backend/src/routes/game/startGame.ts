import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import { GameQueryParams } from './types/GameQueryParams';
import { gameSessionController } from '../../lib/GameSessionController';

const startGame = (request: FastifyRequest, reply: FastifyReply) => {
	const query = request.query as GameQueryParams;
	gameSessionController.startSession(query.bias);
	reply.send(gameSessionController.getCurrentSession());
};

export default {
	method: 'POST',
	url: '/game',
	handler: startGame,
} satisfies RouteOptions;