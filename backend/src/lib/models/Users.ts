import { eq } from 'drizzle-orm';
import { User, users } from '../../db/schema';
import bcrypt from 'bcrypt';
import { db } from '../../db/db';

export class Users {
	public static async new(name: string, password: string): Promise<User> {
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = (await db.insert(users).values({ name, password: hashedPassword }).returning())[0];

		return newUser;
	}

	public static async getByName(name: string): Promise<User> {
		const user = await db.query.users.findFirst({ where: eq(users.name, name) });

		if (!user) {
			throw new Error('User not found');
		}

		return user;
	}

	public static async getById(id: string): Promise<User> {
		const user = await db.query.users.findFirst({ where: eq(users.id, id) });

		if (!user) {
			throw new Error('User not found');
		}

		return user;
	}
}