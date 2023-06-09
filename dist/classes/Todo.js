import { ListTemplate } from "./LIstTemplate.js";
import { LocalStorageController } from "./LocalStorageController.js";
//TodoItem 클래스를 멤버로 가지고 있고 todo를 등록/수정/삭제하는 역할만 한다
export class Todo {
    constructor() {
        this.todoItem = [];
    }
    // submit 함수
    save(todoItem) {
        const todoList = document.querySelector("ul");
        console.log(todoList);
        const listFormat = new ListTemplate(todoList);
        const category = todoItem.category;
        const title = todoItem.title;
        const dueDate = todoItem.dueDate;
        let isDone = todoItem.isDone;
        let changeStatus = todoItem.changeStatus;
        // 객체타입으로 넘겨주기 위한 객체 생성
        let contents = {
            category: category,
            title: title,
            dueDate: dueDate,
            isDone: isDone,
            changeStatus: changeStatus,
            format() {
                return "";
            },
        };
        // contents = this.makeContents(contents);
        let todos = LocalStorageController.getItems() != null
            ? LocalStorageController.getItems()
            : [];
        todos.push(contents);
        // 로컬스토리지에 저장하고 저장된 내용 가져오기
        LocalStorageController.saveTodos(todos);
        todos = LocalStorageController.getTodos();
        // todo render
        // render로 그리기전에 ul자식요소들 지우기
        // console.log(todoList);
        // todoList.innerHTML = "";
        // todos.forEach((element: HasFormatter, index: number) => {
        //   // 각각의 format()을 불러오려고 HasFormatter객체형태로 저장
        //   let temp: HasFormatter = listFormat.makeContents(element);
        //   listFormat.render(temp, index);
        // });
    }
    //  delete 함수
    delete(deleteIdx) {
        let todos = LocalStorageController.getItems();
        const todoList = document.querySelector("ul");
        // 투두리스트 삭제
        todoList.children[deleteIdx].remove();
        todos.splice(deleteIdx, 1);
        LocalStorageController.saveTodos(todos);
        this.changeIndex(deleteIdx);
    }
    // li태그 삭제 후 체크박스 value와 버튼 value 1씩감소
    changeIndex(idx) {
        const delBtn = document.querySelectorAll(".deleteBtn");
        delBtn.forEach((button) => {
            var _a;
            let sebling = (_a = button.previousSibling) === null || _a === void 0 ? void 0 : _a.previousSibling;
            const curValue = parseInt(button.getAttribute("value"));
            const seblingValue = parseInt(sebling.getAttribute("value"));
            if (curValue > idx) {
                button.setAttribute("value", `${curValue - 1}`);
                sebling.setAttribute("value", `${seblingValue - 1}`);
            }
        });
    }
}
