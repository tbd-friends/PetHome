import { IAnimalSummary } from "../../../../utils/pethome.api";

//port { PetHomeActionTypes } from "../reducers/types";

export interface IPetHomeState {
  animals: AnimalState;
}

export interface IPetHomeContext {
  state: IPetHomeState;
  dispatch: React.Dispatch<PetHomeActionTypes>;
}

export interface AnimalState {
  loading: boolean;
  data: any[];
  errors?: string[];
}

export enum PetHomeActions {
  REGISTER_ANIMAL = "@@animal/REGISTER_ANIMAL",
  REGISTER_ANIMAL_SUCCESS = "@@animal/REGISTER_ANIMAL_SUCCESS",
  REGISTER_ANIMAL_FAILED = "@@animal/REGISTER_ANIMAL_FAILED",
  GET_ANIMALS = "@@animal/GET_ANIMALS",
  GET_ANIMALS_SUCCESS = "@@animal/GET_ANIMALS_SUCCESS",
  GET_ANIMALS_FAILED = "@@animal/GET_ANIMALS_FAILED",
  GET_ANIMAL_DETAIL = "@@animal/GET_DETAIL",
  GET_ANIMAL_DETAIL_SUCCESS = "@@animal/GET_ANIMAL_DETAIL_SUCCESS",
  GET_ANIMAL_DETAIL_FAILED = "@@animal/GET_ANIMAL_DETAIL_FAILURE"
}

export interface AnimalRegisterAction {
  type: typeof PetHomeActions.REGISTER_ANIMAL;
  payload: {
    animal: any;
  };
}

export interface AnimalRegisterSuccessAction {
  type: typeof PetHomeActions.REGISTER_ANIMAL_SUCCESS;
  payload: {
    animal: any;
  };
}

export interface AnimalRegisterFailedAction {
  type: typeof PetHomeActions.REGISTER_ANIMAL_FAILED;
  payload: {
    errors: any;
  };
}

export interface GetAnimalsAction {
  type: typeof PetHomeActions.GET_ANIMALS;
}

export interface GetAnimalsSuccessAction {
  type: typeof PetHomeActions.GET_ANIMALS_SUCCESS;
  payload: {
    animals: IAnimalSummary[];
  };
}

export interface GetAnimalsFailedAction {
  type: typeof PetHomeActions.GET_ANIMALS_FAILED;
  payload: {
    errors: any;
  };
}

export interface GetAnimalDetailAction {
  type: typeof PetHomeActions.GET_ANIMAL_DETAIL;
  payload: {
    id: string;
  }
}

export interface GetAnimalDetailSuccessAction {
  type: typeof PetHomeActions.GET_ANIMAL_DETAIL_SUCCESS;
  payload: {
    animal: IAnimalSummary;
  }
}

export interface GetAnimalDetailFailedAction {
  type: typeof PetHomeActions.GET_ANIMAL_DETAIL_FAILED;
  payload: {
    errors: any;
  }
}

export type PetHomeActionTypes =
  | AnimalRegisterAction
  | AnimalRegisterSuccessAction
  | AnimalRegisterFailedAction
  | GetAnimalsAction
  | GetAnimalsSuccessAction
  | GetAnimalsFailedAction
  | GetAnimalDetailAction
  | GetAnimalDetailSuccessAction
  | GetAnimalDetailFailedAction;  
