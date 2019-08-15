import React, { useReducer } from "react";
import { PetHomeProviderProps, PetHomeState } from "./types";
import { PetHomeActionTypes } from "../reducers/types";

export const PetHomeContext = React.createContext<
  [PetHomeState, React.Dispatch<PetHomeActionTypes>] | []
>([]);

export const PetHomeProvider: React.FC<PetHomeProviderProps> = ({
  reducer,
  initialState,
  children
}) => {
  return (
    <PetHomeContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </PetHomeContext.Provider>
  );
};
