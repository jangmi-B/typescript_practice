class LocalStorageController {
    static getTodos() {
        const localStore = localStorage.getItem(this.TODO_STORAGE_KEY);
        if (localStore) {
            let todos = this.getItems();
            return todos;
        }
        return [];
    }
    static saveTodos(todos) {
        const todosList = JSON.stringify(todos);
        localStorage.setItem(this.TODO_STORAGE_KEY, todosList);
    }
    static getItems() {
        let todos = [];
        let localStore = localStorage.getItem(this.TODO_STORAGE_KEY);
        let parsedTodos = JSON.parse(localStore || "null");
        todos = parsedTodos;
        return todos;
    }
    /////////////////////////////////////////////////
    static getCategories() {
        let categories = [];
        let localStore = localStorage.getItem(this.CATEGORY_STORAGE_KEY);
        if (localStore) {
            let parsedTodos = JSON.parse(localStore);
            categories = parsedTodos;
            return categories;
        }
        return [];
    }
    static saveCategories(category) {
        const categoryList = JSON.stringify(category);
        localStorage.setItem(this.CATEGORY_STORAGE_KEY, categoryList);
    }
}
LocalStorageController.TODO_STORAGE_KEY = "todos";
LocalStorageController.CATEGORY_STORAGE_KEY = "categories";
export { LocalStorageController };
