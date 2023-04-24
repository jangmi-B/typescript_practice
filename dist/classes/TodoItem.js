// Todo 등록하고 검증
export class TodoItem {
    constructor(category, title, dueDate, isDone, changeStatus) {
        this.category = category;
        this.title = title;
        this.dueDate = dueDate;
        this.isDone = isDone;
        this.changeStatus = changeStatus;
    }
}
