import { useSelector } from 'react-redux';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store';

import { Exam } from '@interfaces/exam';

export interface ExamState {
  exams: Exam[];
}

const initialState: ExamState = {
  exams: [] as Exam[],
};

export const examSlice = createSlice({
  name: 'exams',
  initialState,
  reducers: {
    setExams: (state, action: PayloadAction<Exam[]>) => ({
      exams: action.payload,
    }),
  },
});

export const { setExams } = examSlice.actions;

export const selectExams = (state: RootState): ExamState => state.examState;
export const useExamState = (): ExamState => useSelector(selectExams);
export const examReducer = examSlice.reducer;
