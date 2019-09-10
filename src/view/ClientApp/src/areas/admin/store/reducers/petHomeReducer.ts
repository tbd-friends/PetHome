import React from "react";
import { PetHomeActionTypes, PetHomeActions } from "./types";
import { PetHomeState } from "../contexts/types";

export const petHomeReducer: React.Reducer<PetHomeState, PetHomeActionTypes> = (
  state,
  action
) => {
  switch (action.type) {
    case PetHomeActions.REGISTER_ANIMAL:
      return { ...state, animal: action.payload };
    default:
      return state;
  }
};
