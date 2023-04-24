import { HasFormatter } from "../Interface/HasFormatter";
import { BucketList } from "./BucketList.js";
import { Etc } from "./Etc.js";
import { Exercise } from "./Exercise.js";
import { Study } from "./Study.js";
import { LocalStorageController } from "./LocalStorageController.js";
import { CategoryType } from "./Enums.js";
import { TodoList } from "./TodoList.js";

export class ListTemplate {
  constructor(private containner: HTMLUListElement) {}

  // 객체타입으로 변환해주는 함수
  makeContents(item: HasFormatter): HasFormatter {
    let contents: HasFormatter;
    contents = new TodoList(
      item.category,
      item.title,
      item.dueDate,
      item.isDone,
      item.changeStatus
    );
    return contents;
  }
  //

  // submit 함수
  submit() {
    const todoList = document.querySelector("ul")!;
    const listFormat = new ListTemplate(todoList);
    const category = document.querySelector("#Category") as HTMLSelectElement;
    const title = document.querySelector("#title") as HTMLInputElement;
    const dueDate = document.querySelector("#dueDate") as HTMLInputElement;
    let isDone = document.querySelector(
      'input[name="isDone"]:checked'
    ) as HTMLInputElement;
    let changeStatus = isDone.value === "false" ? "on" : "";

    // 객체타입으로 넘겨주기 위한 객체 생성
    let contents: HasFormatter = {
      category: category.value,
      title: title.value,
      dueDate: dueDate.valueAsNumber,
      isDone: isDone.value,
      changeStatus: changeStatus,
      format() {
        return "";
      },
    };
    // contents = this.makeContents(contents);
    let todos: HasFormatter[] =
      LocalStorageController.getItems() != null
        ? LocalStorageController.getItems()
        : [];
    todos.push(contents);

    LocalStorageController.saveTodos(todos);

    todos = LocalStorageController.getTodos(category.value);
    // todo render
    // render로 그리기전에 ul자식요소들 지우기
    todoList.innerHTML = "";
    todos.forEach((element: HasFormatter, index: number) => {
      // 각각의 format()을 불러오려고 HasFormatter객체형태로 저장
      let temp: HasFormatter = listFormat.makeContents(element);
      listFormat.render(temp, index);
    });
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

  // 투두리스트 랜더링
  render(item: HasFormatter, index: number) {
    // li추가
    const li = document.createElement("li");

    // checkbox 생성하여 인덱스 및 클래스 추가
    const chkbox = document.createElement("input");
    chkbox.type = "checkbox";
    chkbox.value = index + "";
    // chkbox.classList.add("change-status");

    // isDone에 따른 checkbox 체크표시
    if (item.changeStatus !== "on") {
      chkbox.checked = true;
    }

    //h4 추가
    const h4 = document.createElement("h4");
    const renderCategory = this.makeContents(item);
    h4.append(renderCategory.format());

    // 종료되면 초록 진행중이면 파랑으로 표시하기 위한 클래스 추가
    if (item.isDone === "false") {
      h4.classList.add("processing");
    } else {
      h4.classList.add("complete");
    }

    // 체크박스 클릭 이벤트
    chkbox.addEventListener("change", function () {
      let todoIdx = Number(this.value);
      let todos: HasFormatter[] = LocalStorageController.getItems();

      if (h4.classList.contains("complete")) {
        h4.classList.remove("complete");
        h4.classList.add("processing");
        todos[todoIdx].isDone = "false";
        todos[todoIdx].changeStatus = "on";
      } else {
        h4.classList.remove("processing");
        h4.classList.add("complete");
        todos[todoIdx].isDone = "true";
        todos[todoIdx].changeStatus = "";
      }

      // todo 체크 바뀐거 로컬스토리지에 재저장
      LocalStorageController.saveTodos(todos);
      // localStorage.setItem("todos", JSON.stringify(todos));
    });

    // 삭제버튼 생성 및 인덱스 추가
    const delBtn = document.createElement("button");
    delBtn.classList.add("deleteBtn");
    delBtn.type = "button";
    delBtn.value = index + "";
    delBtn.append("X");

    h4.append(delBtn);
    h4.prepend(chkbox);
    li.append(h4);
    this.containner.append(li);
  }
}
