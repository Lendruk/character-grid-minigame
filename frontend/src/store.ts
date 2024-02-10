import { writable } from "svelte/store";
import type { Game } from "./types/Game";
import { buildGameWsUrl } from "./endpoints";

export const gameStore = writable<Game | undefined>();
export const biasStore = writable<string>('');
export const systemTimeStore = writable<number>(0);
const socket = new WebSocket(buildGameWsUrl());

type GameSessionEventData = {
  event: "SESSION" | "END",
  data: {
    game: Game;
    systemTime: number;
  }
}
socket.addEventListener('open', (event) => {
  console.log("Socket open");
});

socket.addEventListener('message', (event) => {
  const sessionData = JSON.parse(event.data) as GameSessionEventData;
  console.log(sessionData);
  if (sessionData.event === "SESSION") {
    gameStore.set(sessionData.data.game);
    systemTimeStore.set(sessionData.data.systemTime);
    if (sessionData.data.game.bias?.biasValue) {
      biasStore.set(sessionData.data.game.bias?.biasValue)
    }
  } else {
    gameStore.set(undefined);
    systemTimeStore.set(0);
    biasStore.set('');
  }
});