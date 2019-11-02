import React, { useReducer } from "react";
import { IPetHomeContext, IPetHomeState } from "./types";
import { petHomeReducer } from "../reducers/petHomeReducer";

const initialState: IPetHomeState = {
  animals: {
    loading: false,
    data: [],
    errors: []
  }
};

export const PetHomeContext = React.createContext<IPetHomeContext>({
  state: initialState,
  dispatch: action => {}
});

export const PetHomeProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(petHomeReducer, initialState);

  return (
    <PetHomeContext.Provider value={{ state, dispatch }}>
      {children}
    </PetHomeContext.Provider>
  );
};
