import { Middleware, MiddlewareAPI, Dispatch } from "redux";
import { KnownActions, AppState } from "../types";
import { AnimalsActionTypes, AnimalsActions } from "./types";
import {
  AnimalQueriesClient,
  RegisterAnimalInputModel,
  AnimalCommandsClient,
  UpdateAnimalInputModel
} from "../../utils/pethome.api";

export const createAnimalMiddleware = (): Middleware => {
  return ({ dispatch }: MiddlewareAPI<Dispatch<KnownActions>, AppState>) => (
    next: Dispatch
  ) => (action: KnownActions) => {
    switch (action.type) {
      case AnimalsActionTypes.FETCH_ANIMALS: {
        getAnimals()(dispatch);
        break;
      }
      case AnimalsActionTypes.FETCH_ANIMAL: {
        getAnimal(action.payload.animalId)(dispatch);
        break;
      }
      case AnimalsActionTypes.REGISTER_ANIMAL: {
        registerAnimal(action.payload.newAnimal)(dispatch);
        break;
      }
      case AnimalsActionTypes.UPDATE_ANIMAL: {
        updateAnimal(action.payload.id, action.payload.animal)(dispatch);
        break;
      }
    }
    next(action);
  };
};

const getAnimals = () => async (dispatch: Dispatch<AnimalsActions>) => {
  const animalQueryClient = new AnimalQueriesClient();
  animalQueryClient
    .getAll()
    .then(result => {
      dispatch({
        type: AnimalsActionTypes.FETCH_ANIMALS_SUCCESS,
        payload: {
          animals: result
        }
      });
    })
    .catch(err => {
      dispatch({
        type: AnimalsActionTypes.FETCH_ANIMALS_FAILED,
        payload: {
          error: err
        }
      });
    });
};

const getAnimal = (animalId: string) => async (
  dispatch: Dispatch<AnimalsActions>
) => {
  const animalQueryClient = new AnimalQueriesClient();
  animalQueryClient
    .get(animalId)
    .then(result => {
      dispatch({
        type: AnimalsActionTypes.FETCH_ANIMAL_SUCCESS,
        payload: {
          animal: result
        }
      });
    })
    .catch(err => {
      dispatch({
        type: AnimalsActionTypes.FETCH_ANIMAL_FAILED,
        payload: {
          error: err
        }
      });
    });
};

const registerAnimal = (animal: RegisterAnimalInputModel) => async (
  dispatch: Dispatch<AnimalsActions>
) => {
  const animalCommandClient = new AnimalCommandsClient();
  animalCommandClient
    .registerNewAnimal(animal)
    .then(result => {
      dispatch({
        type: AnimalsActionTypes.REGISTER_ANIMAL_SUCCESS,
        payload: { animalId: result },
        meta: { animal }
      });
    })
    .catch(err =>
      dispatch({
        type: AnimalsActionTypes.REGISTER_ANIMAL_FAILED,
        payload: { error: err }
      })
    );
};

const updateAnimal = (id: string, animal: UpdateAnimalInputModel) => async (
  dispatch: Dispatch<AnimalsActions>
) => {
  const animalCommandClient = new AnimalCommandsClient();
  animalCommandClient
    .updateAnimal(id, animal)
    .then(_ => {
      dispatch({
        type: AnimalsActionTypes.UPDATE_ANIMAL_SUCCESS,
        payload: { id, animal }
      });
    })
    .catch(err => {
      dispatch({
        type: AnimalsActionTypes.UDPATE_ANIMAL_FAILED,
        payload: { error: err }
      });
    });
};
