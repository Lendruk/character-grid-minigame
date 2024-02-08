import Fastify from 'fastify';
const fastify = Fastify({
	logger: true
});

fastify.get('/', (request, reply) => {
	reply.send({ hello: 'world' });
});

fastify.get('/api', (request, reply) => {
	reply.send({ hello: 'world2' });
});


fastify.listen({ port: 8080, host: "localhost" }, (err, address) => {
	if (err) throw err;
});