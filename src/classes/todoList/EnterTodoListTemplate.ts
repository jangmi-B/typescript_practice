import { LocalStorageController } from "../LocalStorageController.js";
import { STORENAME } from "../StoreName.js";
import { Category } from "../category/Category.js";

export class EnterTodoListTemplate {

  render() {
    // render 해주기전 삭제
    const containner = document.querySelector("select") as HTMLSelectElement;
    containner.options.length = 0;

    const store: Category[] = LocalStorageController.getItem<Category>(STORENAME.CATEGORY_STORAGE_KEY);
    if(store.length === 0){
      const selectBox = document.querySelector("#Category") as HTMLSelectElement;
      selectBox.classList.add("emptyStatus");

      const categoryLabel = document.querySelector("#categoryLabel")!;
      const a = document.createElement("a");
      a.href = "/dist/category.html";
      a.text = "♡카테고리먼저 생성해 주세용♡";
      a.classList.add("empty-category");
      categoryLabel.append(a);
      
    } else {
      store.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.categoryItem;
        option.text = category.categoryItem;
  
        containner.append(option);
      });
    }
  }
}
