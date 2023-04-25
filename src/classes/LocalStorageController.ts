import { HasFormatter } from "../Interface/HasFormatter.js";

export class LocalStorageController {
  private static readonly STORAGE_KEY = "todos";

  /*
    static 키워드를 사용하면 인스턴스를 생성하지 않아도 변수나 메서드를 
    바로 사용할 수 있습니다. 코드의 가독성과 유지보수성이 향상될 수 있습니다.
    => 어떤 역할을 할지 모르니까 static보다는 new 연산자로 생성하는게 좋음
  */
  static getTodos(): HasFormatter[] {
    const localStore = localStorage.getItem(this.STORAGE_KEY);

    if (localStore) {
      let todos: HasFormatter[] = this.getItems();
      return todos;
    }
    return [];
  }

  static saveTodos(todos: HasFormatter[]): void {
    const todosList = JSON.stringify(todos);
    localStorage.setItem(this.STORAGE_KEY, todosList);
  }

  static getItems(): HasFormatter[] {
    let todos: HasFormatter[] = [];
    let localStore = localStorage.getItem(this.STORAGE_KEY);
    let parsedTodos = JSON.parse(localStore || "null");
    todos = parsedTodos;

    return todos;
  }
}
