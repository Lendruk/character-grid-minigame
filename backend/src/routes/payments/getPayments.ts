import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import { db } from '../../db/db';

const getPayments = async (request: FastifyRequest, reply: FastifyReply) => {
	const payments = await db.query.payments.findMany();

	reply.send({ payments });
};

export default {
	method: 'GET',
	url: '/payments',
	handler:getPayments,
} as RouteOptions;