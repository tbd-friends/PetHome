import { createSelector } from "reselect";
import { AppState } from "../types";

export const allAnimalsSelector = (state: AppState) =>
  state.animals.animalIds.map(id => state.animals.animalsById[id]);

export const getAnimalSelector = (state: AppState, animalId: string) =>
  state.animals.animalsById[animalId];
