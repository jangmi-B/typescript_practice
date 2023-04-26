import { STORENAME } from "./StoreName.js";
export class LocalStorageController {
    static getTodos() {
        const localStore = localStorage.getItem(STORENAME.TODO_STORAGE_KEY);
        if (localStore) {
            let todos = this.getItems();
            return todos;
        }
        return [];
    }
    static saveTodos(todos) {
        const todosList = JSON.stringify(todos);
        localStorage.setItem(STORENAME.TODO_STORAGE_KEY, todosList);
    }
    static getItems() {
        let todos = [];
        let localStore = localStorage.getItem(STORENAME.TODO_STORAGE_KEY);
        let parsedTodos = JSON.parse(localStore || "null");
        todos = parsedTodos;
        return todos;
    }
    ////////////////category///////////////////
    static getCategories() {
        let categories = [];
        let localStore = localStorage.getItem(STORENAME.CATEGORY_STORAGE_KEY);
        if (localStore) {
            let parsedTodos = JSON.parse(localStore);
            categories = parsedTodos;
            return categories;
        }
        return [];
    }
    static saveCategories(category) {
        const categoryList = JSON.stringify(category);
        localStorage.setItem(STORENAME.CATEGORY_STORAGE_KEY, categoryList);
    }
}
