import { HasFormatter } from "../Interface/HasFormatter.js";
import { Category } from "./category";

export class LocalStorageController {
  private static readonly TODO_STORAGE_KEY = "todos";
  private static readonly CATEGORY_STORAGE_KEY = "categories";

  static getTodos(): HasFormatter[] {
    const localStore = localStorage.getItem(this.TODO_STORAGE_KEY);

    if (localStore) {
      let todos: HasFormatter[] = this.getItems();
      return todos;
    }
    return [];
  }

  static saveTodos(todos: HasFormatter[]): void {
    const todosList = JSON.stringify(todos);
    localStorage.setItem(this.TODO_STORAGE_KEY, todosList);
  }

  static getItems(): HasFormatter[] {
    let todos: HasFormatter[] = [];
    let localStore = localStorage.getItem(this.TODO_STORAGE_KEY);
    let parsedTodos = JSON.parse(localStore || "null");
    todos = parsedTodos;

    return todos;
  }

  /////////////////////////////////////////////////
  
  static getCategories():Category[]{
    let categories:Category[] = [];
    let localStore = localStorage.getItem(this.CATEGORY_STORAGE_KEY);
    if (localStore) {
      let parsedTodos= JSON.parse(localStore);
      categories = parsedTodos;
      return categories;
    }
    return [];
  }

  static saveCategories(category:Category[]){
    const categoryList = JSON.stringify(category);
    localStorage.setItem(this.CATEGORY_STORAGE_KEY, categoryList);
  }
}
