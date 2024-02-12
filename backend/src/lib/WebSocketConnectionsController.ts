import WebSocket from 'ws';

type WebSocketEvent = {
  event: string;
  data?: Record<string, unknown>;
}

class WebSocketConnectionsController {
	public connections: Set<WebSocket> = new Set();

	public broadcastEvent<T extends WebSocketEvent>(event: T): void {
		const stringifyedEvent = JSON.stringify(event);
		this.connections.forEach((connection) => {
			connection.send(stringifyedEvent);
		});
	}
}

export const webSocketConnectionsController = new WebSocketConnectionsController();