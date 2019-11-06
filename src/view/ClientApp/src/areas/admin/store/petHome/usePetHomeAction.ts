import React from "react";
import { PetHomeActionTypes, PetHomeActions } from "../contexts/types";
import { AnimalQueriesClient } from "../../../../utils/pethome.api";

export const registerAnimalAction = (
  animal: any,
  dispatch: React.Dispatch<PetHomeActionTypes>
) => {
  dispatch({
    type: PetHomeActions.REGISTER_ANIMAL,
    payload: {
      animal
    }
  });
  fetch("/animal/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(animal)
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
          animal: { ...animal, id: data }
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
};

export const getAnimalsAction = (
  dispatch: React.Dispatch<PetHomeActionTypes>
) => {
  dispatch({
    type: PetHomeActions.GET_ANIMALS
  });
  const baseUrl = process.env.REACT_APP_BASE_URL || "https://localhost:5001";
  const apiClient = new AnimalQueriesClient(baseUrl);
  apiClient
    .get()
    .then(animals => {
      dispatch({
        type: PetHomeActions.GET_ANIMALS_SUCCESS,
        payload: {
          animals
        }
      });
    })
    .catch(error => {
      dispatch({
        type: PetHomeActions.GET_ANIMALS_FAILED,
        payload: {
          errors: error
        }
      });
    });
};
