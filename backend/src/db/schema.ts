import { randomUUID } from 'crypto';
import { InferSelectModel } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const payments = sqliteTable('payments', {
	id: text('id', { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
	name: text('name'),
	amount: integer('amount'),
	code: text('code'),
	gridId: text('grid_id').references(() => storedGameGrids.id)
});

export const storedGameGrids = sqliteTable('gameGrids', {
	id:  text('id', { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
	cells: text('cells'),
	sizeX: integer('sizeX'),
	sizeY: integer('sizeY')
});

export type StoredGameGrid = InferSelectModel<typeof storedGameGrids>;
export type Payment = InferSelectModel<typeof payments>;