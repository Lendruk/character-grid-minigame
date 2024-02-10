import Fastify from 'fastify';
import wb from '@fastify/websocket';
import cors from '@fastify/cors';
import routes from './routes';
import { gameSession } from './lib/GameSession';

const app = Fastify({
	logger: true
});

app.register(wb);
app.register(cors);

for(const route of routes) {
	app.register(async function (fastify) {
		fastify.route(route);
	});
}

app.register(async (fastify) => {
	fastify.websocketServer.on('connection', (client) => {
		console.log('connection open');
		gameSession.connections.add(client);
		client.on('close', () => {
			console.log('connection closed');
			gameSession.connections.delete(client);
		});
	});
});

app.listen({ port: 8080, host: '0.0.0.0' }, (err) => {
	if (err) throw err;
});
