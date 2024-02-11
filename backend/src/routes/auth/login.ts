import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { Users } from '../../lib/models/Users';
import { UserSessions } from '../../lib/models/UserSessions';

type LoginBody = {
  name: string;
  password: string;
}

const login = async (request: FastifyRequest, reply: FastifyReply) => {
	const body = request.body as LoginBody;
	try {
		z.object({
			name: z.string(),
			password: z.string()
		}).parse(body);
	} catch(error) {
		reply.status(400).send('Bad request');
		return;
	}

	const user = await Users.getByName(body.name);  
	if (await bcrypt.compare(body.password, user.password)) {
		const newSession = await UserSessions.new(user.id, user.password);
		reply.status(200).send({ token: newSession.token });
	} else {
		reply.status(401).send();
	}
};

export default {
	method: 'POST',
	url: '/login',
	handler: login
} as RouteOptions;