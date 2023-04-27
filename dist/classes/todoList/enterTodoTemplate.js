import { LocalStorageController } from "../LocalStorageController.js";
import { STORENAME } from "../StoreName.js";
export class TodoListTemplate {
    render() {
        const containner = document.querySelector("select");
        containner.options.length = 0;
        const store = new LocalStorageController();
        const categories = store.getItem(STORENAME.CATEGORY_STORAGE_KEY);
        if (categories.length === 0) {
            const selectBox = document.querySelector("#Category");
            selectBox.classList.add("emptyStatus");
            const categoryLabel = document.querySelector("#categoryLabel");
            const a = document.createElement("a");
            a.href = "/dist/category.html";
            a.text = "♡카테고리먼저 생성해 주세용♡";
            a.classList.add("empty-category");
            categoryLabel.append(a);
        }
        else {
            categories.forEach((categories) => {
                const option = document.createElement("option");
                option.value = categories.categoryItem;
                option.text = categories.categoryItem;
                containner.append(option);
            });
        }
    }
}
