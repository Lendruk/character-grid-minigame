import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import { db } from '../../db/db';
import { Payments } from '../../lib/models/Payments';

const getPayments = async (_: FastifyRequest, reply: FastifyReply) => {
	const payments = await Payments.getAll(db);
	reply.send({ payments });
};

export default {
	method: 'GET',
	url: '/payments',
	handler:getPayments,
} as RouteOptions;