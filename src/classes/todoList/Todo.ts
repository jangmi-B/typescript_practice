import { HasFormatter } from "../../Interface/HasFormatter.js";
import { LocalStorageController } from "../LocalStorageController.js";
import { TodoItem } from "./TodoItem.js";

//TodoItem 클래스를 멤버로 가지고 있고 todo를 등록/수정/삭제하는 역할만 한다
export class Todo {
  todoItem: TodoItem[] = [];

  // 저장
  save(todoItem: TodoItem) {
    const todoList = document.querySelector("ul")!;
    console.log(todoList);
    const category = todoItem.category;
    const title = todoItem.title;
    const dueDate = todoItem.dueDate;
    let isDone = todoItem.isDone;
    let changeStatus = todoItem.changeStatus;

    // 객체타입으로 넘겨주기 위한 객체 생성
    let contents: HasFormatter = {
      category: category,
      title: title,
      dueDate: dueDate,
      isDone: isDone,
      changeStatus: changeStatus,
      format() {
        return "";
      },
    };
    let todos: HasFormatter[] =
      LocalStorageController.getItems() != null
        ? LocalStorageController.getItems()
        : [];
    todos.push(contents);

    // 로컬스토리지에 저장하고 저장된 내용 가져오기
    LocalStorageController.saveTodos(todos);
    todos = LocalStorageController.getTodos();
  }

  //  delete 함수
  delete(deleteIdx: number) {
    let todos: HasFormatter[] = LocalStorageController.getItems();
    const todoList = document.querySelector("ul")!;

    // 투두리스트 삭제
    todoList.children[deleteIdx].remove();
    todos.splice(deleteIdx, 1);
    LocalStorageController.saveTodos(todos);
    this.changeIndex(deleteIdx);
  }

  // li태그 삭제 후 체크박스 value와 버튼 value 1씩감소
  changeIndex(idx: number) {
    const delBtn = document.querySelectorAll(".deleteBtn");

    delBtn.forEach((button) => {
      let sebling = button.previousSibling?.previousSibling as HTMLInputElement;
      const curValue = parseInt(button.getAttribute("value")!);
      const seblingValue = parseInt(sebling.getAttribute("value")!);

      if (curValue > idx) {
        button.setAttribute("value", `${curValue - 1}`);
        sebling.setAttribute("value", `${seblingValue - 1}`);
      }
    });
  }
}