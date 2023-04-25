import { ListTemplate } from "./classes/LIstTemplate.js";
import { EmptyTemplate } from "./classes/EmptyTemplate.js";
import { LocalStorageController } from "./classes/LocalStorageController.js";
import { Todo } from "./classes/Todo.js";
import { TodoItem } from "./classes/TodoItem.js";
import { TodoListTemplate } from "./classes/TodoListTemplate.js";
// form DOM 객체 가져옴
const form = document.querySelector(".todo-form");
const todoList = document.querySelector("ul");
// render()를 위한 객체생성
const listFormat = new ListTemplate(todoList);
const emptyFormat = new EmptyTemplate(todoList);
// local에 저장된 내용없으면 clear로 비워주기
let local = LocalStorageController.getTodos();
if (local.length == 0) {
    emptyFormat.render();
    localStorage.removeItem("todos");
}
// selectbox
const select = document.querySelector("select");
select.options.length = 0;
const todoListTemplate = new TodoListTemplate(select);
todoListTemplate.render();
// 등록,수정,삭제용 객체
const todo = new Todo();
// dueDate 날짜 기본값 설정
const today = new Date();
const month = today.getMonth() + 1 < 10 ? true : false;
const todayStr = String(today.getFullYear()) +
    (month ? "0" + String(today.getMonth() + 1) : String(today.getMonth() + 1)) +
    String(today.getDate());
const dueDate = document.querySelector("#dueDate");
dueDate.value = todayStr;
// todo리스트 render()
local.forEach((element, index) => {
    let temp = listFormat.makeContents(element);
    listFormat.render(temp, index);
});
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
    // form 유효성체크
    if (todoItem.isEmpty(title.value)) {
        title.focus();
        alert("내용을 입력해주세요");
        return;
    }
    // 유효한 날짜인지 확인
    if (!todoItem.isValid(dueDate)) {
        dueDate.focus();
        return;
    }
    // todo리스트가 없을때 문구 제거
    let emptySentence = document.querySelector(".empty-sentence");
    if (emptySentence !== null && local.length == 0)
        emptySentence.remove();
    // 유효성 통과하면 submit()
    todo.submit(todoItem);
    form.reset();
    dueDate.value = todayStr;
});
// 삭제이벤트
let rightSide = document.querySelector(".right-side");
rightSide.addEventListener("click", (e) => {
    const clicked = e.target;
    // 타입이 버튼일때만 삭제 이벤트 실행
    if (clicked.type === "button") {
        const clickedValue = Number(clicked.value);
        todo.delete(clickedValue);
    }
    // 삭제이후에 li태그 비어있으면 다시 빈 템플릿 그리기
    const todoList = document.querySelector("ul");
    const todoLength = todoList.children.length;
    if (todoLength === 0)
        emptyFormat.render();
});
