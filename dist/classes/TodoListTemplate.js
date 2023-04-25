import { LocalStorageController } from "./LocalStorageController.js";
export class TodoListTemplate {
    constructor(containner) {
        this.containner = containner;
    }
    render() {
        const categories = LocalStorageController.getCategories();
        console.log(categories);
        categories.forEach((categories) => {
            const option = document.createElement("option");
            option.value = categories.categoryItem;
            option.text = categories.categoryItem;
            this.containner.append(option);
        });
    }
}
