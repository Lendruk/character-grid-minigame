import { describe, test, expect, beforeEach, vi } from 'vitest';
import { Vector2 } from './Vector2';
import { GameGrid } from './GameGrid';
import * as crypto from 'node:crypto';

vi.mock('node:crypto', async () => {
	const mod = await vi.importActual<typeof import('node:crypto')>('node:crypto');
	return {
		randomInt: vi.fn().mockImplementation((min, max) => mod.randomInt(min, max)),
	};
});
describe('GameGrid', () => {
	const GRID_SIZE: Vector2 = { x: 10, y: 10 };
	let cut: GameGrid;

	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('refresh', () => {
		const randomIntSpy = vi.spyOn(crypto, 'randomInt');

		describe('there is a bias', () => {
			beforeEach(() => {
				cut = new GameGrid(GRID_SIZE);
				cut.refresh('t');
			});

			test('generates the characters at random', () => {
				expect(randomIntSpy).toHaveBeenCalled();
			});

			test('there should be 20% characters equal to the bias in the grid', () => {
				expect(cut.countOccurrencesOfCell('t')).toEqual(20);
			});
		});

		describe('there is no bias', () => {
			beforeEach(() => {
				cut = new GameGrid(GRID_SIZE);
				cut.refresh();
			});

			test('generates width * height amount of characters', () => {
				expect(randomIntSpy).toHaveBeenCalledTimes(GRID_SIZE.x * GRID_SIZE.y);
			});
		});
	});
});