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

const getAnimalsAction = (dispatch: React.Dispatch<PetHomeActionTypes>) => {
    dispatch({
        type: PetHomeActions.GET_ANIMALS
    });
}
    


export const usePetHomeAction = (
    dispatch: React.Dispatch<PetHomeActionTypes>
) => ({
    animals: {
        getAnimalsAction: () => getAnimalsAction(dispatch),
        registerAnimal: (animal: any) => registerAnimalAction(animal, dispatch)
    }
});