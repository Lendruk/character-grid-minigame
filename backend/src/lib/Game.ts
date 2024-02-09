import { randomUUID } from 'crypto';
import { GameGrid } from './GameGrid';
import { Vector2 } from './Vector2';

type CharacterBias = {
	biasValue: string;
	updatedAt: number;
}

export class Game {
	private static readonly CHARACTER_BIAS_REFRESH_TIME = 4000;
	private grid: GameGrid;

	private id: string;

	private code: string;

	public bias?: CharacterBias;

	public constructor(gridSize: Vector2) {
		this.id = randomUUID();
		this.grid = new GameGrid(gridSize);
		this.grid.refresh();
		this.bias = undefined;
		this.code = '';
	}

	public getId(): string {
		return this.id;
	}

	/**
	 * Refreshes the game by recalculating the game grid
	 * @param systemSeconds the current system seconds
	 * @param bias an optional character to be used as a weighted bias
	 */
	public refresh(systemSeconds: number,bias?: string): void {
		if(bias) {
			this.updateCharacterBias(bias);
		}
		this.grid.refresh(this.bias?.biasValue);
		this.code = this.calculateNewCode(systemSeconds);
	}

	/**
	 * Calculates a new secret code according to the current system seconds
	 * @param systemSeconds the current system seconds
	 * @returns a new secret code
	 */
	private calculateNewCode(systemSeconds: number): string {
		const mappedSystemSeconds = this.mapSystemSeconds(systemSeconds);
		const first_cell = this.grid.getCellAt({ x: mappedSystemSeconds[0] , y: mappedSystemSeconds[1] });
		const second_cell = this.grid.getCellAt({ x: mappedSystemSeconds[1], y: mappedSystemSeconds[0] });
		let first_cell_occurrences = this.grid.countOccurrencesOfCell(first_cell);
		let second_cell_occurrences = this.grid.countOccurrencesOfCell(second_cell);

		if (first_cell_occurrences > 9) {
			first_cell_occurrences = this.lowerValue(first_cell_occurrences);
		}

		if (second_cell_occurrences > 9) {
			second_cell_occurrences = this.lowerValue(second_cell_occurrences);
		}
    
		return `${first_cell_occurrences}${second_cell_occurrences}`;
	}

	/**
	 * Updates the character bias in the game, taking into the consideration the 4 second throttle
	 * @param bias a new character bias
	 */
	private updateCharacterBias(bias: string): void {
		if(!this.bias || (this.bias && Date.now() - this.bias.updatedAt > Game.CHARACTER_BIAS_REFRESH_TIME)) {
			this.bias = {
				biasValue: bias,
				updatedAt: Date.now(),
			};
		}
	}

	/**
	 * Maps the raw system seconds returned from the date `getSeconds` method into a tuple
	 * @param systemSeconds the current system seconds
	 * @returns the mapped tuple contained both digits
	 */
	private mapSystemSeconds(systemSeconds: number): [number, number] {
		const stringifiedSeconds = systemSeconds.toString();
		const first_digit = Number.parseInt(stringifiedSeconds.charAt(0));
		const second_digit = Number.parseInt(stringifiedSeconds.charAt(1));
		return [first_digit, second_digit];
	}

	private lowerValue(value: number, denominator: number = 2): number {
		if (value > 9) {
			return this.lowerValue(value / denominator, denominator + 1);
		}
		return Math.round(value);
	}
}