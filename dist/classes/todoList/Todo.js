import { EmptyTemplate } from "../EmptyTemplate.js";
import { LocalStorageController } from "../LocalStorageController.js";
import { STORENAME } from "../StoreName.js";
import { ListTemplate } from "./LIstTemplate.js";
//TodoItem 클래스를 멤버로 가지고 있고 todo를 등록/수정/삭제하는 역할만 한다
export class Todo {
    constructor() {
        this.todoItem = [];
    }
    // 저장
    save(todoItem) {
        let todoStorage = LocalStorageController.getItem(STORENAME.TODO_STORAGE_KEY);
        todoStorage.push(todoItem);
        // 로컬스토리지에 저장하고 저장된 내용 가져오기
        LocalStorageController.saveItem(STORENAME.TODO_STORAGE_KEY, todoStorage);
    }
    //  delete 함수
    delete(deleteIdx) {
        let todoStorage = LocalStorageController.getItem(STORENAME.TODO_STORAGE_KEY);
        const todoList = document.querySelector("ul");
        const listTemplate = new ListTemplate(todoList);
        const emptyTemplate = new EmptyTemplate(todoList);
        // 투두리스트 삭제
        todoStorage.splice(deleteIdx, 1);
        LocalStorageController.saveItem(STORENAME.TODO_STORAGE_KEY, todoStorage);
        todoStorage = LocalStorageController.getItem(STORENAME.TODO_STORAGE_KEY);
        // 삭제 후 새로 그리기
        todoList.innerHTML = "";
        todoStorage.forEach((element, index) => {
            listTemplate.render(element, index);
        });
        // 삭제이후에 li태그 비어있으면 다시 빈 템플릿 그리기
        const todoLength = todoList.children.length;
        if (todoLength === 0)
            emptyTemplate.render();
    }
}
