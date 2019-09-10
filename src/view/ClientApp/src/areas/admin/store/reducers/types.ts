export enum PetHomeActions {
  FETCH_ANIMALS = "@@pethome/FETCH_ANIMALS",
  REGISTER_ANIMAL = "@@pethome/REGISTER_ANIMAL"
}

export interface FetchAnimalsAction {
  type: typeof PetHomeActions.FETCH_ANIMALS;
}

export interface RegisterAnimalAction {
  type: typeof PetHomeActions.REGISTER_ANIMAL;
  payload: {
    breed: string;
    gender: string;
  };
}

export type PetHomeActionTypes = FetchAnimalsAction | RegisterAnimalAction;
