import { Database } from '../../db/db';
import { StoredGameGrid, storedGameGrids } from '../../db/schema';
import { Vector2 } from '../Vector2';

export class GameGrids {
	public static async new(db: Database,cells: string[], size: Vector2 ): Promise<StoredGameGrid> {
		const newStoredGrid = await db.insert(storedGameGrids).values({ sizeX: size.x, sizeY: size.y, cells: JSON.stringify(cells)}).returning();
		return newStoredGrid[0];
	}
}