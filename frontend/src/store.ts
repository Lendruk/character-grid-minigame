import { writable } from "svelte/store";
import type { Game } from "./types/Game";

export const gameStore = writable<Game | undefined>();

export const pollingIntervalIdStore = writable<number>(0);
export const systemTimeStore = writable<number>(0);