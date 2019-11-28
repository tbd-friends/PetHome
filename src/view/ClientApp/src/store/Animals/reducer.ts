import { AnimalsState, AnimalsActions } from "./types";
import { Reducer } from "redux";

const initialState: AnimalsState = {};

export const reducer: Reducer<AnimalsState, AnimalsActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};
