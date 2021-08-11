import { Status } from './shared';

export enum ExamType {
  IMAGE = 'image',
  CLINICAL_ANALYSIS = 'clinical_analysis',
}

export type Exam = {
  _id: string;
  name: string;
  type: ExamType;
  status: Status;
};
