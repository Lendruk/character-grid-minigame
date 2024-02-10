import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import { GameQueryParams } from './types/GameQueryParams';
import { gameSession } from '../../lib/GameSession';

const startGame = (request: FastifyRequest, reply: FastifyReply) => {
	const query = request.query as GameQueryParams;
	gameSession.startSession(query.bias);
	reply.send(gameSession.getCurrentSession());
};

export default {
	method: 'POST',
	url: '/game',
	handler: startGame,
} satisfies RouteOptions;