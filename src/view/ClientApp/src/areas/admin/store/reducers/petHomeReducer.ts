import React from "react";
import { PetHomeActionTypes } from "./types";
import { PetHomeState } from "../contexts/types";

export const petHomeReducer: React.Reducer<PetHomeState, PetHomeActionTypes> = (
  state,
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};
