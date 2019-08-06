export enum PetHomeActions {
  FETCH_ANIMALS = "@@pethome/FETCH_ANIMALS"
}

export interface FetchAnimalsAction {
  type: typeof PetHomeActions.FETCH_ANIMALS;
}

export type PetHomeActionTypes = FetchAnimalsAction;
