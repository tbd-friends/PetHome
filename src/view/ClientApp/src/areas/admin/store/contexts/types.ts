import { PetHomeActionTypes } from "../reducers/types";

export interface PetHomeState {}

export interface PetHomeProviderProps {
  reducer: React.Reducer<PetHomeState, PetHomeActionTypes>;
  initialState: PetHomeState;
}
