import React from 'react';
import { PetHomeActionTypes, PetHomeActions } from "../contexts/types";

const registerAnimalAction = (
    animal: any,
    dispatch: React.Dispatch<PetHomeActionTypes>) =>
    dispatch({
        type: PetHomeActions.REGISTER_ANIMAL,
        payload: {
            animal
        }
    });

export const usePetHomeAction = (
    dispatch: React.Dispatch<PetHomeActionTypes>
) => ({
    animals: {
        registerAnimal: (animal: any) => registerAnimalAction(animal, dispatch)
    }
});