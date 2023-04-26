import { ListTemplate } from "./classes/LIstTemplate.js";
import { EmptyTemplate } from "./classes/EmptyTemplate.js";
import { LocalStorageController } from "./classes/LocalStorageController.js";
import { HasFormatter } from "./Interface/HasFormatter";
import { Todo } from "./classes/Todo.js";
import { TodoItem } from "./classes/TodoItem.js";
import { TodoListTemplate } from "./classes/TodoListTemplate.js";

// form DOM 객체 가져옴
const form = document.querySelector(".todo-form") as HTMLFormElement;
const todoList = document.querySelector("ul")!;
// render()를 위한 객체생성
const listFormat = new ListTemplate(todoList);
const emptyFormat = new EmptyTemplate(todoList);

// local에 저장된 내용없으면 clear로 비워주기
let local = LocalStorageController.getTodos();
if (local.length == 0) {
  emptyFormat.render();
  localStorage.removeItem("todos");
}

// 등록,수정,삭제용 객체
const todo = new Todo();

// todo리스트 render()
local.forEach((element: HasFormatter, index: number) => {
  let temp: HasFormatter = listFormat.makeContents(element);
  listFormat.render(temp, index);
});

// 삭제이벤트
let rightSide = document.querySelector(".right-side")!;
rightSide.addEventListener("click", (e) => {
  const clicked = e.target as HTMLButtonElement;

  // 타입이 버튼일때만 삭제 이벤트 실행
  if (clicked.type === "button") {
    const clickedValue = Number(clicked.value);
    todo.delete(clickedValue);
  }

  // 삭제이후에 li태그 비어있으면 다시 빈 템플릿 그리기
  const todoList = document.querySelector("ul")!;
  const todoLength = todoList.children.length;
  if (todoLength === 0) emptyFormat.render();
});
