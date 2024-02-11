import { eq } from 'drizzle-orm';
import { Database, db } from '../../db/db';
import { Payment, payments } from '../../db/schema';

export class Payments {
	public static async new(db: Database, amount: number, code: string, name: string, gridId: string): Promise<Payment> {
		const newPayment = await db.insert(payments).values({ amount, code, name, gridId }).returning();
		return Payments.getById(newPayment[0].id);
	}

	public static async getById(id: string): Promise<Payment> {
		const payment = await db.query.payments.findFirst({ where: eq(payments.id, id ), with: { grid: true } });
		if(!payment) {
			throw new Error(`Payment with id ${id} not found`);
		}
		return payment;
	}

	public static async getAll(db: Database): Promise<Payment[]> {
		return db.query.payments.findMany({ with: { grid: true }});
	}
}