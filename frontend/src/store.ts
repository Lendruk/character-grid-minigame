import { get, writable } from 'svelte/store';
import type { Game } from './types/Game';
import { buildGameWsUrl } from './endpoints';
import { ConnectionStatus } from './types/ConnectionStatus';
import type { UserSession } from './types/UserSession';
import type { Payment } from './types/Payment';
import { toast } from '@zerodevx/svelte-toast';

export const gameStore = writable<Game | undefined>();
export const biasStore = writable<string>('');
export const systemTimeStore = writable<number>(0);
export const backendConnectionStatusStore = writable<ConnectionStatus>(ConnectionStatus.CONNECTING);
export const userSessionStore = writable<UserSession | undefined>();
export const paymentStore = writable<Payment[]>([]);
const socket = new WebSocket(buildGameWsUrl());

type NewPaymentWSEvent = {
	event: 'NEW_PAYMENT',
	data: Payment
}

type GameSessionWSEvent = {
	event: 'SESSION',
	data: {
		game: Game;
		systemTime: number;
	}
}

socket.addEventListener('open', () => {
	backendConnectionStatusStore.set(ConnectionStatus.CONNECTED);
});

socket.addEventListener('close', () => {
	backendConnectionStatusStore.set(ConnectionStatus.DISCONNECTED);
});

socket.addEventListener('message', (event) => {
	const sessionData = JSON.parse(event.data);
	if ('event' in sessionData) {
		if (sessionData.event === 'SESSION') {
			const gameSessionEvent = sessionData as GameSessionWSEvent;
			gameStore.set(gameSessionEvent.data.game);
			systemTimeStore.set(gameSessionEvent.data.systemTime);
			if (gameSessionEvent.data.game.bias?.biasValue) {
				biasStore.set(gameSessionEvent.data.game.bias?.biasValue);
			}
		} else if (sessionData.event === 'SESSION_END') {
			gameStore.set(undefined);
			systemTimeStore.set(0);
			biasStore.set('');
		} else if (sessionData.event === 'NEW_PAYMENT') {
			const newPaymentEvent = sessionData as NewPaymentWSEvent;
			paymentStore.set(get(paymentStore).concat(newPaymentEvent.data));
			toast.push('New payment has been added!');
		}
	}
});