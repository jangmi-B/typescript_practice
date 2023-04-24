import { ListTemplate } from "./LIstTemplate.js";
class LocalStorageController {
    /*
      static 키워드를 사용하면 인스턴스를 생성하지 않아도 변수나 메서드를
      바로 사용할 수 있습니다. 코드의 가독성과 유지보수성이 향상될 수 있습니다.
  
      => 어떤 역할을 할지 모르니까 static보다는 new 연산자로 생성하는게 좋음
    */
    static getTodos(category) {
        const localStore = localStorage.getItem(this.STORAGE_KEY);
        const todoList = document.querySelector("ul");
        const listFormat = new ListTemplate(todoList);
        if (localStore) {
            let todos = this.getItems();
            return todos;
        }
        return [];
    }
    static saveTodos(todos) {
        const todosList = JSON.stringify(todos);
        localStorage.setItem(this.STORAGE_KEY, todosList);
    }
    static getItems() {
        let todos = [];
        let localStore = localStorage.getItem(this.STORAGE_KEY);
        let parsedTodos = JSON.parse(localStore || "null");
        todos = parsedTodos;
        return todos;
    }
}
LocalStorageController.STORAGE_KEY = "todos";
export { LocalStorageController };
