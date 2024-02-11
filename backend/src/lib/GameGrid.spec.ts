import { describe, test, expect, beforeEach, vi } from 'vitest';
import { Vector2 } from './Vector2';
import { GameGrid } from './GameGrid';
import * as crypto from 'node:crypto';

// vi.mock('node:crypto', () => {
//     return {
//         randomInt: vi.fn(), 
//     }
// });
describe('GameGrid', () => {
	const GRID_SIZE: Vector2 = { x: 10, y: 10 };
	let cut: GameGrid;
	describe('refresh', () => {

		describe('there is a bias', () => {
            // let randomIntSpy = vi.spyOn(crypto, 'randomInt');
			beforeEach(() => {
				cut = new GameGrid(GRID_SIZE);
				cut.refresh('t');
			})

			test('there should be 20% characters equal to the bias in the grid', () => {
                expect(cut.countOccurrencesOfCell('t')).toEqual(20);
                // expect(randomIntSpy).toHaveBeenCalledTimes(80);
			})
		})
	})
})