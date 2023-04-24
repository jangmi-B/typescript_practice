export class BucketList {
    // category: string;
    // title: string;
    // dueDate: number;
    // isDone: string;
    // changeStatus: string;
    // constructor(
    //   category: string,
    //   title: string,
    //   dueDate: number,
    //   isDone: string,
    //   changeStatus: string
    // ) {
    //   this.category = category;
    //   this.title = title;
    //   this.dueDate = dueDate;
    //   this.isDone = isDone;
    //   this.changeStatus = changeStatus;
    // }
    /*
      접근제한자
      - public은 어디에서나 접근할 수 있으며 생략 가능한 default 값이다.
      - protected는 해당 클래스 혹은 서브클래스의 인스턴스에서만 접근이 가능하다.
      - private는 해당 클래스의 인스턴스에서만 접근 가능하다.
      - 만약 정말 수정되면 안되는 값이 있다면, readonly 접근자를 활용해야 한다.
    */
    constructor(category, title, dueDate, isDone, changeStatus) {
        this.category = category;
        this.title = title;
        this.dueDate = dueDate;
        this.isDone = isDone;
        this.changeStatus = changeStatus;
    }
    format() {
        return `[${this.category}] ${this.title} (~${this.dueDate})`;
    }
}
