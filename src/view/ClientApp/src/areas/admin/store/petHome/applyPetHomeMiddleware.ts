import React from 'react';
import { PetHomeActionTypes, PetHomeActions } from '../contexts/types';
import { AnimalQueriesClient } from '../../../../utils/pethome.api';

export const applyPetHomeMiddleware = (
    dispatch: React.Dispatch<PetHomeActionTypes>
) => (action: PetHomeActionTypes) => {
    dispatch(action);
    switch (action.type) {
        case PetHomeActions.REGISTER_ANIMAL:
            {
                fetch("/animal/register", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(action.payload.animal)
                })
                    .then(response => {
                        if (response.status === 200) {
                            return response.text();
                        }
                        throw "Invalid Something";
                    })
                    .then((data: string) => {
                        dispatch({
                            type: PetHomeActions.REGISTER_ANIMAL_SUCCESS,
                            payload: {
                                animal: { ...action.payload.animal, id: data }
                            }
                        });
                    })
                    .catch((error: any) => {
                        dispatch({
                            type: PetHomeActions.REGISTER_ANIMAL_FAILED,
                            payload: {
                                errors: error
                            }
                        });
                    });
            }
            break;
            case PetHomeActions.GET_ANIMALS:
                {
                    const apiClient = new AnimalQueriesClient();
                    apiClient.get().then(
                        animals => {
                            dispatch({
                                type: PetHomeActions.GET_ANIMALS_SUCCESS,
                                payload: {
                                    animals
                                }
                            })
                        }
                    ).catch(error => {
                        dispatch({
                            type: PetHomeActions.GET_ANIMALS_FAILED,
                            payload: {
                                errors: error
                            }
                        })
                    })
                }
                break;
        default:
            return null;
    }
}