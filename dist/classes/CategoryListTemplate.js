export class CategoryListTemplate {
    constructor(containner) {
        this.containner = containner;
    }
    render(item, index) {
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
