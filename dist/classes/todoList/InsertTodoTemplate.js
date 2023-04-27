import { LocalStorageController } from "../LocalStorageController.js";
import { STORENAME } from "../StoreName.js";
export class InsertTodoListTemplate {
    render() {
        // render 해주기전 삭제
        const containner = document.querySelector("select");
        containner.options.length = 0;
        const store = LocalStorageController.getItem(STORENAME.CATEGORY_STORAGE_KEY);
        if (store.length === 0) {
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
            store.forEach((category) => {
                const option = document.createElement("option");
                option.value = category.categoryItem;
                option.text = category.categoryItem;
                containner.append(option);
            });
        }
    }
}
