const BACKEND_BASE_URL = `http://localhost:8080`;
const BACKEND_BASE_WS_URL = `ws://localhost:8080`;

export const buildPaymentsUrl = () => `${BACKEND_BASE_URL}/payments`;
export const buildGamesUrl = () => `${BACKEND_BASE_URL}/game`;
export const buildSetBiasUrl = (bias: string) => `${BACKEND_BASE_URL}/game/bias/${bias}`;
export const buildGameWsUrl = () => `${BACKEND_BASE_WS_URL}/game`;