import { LocalStorageController } from "../LocalStorageController.js";
export class TodoListTemplate {
    render() {
        const containner = document.querySelector("select");
        containner.options.length = 0;
        const categories = LocalStorageController.getCategories();
        categories.forEach((categories) => {
            const option = document.createElement("option");
            option.value = categories.categoryItem;
            option.text = categories.categoryItem;
            containner.append(option);
        });
    }
}
