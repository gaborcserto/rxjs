
import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import firstReducer from './slices/firstSlice';
import secondReducer from './slices/secondSlice';
import { rootEpic } from './epic';

const epicMiddleware = createEpicMiddleware<any, any, any, any>();

export const store = configureStore({
  reducer: {
    first: firstReducer,
    second: secondReducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
