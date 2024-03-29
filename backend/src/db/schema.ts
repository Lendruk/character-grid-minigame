import { randomUUID } from 'crypto';
import { InferSelectModel, relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const payments = sqliteTable('payments', {
	id: text('id', { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
	name: text('name').notNull(),
	amount: integer('amount').notNull(),
	code: text('code').notNull(),
	gridId: text('grid_id').notNull().references(() => storedGameGrids.id)
});

export const paymentGridRelation = relations(payments, ({ one }) => ({
	grid: one(storedGameGrids, {
		fields: [payments.gridId],
		references: [storedGameGrids.id]
	})
}));

export const storedGameGrids = sqliteTable('gameGrids', {
	id: text('id', { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
	cells: text('cells').notNull(),
	sizeX: integer('sizeX').notNull(),
	sizeY: integer('sizeY').notNull()
});

export const users = sqliteTable('users', {
	id: text('id', { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
	name: text('name').unique().notNull(),
	password: text('password').notNull(),
});

export const userSessions = sqliteTable('userSessions', {
	userId: text('id', { length: 36 }).primaryKey(),
	token: text('token').notNull(),
});

export type User = InferSelectModel<typeof users>;
export type UserSession = InferSelectModel<typeof userSessions>;
export type StoredGameGrid = InferSelectModel<typeof storedGameGrids>;
export type Payment = InferSelectModel<typeof payments> & { grid: StoredGameGrid };
