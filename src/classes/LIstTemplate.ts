import { HasFormatter } from "../Interface/HasFormatter";
import { LocalStorageController } from "./LocalStorageController.js";
import { TodoItem } from "./TodoItem.js";

export class ListTemplate {
  constructor(private containner: HTMLUListElement) {}

  // 객체타입으로 변환해주는 함수
  makeContents(item: HasFormatter): HasFormatter {
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
    const todoItem = new TodoItem(
      renderCategory.category,
      renderCategory.title,
      renderCategory.dueDate,
      renderCategory.isDone,
      renderCategory.changeStatus
    );
    // 완료되지 않았으면 빨간색으로 표시
    const isFinished = todoItem.isFinished(renderCategory.dueDate);
    h4.append(renderCategory.format());
    // 완료날짜가 지난 이후 미완료 체크
    if (!isFinished && item.changeStatus === "on") {
      h4.classList.add("not-finish");
      // h4.append(" (★미완료★)");
    }

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
      const isFinished = todoItem.isFinished(todos[todoIdx].dueDate);
      if (h4.classList.contains("complete")) {
        h4.classList.remove("complete");
        h4.classList.add("processing");
        // 미완료일때 클래스 추가
        if(!isFinished){
          h4.classList.add("not-finish");
        }
        todos[todoIdx].isDone = "false";
        todos[todoIdx].changeStatus = "on";
      } else {
        h4.classList.remove("processing");
        h4.classList.add("complete");
        if(h4.classList.contains("not-finish")){
          h4.classList.remove("not-finish");
        }
        todos[todoIdx].isDone = "true";
        todos[todoIdx].changeStatus = "";
      }

      // todo 체크 바뀐거 로컬스토리지에 재저장
      LocalStorageController.saveTodos(todos);
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
