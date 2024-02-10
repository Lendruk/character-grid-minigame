import Fastify from 'fastify';
import wb from '@fastify/websocket';
import cors from '@fastify/cors';
import routes from './routes';
const fastify = Fastify({
	logger: true
});

fastify.register(wb);
fastify.register(cors);

for(const route of routes) {
	fastify.route(route);
}

fastify.listen({ port: 8080, host: '0.0.0.0' }, (err) => {
	if (err) throw err;
});
