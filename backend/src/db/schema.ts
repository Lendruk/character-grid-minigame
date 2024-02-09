import { randomUUID } from 'crypto';
import { InferSelectModel } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const payments = sqliteTable('payments', {
	id: text('id', { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
	name: text('name'),
	amount: integer('amount'),
	code: text('code'),
});

export type Payment = InferSelectModel<typeof payments>;