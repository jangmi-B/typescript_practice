import { ListTemplate } from "./classes/LIstTemplate.js";
import { EmptyTemplate } from "./classes/EmptyTemplate.js";
import { LocalStorageController } from "./classes/LocalStorageController.js";
import { HasFormatter } from "./Interface/HasFormatter";

// form DOM 객체 가져옴
/*
    TypeScript는 HTML 문서 객체를 기본적으로 HTMLElement 타입으로 인식합니다.
    따라서, querySelector 등을 통해 가져온 HTML 문서 객체를 그대로 변수에 할당하면, 
    해당 객체가 HTMLElement 타입으로 인식되어 HTMLElement에만 정의된 속성과 메서드만 사용할 수 있습니다.
 */
const form = document.querySelector(".todo-form") as HTMLFormElement;
const category = document.querySelector("#Category") as HTMLSelectElement;
const title = document.querySelector("#title") as HTMLInputElement;
const dueDate = document.querySelector("#dueDate") as HTMLInputElement;
const todoList = document.querySelector("ul")!;
// render()를 위한 객체생성
const listFormat = new ListTemplate(todoList);
const emptyFormat = new EmptyTemplate(todoList);

// local에 저장된 내용없으면 clear로 비워주기
let local = LocalStorageController.getTodos(category.value);
if (local.length == 0) {
  emptyFormat.render();
  localStorage.clear();
}

// render로 그리기전에 ul자식요소들 지우기
todoList.innerHTML = "";
// todo리스트 render()
local.forEach((element: HasFormatter, index: number) => {
  // 각각의 format()을 불러오려고 HasFormatter객체형태로 저장
  let temp: HasFormatter = listFormat.makeContents(element);
  listFormat.render(temp, index);
});

// submit 이벤트 발생처리 및 랜더링
form.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  // todo리스트가 없을때 문구 제거
  let emptySentence = document.querySelector(".empty-sentence");
  if (emptySentence !== null && local.length == 0) emptySentence.remove();

  // form 유효성체크
  if (title.value == "") {
    title.focus();
    alert("내용을 입력해주세요");
    return;
  }
  // 8자리 숫자인지 확인
  const isNum = /^\d{8}$/.test(dueDate.value);
  if (!isNum) {
    dueDate.focus();
    alert("yyyyMMdd 형식의 날짜를 입력해주세요.");
    return;
  }
  // 유효한 날짜 체크
  if (!valid()) {
    dueDate.focus();
    alert("유효하지 않은 날짜입니다. 다시 입력해주세요");
    return;
  }

  // 유효성 통과하면 submit()
  listFormat.submit();
  form.reset();
});

// 삭제이벤트
let rightSide = document.querySelector(".right-side")!;
rightSide.addEventListener("click", (e) => {
  const clicked = e.target as HTMLButtonElement;

  // 타입이 버튼일때만 삭제 이벤트 실행
  if (clicked.type === "button") {
    const clickedValue = Number(clicked.value);
    listFormat.delete(clickedValue);
  }

  // 삭제이후에 li태그 비어있으면 다시 빈 템플릿 그리기
  const todoList = document.querySelector("ul")!;
  const todoLength = todoList.children.length;
  if (todoLength === 0) emptyFormat.render();
});

function valid(): boolean {
  const year = dueDate.value.slice(0, 4);
  const month = dueDate.value.slice(4, 6);
  const day = dueDate.value.slice(6, 8);
  const date = new Date(`${year}-${month}-${day}`);

  // 유효한 날짜인지 확인
  // NaN 값은 산술 연산이 정의되지 않은 결과 또는 표현할 수 없는 결과를 도출하면 생성
  const isValid =
    !isNaN(date.getTime()) &&
    date.getFullYear() == Number(year) &&
    date.getMonth() + 1 == Number(month) &&
    date.getDate() == Number(day);

  return isValid;
}
