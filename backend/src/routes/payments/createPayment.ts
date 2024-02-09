import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import { z } from 'zod';
import { db } from '../../db/db';
import { payments } from '../../db/schema';

const createPayments = async (request: FastifyRequest, reply: FastifyReply) => {
	const body = JSON.parse(request.body as string);
	console.log(body);
	const validatedBody = z.object({
		name: z.string(),
		amount: z.number(),
		code: z.string()
	}).parse(body);

	const newPayment = await db.insert(payments).values({ amount: validatedBody.amount, code: validatedBody.code, name: validatedBody.name }).returning();
	reply.send({ payment: newPayment });
};

export default {
	method: 'POST',
	url: '/payments',
	handler: createPayments,
} as RouteOptions;