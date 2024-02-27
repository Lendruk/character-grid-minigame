import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import { UserSessions } from '../../lib/models/UserSessions';
import { checkAuth } from '../../lib/hooks/checkAuth';

const logout = async (request: FastifyRequest, reply: FastifyReply) => {
	const token = request.headers.authorization!.split(' ')[1];
	await UserSessions.deleteSession(token);

	return reply.send({ message: 'User logged out' });
};

export default {
	method: 'POST',
	url: '/logout',
	preValidation: checkAuth,
	handler: logout
} as RouteOptions;