import { HasFormatter } from "../Interface/HasFormatter";

export class Exercise implements HasFormatter {
  constructor(
    public category: string,
    public title: string,
    public dueDate: number,
    public isDone: string,
    public changeStatus: string
  ) {}

  format(): string {
    return `[${this.category}] ${this.dueDate}일 ${this.title}`;
  }
}
