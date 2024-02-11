import { beforeEach, describe, expect, test, vi } from 'vitest';
import { Game } from './Game';
import { Vector2 } from './Vector2';

describe('Game', () => {
	const MOCK_GRID_SIZE: Vector2 = { x: 10, y: 10 };
	let cut: Game;

	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('updateCharacterBias', () => {
		beforeEach(() => {
			vi.useFakeTimers();
		});

		describe('update succeeds', () => {
			let updateResult: boolean;
			beforeEach(() => {
				cut = new Game(MOCK_GRID_SIZE);
				updateResult = cut.updateCharacterBias('a');
			});

			test('update succeeds', () => {
				expect(updateResult).toEqual(true);
			});

			test('the character should be updated', () => {
				expect(cut.bias).toEqual(expect.objectContaining({ biasValue: 'a' }));
			});
		});

		describe('update fails due to rate limit', () => {
			let updateResult: boolean;
			beforeEach(() => {
				cut = new Game(MOCK_GRID_SIZE);
				cut.updateCharacterBias('a');
				vi.advanceTimersByTime(2000);
				updateResult = cut.updateCharacterBias('b');
			});

			test('update fails', () => {
				expect(updateResult).toEqual(false);
			});

			test('the character should be the first one set', () => {
				expect(cut.bias).toEqual(expect.objectContaining({ biasValue: 'a' }));
			});
		});
	});
});