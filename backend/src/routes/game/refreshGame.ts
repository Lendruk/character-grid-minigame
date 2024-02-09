import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import { gameRegistry } from '../../registry/GameSessionRegistry';
import { GameQueryParams } from './types/GameQueryParams';

type RefreshGameParams = {
  id: string;
}

const refreshGame = (request: FastifyRequest, reply: FastifyReply) => {
	const params = request.params as RefreshGameParams;
	const query = request.query as GameQueryParams;
	const game = gameRegistry.getSession(params.id);
  
	if (!game) {
		reply.status(404).send('Game not found');
	} else {
		const currentDate = new Date();
		game.refresh(currentDate.getSeconds(), query.bias?.charAt(0));
		reply.send({ game, systemTime: currentDate.getTime() });
	}
};

export default {
	method: 'PUT',
	url: '/game/:id',
	handler: refreshGame,
} satisfies RouteOptions;