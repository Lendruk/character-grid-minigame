import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import { Payments } from '../../lib/models/Payments';

const getPayments = async (_: FastifyRequest, reply: FastifyReply) => {
	const payments = await Payments.getAll();
	reply.send({ payments });
};

export default {
	method: 'GET',
	url: '/payments',
	handler:getPayments,
} as RouteOptions;