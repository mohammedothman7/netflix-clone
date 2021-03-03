import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import loadingReducer from "../features/loadingSlice";
import errorsReducer from "../features/errorsSlice";

export default configureStore(
  {
    reducer: {
      user: userReducer,
      loading: loadingReducer,
      errors: errorsReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
