import type { Grid } from "./Grid";

type CharacterBias = {
	biasValue: string;
	updatedAt: number;
}

export type Game = {
  grid: Grid;
  code: string;
  id: string;
  bias?: CharacterBias;
}