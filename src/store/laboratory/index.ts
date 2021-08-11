import { useSelector } from 'react-redux';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store';

import { Laboratory } from '@interfaces/laboratory';

export interface LabState {
  labs: Laboratory[];
}

const initialState: LabState = {
  labs: [] as Laboratory[],
};

export const labSlice = createSlice({
  name: 'laboratories',
  initialState,
  reducers: {
    setLabs: (state, action: PayloadAction<Laboratory[]>) => ({
      labs: action.payload,
    }),
  },
});

export const { setLabs } = labSlice.actions;

export const selectLabs = (state: RootState): LabState => state.labState;
export const useLabsState = (): LabState => useSelector(selectLabs);
export const labsReducer = labSlice.reducer;
