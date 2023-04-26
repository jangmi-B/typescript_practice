import { EmptyTemplate } from "./classes/EmptyTemplate.js";
import { LocalStorageController } from "./classes/LocalStorageController.js";
import { Todo } from "./classes/todoList/Todo.js";
import { TodoItem } from "./classes/todoList/TodoItem.js";
import { TodoListTemplate } from "./classes/todoList/TodoListTemplate.js";
// form DOM 객체 가져옴
const form = document.querySelector(".todo-form");
const todoList = document.querySelector("ul");
const emptyFormat = new EmptyTemplate(todoList);
let localTodos = LocalStorageController.getTodos();
let localCategories = LocalStorageController.getCategories();
if (localCategories.length === 0) {
    localStorage.removeItem("categories");
    emptyFormat.render();
}
// 등록,수정,삭제용 객체
const todo = new Todo();
// 카테고리 생성
const select = document.querySelector("select");
select.options.length = 0;
const todoListTemplate = new TodoListTemplate(select);
todoListTemplate.render();
// dueDate 날짜 기본값 설정
const today = new Date();
const month = today.getMonth() + 1 < 10 ? true : false;
const todayStr = String(today.getFullYear()) +
    (month ? "0" + String(today.getMonth() + 1) : String(today.getMonth() + 1)) +
    String(today.getDate());
const dueDate = document.querySelector("#dueDate");
dueDate.value = todayStr;
// submit 이벤트 발생처리 및 랜더링
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const category = document.querySelector("#Category");
    const title = document.querySelector("#title");
    const dueDate = document.querySelector("#dueDate");
    let isDone = document.querySelector('input[name="isDone"]:checked');
    let changeStatus = isDone.value === "false" ? "on" : "";
    // submit전 검증을 위한 객체 생성
    const todoItem = new TodoItem(category.value, title.value, dueDate.valueAsNumber, isDone.value, changeStatus);
    // 내용체크
    if (todoItem.isEmpty(title.value)) {
        title.focus();
        alert("내용을 입력해주세요");
        return;
    }
    // 카테고리 체크
    if (todoItem.isEmpty(category.value)) {
        alert("카테고리 등록이 필요합니다");
        return;
    }
    // 유효한 날짜인지 확인
    if (!todoItem.isValid(dueDate)) {
        dueDate.focus();
        return;
    }
    // todo리스트가 없을때 문구 제거
    let emptySentence = document.querySelector(".empty-sentence");
    if (emptySentence !== null && localTodos.length == 0)
        emptySentence.remove();
    // 유효성 통과하면 submit()
    todo.save(todoItem);
    form.reset();
    dueDate.value = todayStr;
    location.href = "/dist/viewTodoList.html";
});
