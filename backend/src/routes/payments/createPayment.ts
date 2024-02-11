import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import { z } from 'zod';
import { GameSession, gameSessionController } from '../../lib/GameSessionController';
import { GameGrids } from '../../lib/models/GameGrids';
import { Payments } from '../../lib/models/Payments';
import { checkAuth } from '../../lib/hooks/checkAuth';

const createPayment = async (request: FastifyRequest, reply: FastifyReply) => {
	const body = request.body;
	let currentSession: GameSession;
	try {
		currentSession = gameSessionController.getCurrentSession();
		const gameGrid = currentSession.game.getGrid();
		const validatedBody = z.object({
			name: z.string(),
			amount: z.number(),
			code: z.string()
		}).parse(body);
		
		const storedGrid = await GameGrids.new(gameGrid.getCells(), gameGrid.size);
		const newPayment = await Payments.new(validatedBody.amount, validatedBody.code, validatedBody.name, storedGrid.id);
		reply.send({ payment: newPayment });
	} catch(error) {
		reply.status(400).send('Cannot create a payment without a session in progress');
	}
};

export default {
	method: 'POST',
	url: '/payments',
	preValidation: checkAuth,
	handler: createPayment,
} as RouteOptions;