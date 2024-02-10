import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import { z } from 'zod';
import { gameSession } from '../../lib/GameSession';

type SetBiasParams = {
  value: string;
}

const putBias = (request: FastifyRequest, reply: FastifyReply) => {
	const params = request.params as SetBiasParams;
	const biasValue = z.string().parse(params.value);

	const isUpdateSuccessful = gameSession.setBias(biasValue);

	reply.send({ isUpdateSuccessful});
};

export default {
	method: 'PUT',
	url: '/game/bias/:value',
	handler: putBias,
} satisfies RouteOptions;