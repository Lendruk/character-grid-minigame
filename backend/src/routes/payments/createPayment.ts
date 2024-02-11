import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import { z } from 'zod';
import { db } from '../../db/db';
import { payments } from '../../db/schema';
import { GameSession, gameSessionController } from '../../lib/GameSessionController';
import { GameGrids } from '../../lib/models/GameGrids';

const createPayments = async (request: FastifyRequest, reply: FastifyReply) => {
	const body = JSON.parse(request.body as string);
	let currentSession: GameSession;
	try {
		currentSession = gameSessionController.getCurrentSession();
		const gameGrid = currentSession.game.getGrid();
		const validatedBody = z.object({
			name: z.string(),
			amount: z.number(),
			code: z.string()
		}).parse(body);
		
		const storedGrid = await GameGrids.New(db, gameGrid.getCells(), gameGrid.size);
		const newPayment = await db.insert(payments).values({ amount: validatedBody.amount, code: validatedBody.code, name: validatedBody.name, gridId: storedGrid.id }).returning();
		reply.send({ payment: newPayment[0] });
	} catch(error) {
		reply.status(400).send('Cannot create a payment without a session in progress');
	}
};

export default {
	method: 'POST',
	url: '/payments',
	handler: createPayments,
} as RouteOptions;