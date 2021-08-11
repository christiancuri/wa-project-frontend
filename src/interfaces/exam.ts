import { Status } from './shared';

export enum ExamType {
  IMAGE = 'image',
  CLINICAL_ANALYSIS = 'clinical_analysis',
}

export type Exam = {
  _id: string;
  id: number;
  name: string;
  type: ExamType;
  status: Status;
};

export const ExamHelper = {
  getType(type: ExamType): string {
    const texts: { [k in ExamType]: string } = {
      [ExamType.IMAGE]: `Imagem`,
      [ExamType.CLINICAL_ANALYSIS]: `Análise clinica`,
    };
    return texts[type];
  },
};
