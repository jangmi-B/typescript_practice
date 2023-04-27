import { ListTemplate } from "./classes/todoList/LIstTemplate.js";
import { EmptyTemplate } from "./classes/EmptyTemplate.js";
import { LocalStorageController } from "./classes/LocalStorageController.js";
import { HasFormatter } from "./Interface/HasFormatter.js";
import { Todo } from "./classes/todoList/Todo.js";
import { TodoItem } from "./classes/todoList/TodoItem.js";
import { STORENAME } from "./classes/StoreName.js";

// form DOM 객체 가져옴
const todoList = document.querySelector("ul")!;

// render()를 위한 객체생성
const listTemplate = new ListTemplate(todoList);
const emptyTemplate = new EmptyTemplate(todoList);

// local에 저장된 내용없으면 clear로 비워주기
let store = LocalStorageController.getItem<TodoItem>(STORENAME.TODO_STORAGE_KEY);
if (store.length == 0) {
  emptyTemplate.render();
  localStorage.removeItem("todos");
}

// 등록,수정,삭제용 객체
const todo = new Todo();

// todo리스트 render()
store.forEach((element: HasFormatter, index: number) => {
  let temp: HasFormatter = makeContents(element);
  listTemplate.render(temp, index);
});

// 삭제이벤트
let rightSide = document.querySelector(".right-side")!;
rightSide.addEventListener("click", (e) => {
  const clicked = e.target as HTMLButtonElement;

  // 타입이 버튼일때만 삭제 이벤트 실행
  if (clicked.type === "button") {
    const clickedValue = Number(clicked.value);
    if(confirm("정말 삭제하시겠습니까?")){
      todo.delete(clickedValue);
    }
  }
});

// 객체타입으로 변환해주는 함수
function makeContents(item: HasFormatter): HasFormatter {
  let contents: HasFormatter;
  contents = new TodoItem(
    item.category,
    item.title,
    item.dueDate,
    item.isDone,
    item.changeStatus
  );
  return contents;
}
