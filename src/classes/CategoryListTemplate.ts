import { Category } from "./Category.js";

export class CategoryListTemplate {
  constructor(private containner: HTMLUListElement) {}

  render(item: Category, index: number) {
    // li추가
    const li = document.createElement("li");
    const h4 = document.createElement("h4");
    h4.append(item.categoryItem);

    const delBtn = document.createElement("button");
    delBtn.classList.add("deleteBtn");
    delBtn.type = "button";
    delBtn.value = index + "";
    delBtn.append("X");

    h4.append(delBtn);
    li.append(h4);
    this.containner.append(li);
  }
}
