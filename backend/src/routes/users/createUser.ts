import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import { z } from 'zod';
import { Users } from '../../lib/models/Users';
import { UserSessions } from '../../lib/models/UserSessions';

type CreateUserBody = {
  name: string;
  password: string;
}

const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
	const body = request.body as CreateUserBody;
	try {
		z.object({
			name: z.string(),
			password: z.string()
		}).parse(body);
	} catch(error) {
		reply.status(400).send();
	}

	const newUser = await Users.new(body.name, body.password);
	const newSession = await UserSessions.new(newUser.id, newUser.password);
	reply.status(201).send({ user: { name: newUser.name }, token: newSession.token });
};

export default {
	method: 'POST',
	url: '/users',
	handler: createUser
} as RouteOptions;