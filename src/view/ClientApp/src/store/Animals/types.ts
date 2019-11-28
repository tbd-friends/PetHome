export interface AnimalsState {}

export enum AnimalsActionTypes {
  FETCH_ANIMALS = "@@animals/FETCH_ANIMALS",
  FETCH_ANIMALS_SUCCESS = "@@animals/FETCH_ANIMALS_SUCCESS",
  FETCH_ANIMALS_FAILED = "@@animals/FETCH_ANIMALS_FAILED"
}

export interface FetchAnimalsAction {
  type: typeof AnimalsActionTypes.FETCH_ANIMALS;
}

export interface FetchAnimalsSuccessAction {
  type: typeof AnimalsActionTypes.FETCH_ANIMALS_SUCCESS;
  payload: {
    animals: any[];
  };
}

export interface FetchAnimalsFailedAction {
  type: typeof AnimalsActionTypes.FETCH_ANIMALS_FAILED;
  payload: {
    error: any;
  };
}

export type AnimalsActions = FetchAnimalsAction;
