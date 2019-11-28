import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";

import { rootReducer } from "./rootReducer";
import { authMiddleware } from "./Auth/authMiddleware";

const middleware = [createLogger(), authMiddleware()];

export default () => {
  let store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  return { store };
};
