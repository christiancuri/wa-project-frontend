import { Exam } from './exam';
import { Status } from './shared';

export type Laboratory = {
  _id: string;
  name: string;
  address: string;
  status: Status;
  exams: Exam;
};
