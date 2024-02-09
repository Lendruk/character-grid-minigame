import { randomInt } from 'crypto';
import { Vector2 } from './Vector2';

export class GameGrid {
	private static readonly BIAS_WEIGHT = 0.2;
	/**
	 * 2D grid represented as a row major order 1D array
	 * Represented this way to make bias calculations during `refresh` more simple
	 */
	private cells: string[];
	public size: Vector2;

	public constructor(size: Vector2) {
		this.size = size;
		this.cells = [];
	}
  
	public getCells(): string[] {
		return this.cells;
	}

	public getCellAt(location: Vector2): string {
		return this.cells[this.size.x * location.y + location.x];
	}

	public countOccurrencesOfCell(cell: string): number {
		let count = 0;
		this.cells.forEach((cellValue) => {
			if (cellValue == cell) {
				count += 1;
			}
		});
		return count;
	}

	/**
	 * Refreshes the grid cells with new characters.
	 * If a bias is passed to this method, a percentage of all characters in the grid will
	 * be that character according to the `BIAS_WEIGHT` constant
	 * @param bias optional bias character
	 */
	public refresh(bias?: string): void {
		const biasPositions: Set<number> = new Set();
		if (bias) {
			const totalPositions = Math.round(this.size.x * this.size.y * GameGrid.BIAS_WEIGHT);
			while(biasPositions.size < totalPositions) {
				biasPositions.add(this.size.x * randomInt(0, this.size.x) + randomInt(0, this.size.y));
			}
		}

		for (let x = 0; x < this.size.x; x++) {
			for(let y = 0; y < this.size.y; y++) {
				const currentIndex = this.size.x * y + x;
				if (biasPositions.has(currentIndex)) {
					this.cells[currentIndex] = bias!;
				} else{
					this.cells[this.size.x * y + x] = this.generateRandomAscii(bias);
				}
			}
		}
	}

	/**
	 * Generates a random ascii character that fits in the a-z range
	 * Takes into consideration that there might be an unwanted character (i.e. bias character)
	 * @param unwantedChar a character to be ignore from the range
	 * @returns the random ascii character
	 */
	private generateRandomAscii(unwantedChar?:string): string {
		// Ascii table maps nicely to a random number generator
		let randomAscii = randomInt(97, 123);
		if (unwantedChar) {
			const charCode = unwantedChar.codePointAt(0);
			if (charCode == randomAscii) {
				while(charCode == randomAscii) {
					randomAscii  = randomInt(97, 123);
				}
			}
		}

		return  String.fromCharCode(randomAscii);
	}
  
}