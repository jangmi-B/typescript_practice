export class Exercise {
    constructor(category, title, dueDate, isDone, changeStatus) {
        this.category = category;
        this.title = title;
        this.dueDate = dueDate;
        this.isDone = isDone;
        this.changeStatus = changeStatus;
    }
    format() {
        return `[${this.category}] ${this.dueDate}일 ${this.title}`;
    }
}
