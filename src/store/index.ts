import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
  },
});

// Tipagem para usar no useSelector e no useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;