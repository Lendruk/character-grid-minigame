import { FastifyReply, FastifyRequest } from 'fastify';
import { UserSessions } from '../models/UserSessions';

export const checkAuth = async (request: FastifyRequest, reply: FastifyReply) => {
	const authorization = request.headers.authorization;
	if (!authorization) {
		return reply.status(401).send();
	} else {
		try {
			const token = authorization.split(' ')[1];

			if (!UserSessions.verifySession(token)) {
				return reply.status(401).send();
			}
		} catch (error) {
			return reply.status(500).send();
		}
	}
};