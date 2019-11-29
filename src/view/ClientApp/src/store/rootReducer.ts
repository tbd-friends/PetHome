import { combineReducers, Reducer } from "redux";
import { AppState, KnownActions } from "./types";
import { reducer as authReducer } from "./Auth/reducer";
import { reducer as layoutReducer } from "./Layout/reducer";
import { reducer as animalsReducer } from "./Animals/reducer";

export const rootReducer: Reducer<AppState, KnownActions> = combineReducers({
  auth: authReducer,
  layout: layoutReducer,
  animals: animalsReducer
});
