//port { PetHomeActionTypes } from "../reducers/types";

export interface IPetHomeState {
    animals: AnimalState;
}

export interface IPetHomeContext {
    pethomeState: IPetHomeState;
    dispatch?: React.Dispatch<PetHomeActionTypes>;
    actions: {
        animals: {
            registerAnimal: (animal: any) => void;
        }
    }
}

export interface AnimalState {
    loading: boolean;
    data: any[];
    errors?: string[];
}

export enum PetHomeActions {
    REGISTER_ANIMAL = "@@animal/REGISTER_ANIMAL",
    REGISTER_ANIMAL_SUCCESS = "@@animal/REGISTER_ANIMAL_SUCCESS",
    REGISTER_ANIMAL_FAILED = "@@animal/REGISTER_ANIMAL_FAILED"
}

export interface AnimalRegisterAction {
    type: typeof PetHomeActions.REGISTER_ANIMAL;
    payload: {
        animal: any;
    }
}

export interface AnimalRegisterSuccessAction {
    type: typeof PetHomeActions.REGISTER_ANIMAL_SUCCESS;
    payload: {
        animal: any;
    }
}

export interface AnimalRegisterFailedAction {
    type: typeof PetHomeActions.REGISTER_ANIMAL_FAILED;
    payload: {
        errors: any
    }
}

export type PetHomeActionTypes = AnimalRegisterAction |
    AnimalRegisterSuccessAction |
    AnimalRegisterFailedAction;