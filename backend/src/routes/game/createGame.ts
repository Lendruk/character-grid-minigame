import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import { Vector2 } from '../../lib/Vector2';
import { GameQueryParams } from './types/GameQueryParams';
import { Game } from '../../lib/Game';
import { gameRegistry } from '../../registry/GameSessionRegistry';

const GRID_SIZE: Vector2 = { x: 10, y: 10 };
const createGame = (request: FastifyRequest, reply: FastifyReply) => {
	const query = request.query as GameQueryParams;
	const game: Game = new Game(GRID_SIZE);
	const currentDate = new Date();
	game.refresh(currentDate.getSeconds(), query.bias?.charAt(0));

	gameRegistry.addSession(game);
	reply.send({ game, systemTime: currentDate.getTime() });
};

export default {
	method: 'POST',
	url: '/game',
	handler: createGame,
} satisfies RouteOptions;