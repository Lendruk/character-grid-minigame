import { Game } from '../lib/Game';

class GameRegistry {
	private sessions: Map<string, Game>;

	public constructor() {
		this.sessions = new Map();
	}

	public addSession(game: Game): void {
		this.sessions.set(game.getId(), game);
	}

	public getSession(gameId: string): Game | undefined {
		return this.sessions.get(gameId);
	}
}

export const gameRegistry = new GameRegistry();