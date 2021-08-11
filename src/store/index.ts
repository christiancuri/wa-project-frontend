import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { examReducer } from './exam';
import { labsReducer } from './laboratory';

export const Reducers = combineReducers({
  examState: examReducer,
  labState: labsReducer,
});

export const Store = configureStore({
  devTools:
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  reducer: Reducers,
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
