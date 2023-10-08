import { configureStore } from '@reduxjs/toolkit';
import LoginReducer from './reducer';

const store = configureStore({
  reducer: {
    login: LoginReducer,
  },
});

export default store;
