import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import { z } from 'zod';
import { gameSessionController } from '../../lib/GameSessionController';
import { checkAuth } from '../../lib/hooks/checkAuth';

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
	preValidation: checkAuth,
	handler: putBias,
} satisfies RouteOptions;