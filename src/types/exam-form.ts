export type QuestionType = "객관식" | "주관식";

export type QuestionAnswer = {
  selected?: number;
  text?: string;
};

export type QuestionFormData = {
  type: QuestionType;
  score: number;
  category?: string;
  source?: string;
  content?: string;
  answer: QuestionAnswer;
};

export type ExamFormData = {
  name: string;
  subject: string;
  examType?: string;
  examDate: string;
  lectureId: string;
  source?: string;
  passScore?: number;
  autoRetest: boolean;
  questions: QuestionFormData[];
};
