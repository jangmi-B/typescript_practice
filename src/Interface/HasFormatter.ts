export interface HasFormatter {
  category: string;
  title: string;
  dueDate: number;
  isDone: string;
  changeStatus: string;

  format(): string;
}
