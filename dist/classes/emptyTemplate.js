import { LocalStorageController } from "./LocalStorageController.js";
export class EmptyTemplate {
    constructor(containner) {
        this.containner = containner;
    }
    render() {
        const url = window.location.href;
        const curLocation = url.substring(url.lastIndexOf("/") + 1, url.length);
        const categoryCnt = LocalStorageController.getCategories();
        if (curLocation === "enterTodoList.html" && categoryCnt.length === 0) {
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
            const h4 = document.createElement("h4");
            h4.append("There are no saved to-do lists.");
            h4.classList.add("empty-sentence");
            this.containner.append(h4);
        }
    }
}
