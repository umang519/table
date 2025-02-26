import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./userApi"; 
import { adminApi } from "./adminApi";
import { traineeApi } from "./traineeApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [traineeApi.reducerPath]: traineeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware, 
      adminApi.middleware, 
      traineeApi.middleware
    ), // ✅ Add all middlewares in one call

  devTools: process.env.NODE_ENV !== "production", 
});

setupListeners(store.dispatch);

export default store;
