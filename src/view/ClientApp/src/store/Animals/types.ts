import {
  AnimalSummary,
  AnimalDetails,
  RegisterAnimalInputModel,
  UpdateAnimalInputModel
} from "../../utils/pethome.api";

export type Animal = AnimalSummary | AnimalDetails;

export interface AnimalsDictionary {
  [key: string]: Animal;
}

export interface AnimalsState {
  animalsById: AnimalsDictionary;
  animalIds: string[];
}

export enum AnimalsActionTypes {
  FETCH_ANIMALS = "@@animals/FETCH_ANIMALS",
  FETCH_ANIMALS_SUCCESS = "@@animals/FETCH_ANIMALS_SUCCESS",
  FETCH_ANIMALS_FAILED = "@@animals/FETCH_ANIMALS_FAILED",
  FETCH_ANIMAL = "@@animals/FETCH_ANIMAL",
  FETCH_ANIMAL_SUCCESS = "@@animals/FETCH_ANIMAL_SUCCESS",
  FETCH_ANIMAL_FAILED = "@@animals/FETCH_ANIMAL_FAIELD",
  REGISTER_ANIMAL = "@@animals/REGISTER_ANIMAL",
  REGISTER_ANIMAL_SUCCESS = "@@animals/REGISTER_ANIMAL_SUCCESS",
  REGISTER_ANIMAL_FAILED = "@@animals/REGISTER_ANIMAL_FAILED",
  UPDATE_ANIMAL = "@@animals/UDPATE_ANIMAL",
  UPDATE_ANIMAL_SUCCESS = "@@animals/UDPATE_ANIMAL_SUCCESS",
  UDPATE_ANIMAL_FAILED = "@@animals/UDPATE_ANIMAL_FAILED"
}

export interface FetchAnimalsAction {
  type: typeof AnimalsActionTypes.FETCH_ANIMALS;
}

export interface FetchAnimalsSuccessAction {
  type: typeof AnimalsActionTypes.FETCH_ANIMALS_SUCCESS;
  payload: {
    animals: Animal[];
  };
}

export interface FetchAnimalsFailedAction {
  type: typeof AnimalsActionTypes.FETCH_ANIMALS_FAILED;
  payload: {
    error: any;
  };
}

export interface FetchAnimalAction {
  type: typeof AnimalsActionTypes.FETCH_ANIMAL;
  payload: {
    animalId: string;
  };
}

export interface FetchAnimalSuccessAction {
  type: typeof AnimalsActionTypes.FETCH_ANIMAL_SUCCESS;
  payload: {
    animal: Animal;
  };
}

export interface FetchAnimalFailedAction {
  type: typeof AnimalsActionTypes.FETCH_ANIMAL_FAILED;
  payload: {
    error: any;
  };
}

export interface RegisterAnimalAction {
  type: typeof AnimalsActionTypes.REGISTER_ANIMAL;
  payload: {
    newAnimal: RegisterAnimalInputModel;
  };
}

export interface RegisterAnimalSuccessAction {
  type: typeof AnimalsActionTypes.REGISTER_ANIMAL_SUCCESS;
  payload: {
    animalId: string;
  };
  meta: {
    animal: RegisterAnimalInputModel;
  };
}

export interface RegisterAnimalFailedAction {
  type: typeof AnimalsActionTypes.REGISTER_ANIMAL_FAILED;
  payload: {
    error: any;
  };
}

export interface UpdateAnimalAction {
  type: typeof AnimalsActionTypes.UPDATE_ANIMAL;
  payload: {
    id: string;
    animal: UpdateAnimalInputModel;
  };
}

export interface UpdateAnimalSuccessAction {
  type: typeof AnimalsActionTypes.UPDATE_ANIMAL_SUCCESS;
  payload: {
    id: string;
    animal: UpdateAnimalInputModel;
  };
}

export interface UpdateAnimalFailedAction {
  type: typeof AnimalsActionTypes.UDPATE_ANIMAL_FAILED;
  payload: {
    error: any;
  };
}

export type AnimalsActions =
  | FetchAnimalsAction
  | FetchAnimalsSuccessAction
  | FetchAnimalsFailedAction
  | FetchAnimalAction
  | FetchAnimalSuccessAction
  | FetchAnimalFailedAction
  | RegisterAnimalAction
  | RegisterAnimalSuccessAction
  | RegisterAnimalFailedAction
  | UpdateAnimalAction
  | UpdateAnimalSuccessAction
  | UpdateAnimalFailedAction;
