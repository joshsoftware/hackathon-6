import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { fileUploadApi } from "./api";

const rootReducer = combineReducers({
  [fileUploadApi.reducerPath]: fileUploadApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fileUploadApi.middleware),
});

export { store };
