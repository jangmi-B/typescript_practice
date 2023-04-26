import { HasFormatter } from "../Interface/HasFormatter.js";
import { Category } from "./category/Category";
import { STORENAME } from "./StoreName.js";

export class LocalStorageController {

  static getTodos(): HasFormatter[] {
    const localStore = localStorage.getItem(STORENAME.TODO_STORAGE_KEY);

    if (localStore) {
      let todos: HasFormatter[] = this.getItems();
      return todos;
    }
    return [];
  }

  static saveTodos(todos: HasFormatter[]): void {
    const todosList = JSON.stringify(todos);
    localStorage.setItem(STORENAME.TODO_STORAGE_KEY, todosList);
  }

  static getItems(): HasFormatter[] {
    let todos: HasFormatter[] = [];
    let localStore = localStorage.getItem(STORENAME.TODO_STORAGE_KEY);
    let parsedTodos = JSON.parse(localStore || "null");
    todos = parsedTodos;

    return todos;
  }

  ////////////////category///////////////////

  static getCategories(): Category[] {
    let categories: Category[] = [];
    let localStore = localStorage.getItem(STORENAME.CATEGORY_STORAGE_KEY);
    if (localStore) {
      let parsedTodos = JSON.parse(localStore);
      categories = parsedTodos;
      return categories;
    }
    return [];
  }

  static saveCategories(category: Category[]) {
    const categoryList = JSON.stringify(category);
    localStorage.setItem(STORENAME.CATEGORY_STORAGE_KEY, categoryList);
  }
}
