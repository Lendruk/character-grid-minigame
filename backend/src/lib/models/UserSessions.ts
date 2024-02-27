import { eq } from 'drizzle-orm';
import { db } from '../../db/db';
import { UserSession, userSessions } from '../../db/schema';
import { Users } from './Users';
import jwt from 'jsonwebtoken';

export class UserSessions {
	public static async new(userId: string, hashedPassword: string): Promise<UserSession> {
		const token = jwt.sign(userId, hashedPassword);
		return (await db.insert(userSessions).values({ token, userId }).returning())[0];
	}

	public static async getByToken(token: string): Promise<UserSession> {
		const session = await db.query.userSessions.findFirst({ where: eq(userSessions.token, token) });

		if (!session) {
			throw new Error('Session not found');
		}
		return session;
	}

	public static async verifySession(token: string): Promise<boolean> {
		if (!token) {
			return false;
		}
		try {
			const userSession = await UserSessions.getByToken(token);
			const user = await Users.getById(userSession.userId);
			if (jwt.verify(token, user.password)) {
				return true;
			}
		} catch (error) {
			return false;
		}
		return false;
	}

	public static async deleteSession(token: string): Promise<void> {
		await db.delete(userSessions).where(eq(userSessions.token, token));
	}

	public static async deleteAllSessions(): Promise<void> {
		await db.delete(userSessions);
	}
}