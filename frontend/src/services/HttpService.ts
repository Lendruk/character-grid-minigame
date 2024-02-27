import { get } from 'svelte/store';
import { userSessionStore } from '../store';

export class HttpService {

	private static buildHeaders(): Record<string, string> {
		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
		};

		const session = get(userSessionStore);

		if (session) {
			headers['Authorization'] = `Bearer ${session.token}`;
		}

		return headers;
	}
	public static async get<T>(url: string): Promise<T> {
		const response = await fetch(url, {
			method: 'GET',
			headers: HttpService.buildHeaders(),
		});

		if (response.status >= 400) {
			throw new Error(`Error during request status: ${response.status}`);
		}

		return response.json() as Promise<T>;
	}

	public static async post<T>(url: string, body: Record<string, unknown>): Promise<T> {
		const response = await fetch(url, {
			method: 'POST',
			headers: HttpService.buildHeaders(),
			body: JSON.stringify(body),
		});

		if (response.status >= 400) {
			throw new Error(`Error during request status: ${response.status}`);
		}

		return response.json() as Promise<T>;
	}

	public static async put<T>(url: string, body: Record<string, unknown>): Promise<T> {
		const response = await fetch(url, {
			method: 'PUT',
			headers: HttpService.buildHeaders(),
			body: JSON.stringify(body),
		});

		if (response.status >= 400) {
			throw new Error(`Error during request status: ${response.status}`);
		}

		return response.json() as Promise<T>;
	}

	public static async delete<T>(url: string, body?: Record<string, unknown>): Promise<T> {
		const response = await fetch(url, {
			method: 'DELETE',
			headers: HttpService.buildHeaders(),
			body: JSON.stringify(body),
		});

		if (response.status >= 400) {
			throw new Error(`Error during request status: ${response.status}`);
		}

		return response.json() as Promise<T>;
	}
}