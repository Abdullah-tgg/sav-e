import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Adjust the path if necessary

// Configure the Redux store
const store = configureStore({
  reducer: {
    user: userReducer, // Add userReducer to the store
  },
  // Optional: middleware customization if needed, for example, disabling serializable checks.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
