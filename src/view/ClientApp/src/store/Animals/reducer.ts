import {
  AnimalsState,
  AnimalsActions,
  AnimalsActionTypes,
  AnimalsDictionary
} from "./types";
import { Reducer } from "redux";

const initialState: AnimalsState = {
  animalsById: {},
  animalIds: []
};

export const reducer: Reducer<AnimalsState, AnimalsActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AnimalsActionTypes.FETCH_ANIMALS_SUCCESS: {
      return {
        ...state,
        animalsById: action.payload.animals.reduce<AnimalsDictionary>(
          (acc, animal) => {
            acc[animal.id] = animal;
            return acc;
          },
          {}
        ),
        animalIds: action.payload.animals.map(e => e.id)
      };
    }
    case AnimalsActionTypes.FETCH_ANIMAL_SUCCESS: {
      return {
        ...state,
        animalsById: {
          ...state.animalsById,
          [action.payload.animal.id]: action.payload.animal
        },
        animalIds: state.animalIds.includes(action.payload.animal.id)
          ? state.animalIds
          : [...state.animalIds, action.payload.animal.id]
      };
    }
    default:
      return state;
  }
};
