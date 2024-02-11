import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import { z } from 'zod';
import { gameSessionController } from '../../lib/GameSessionController';

type SetBiasParams = {
  value: string;
}

const putBias = (request: FastifyRequest, reply: FastifyReply) => {
	const params = request.params as SetBiasParams;
	const biasValue = z.string().parse(params.value);

	const isUpdateSuccessful = gameSessionController.setBias(biasValue);

	reply.send({ isUpdateSuccessful});
};

export default {
	method: 'PUT',
	url: '/game/bias/:value',
	handler: putBias,
} satisfies RouteOptions;