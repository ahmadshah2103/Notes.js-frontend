import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './notesSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    auth: authReducer,
  },
});

store.subscribe(() => {
  localStorage.setItem('authState', JSON.stringify(store.getState().auth));
});
