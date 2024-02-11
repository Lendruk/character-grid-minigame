import WebSocket from 'ws';
import { Game } from './Game';
import { Vector2 } from './Vector2';

export type GameSession = {
	game: Game;
	systemTime: number;
}

class GameSessionController {
	private static readonly GAME_REFRESH_RATE = 2000;
	private static readonly GAME_GRID_SIZE: Vector2 = { x: 10, y: 10 };
	private currentGame?: Game;
	private systemTime: number = 0;
	private intervalId!: NodeJS.Timeout;
	public connections: Set<WebSocket> = new Set();

	public startSession(bias?: string): void {
		const game: Game = new Game(GameSessionController.GAME_GRID_SIZE);
		this.currentGame = game;
		this.refresh(bias);

		this.intervalId = setInterval(() => {
			console.log('game update');
			this.refresh();
		}, GameSessionController.GAME_REFRESH_RATE);
	}

	public getCurrentSession(): GameSession {
		if(!this.currentGame) {
			throw new Error('No game in progress');
		}

		return { game: this.currentGame, systemTime: this.systemTime };
	}

	public stopSession(): void {
		clearInterval(this.intervalId);
		this.currentGame = undefined;
		this.connections.forEach((connection) => {
			connection.send(JSON.stringify({ event: 'END' }));
		});
	}

	public setGame(game: Game): void {
		this.currentGame = game;
	}

	public setBias(bias: string): boolean {
		if(this.currentGame) {
			return this.currentGame?.updateCharacterBias(bias);
		}
		return false;
	}
	
	public getGame(): Game | undefined {
		return this.currentGame;
	}

	public hasGame(): boolean {
		return !!this.currentGame;
	}

	private refresh(bias?: string): void {
		const currentDate = new Date();
		this.systemTime = currentDate.getTime();
		this.currentGame?.refresh(currentDate.getSeconds(), bias);
		this.broadcastUpdate();
	}

	private broadcastUpdate(): void {
		this.connections.forEach((connection) => {
			connection.send(JSON.stringify({ event: 'SESSION', data: this.getCurrentSession() }));
		});
	}
}

export const gameSessionController = new GameSessionController();