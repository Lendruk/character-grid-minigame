const BACKEND_BASE_URL = `http://localhost:8080`;

export const buildPaymentsUrl = () => `${BACKEND_BASE_URL}/payments`;
export const buildGamesUrl = () => `${BACKEND_BASE_URL}/game`;
export const buildGameUrl = (gameId: string) => `${BACKEND_BASE_URL}/game/${gameId}`;