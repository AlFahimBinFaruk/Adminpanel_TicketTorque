import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { user_api } from "./services/user_api";
import { category_api } from "./services/category_api";
import { location_api } from "./services/location_api";

const store = configureStore({
  reducer: {
    [user_api.reducerPath]: user_api.reducer,
    [category_api.reducerPath]: category_api.reducer,
    [location_api.reducerPath]: location_api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(user_api.middleware)
      .concat(category_api.middleware)
      .concat(location_api.middleware)
});

setupListeners(store.dispatch);

export default store;
