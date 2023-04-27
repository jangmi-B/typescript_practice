import { HasFormatter } from "../../Interface/HasFormatter.js";
import { LocalStorageController } from "../LocalStorageController.js";
import { STORENAME } from "../StoreName.js";
import { TodoItem } from "../todoList/TodoItem";
import { CategoryListTemplate } from "./CategoryListTemplate.js";

export class Category {
  categoryItem: string = "";

  // 카테고리 저장
  categorySave(category: Category) {
    // 이미 작성한 카테고리인지 체크
    if (this.existsCategory(category.categoryItem)) {
      alert("이미 존재하는 카테고리 입니다.");
      return;
    }
    // 로컬스토리지 생성
    const categoryStorage: Category[] = LocalStorageController.getItem<Category>(STORENAME.CATEGORY_STORAGE_KEY);
    categoryStorage.push(category);
    LocalStorageController.saveItem(STORENAME.CATEGORY_STORAGE_KEY,categoryStorage);
    // render함수 호출
    this.drawCategory(categoryStorage);
  }

  // 새로 그리는 함수
  drawCategory(categoryStorage:Category[]) {
    const categoryList = document.querySelector("ul")!;
    const categoryListTemplate = new CategoryListTemplate(categoryList);

    categoryList.innerHTML = "";
    categoryStorage.forEach((element: Category, index: number) => {
      categoryListTemplate.render(element, index);
    });
  }

  // 카테고리 삭제
  categoryDelete(selectedValue: number) {
    const categoryStorage: Category[] = LocalStorageController.getItem(STORENAME.CATEGORY_STORAGE_KEY);
    let checkCategory = categoryStorage[selectedValue].categoryItem;
    const existsTodoList = this.existsTodoList(checkCategory);

    if (!existsTodoList) {
      categoryStorage.splice(selectedValue, 1);
      LocalStorageController.saveItem(STORENAME.CATEGORY_STORAGE_KEY,categoryStorage);
      this.drawCategory(categoryStorage);
    } else {
      alert("이미 사용중인 카테고리는 삭제할 수 없습니다");
      return;
    }
  }

  // 삭제할 때 투두리스트에서 사용중인 카테고리 체크
  existsTodoList(category: string): boolean {
    let isExists = false;
    let usedCategories: TodoItem[] = LocalStorageController.getItem<TodoItem>(STORENAME.TODO_STORAGE_KEY);
    usedCategories.forEach((element: HasFormatter) => {
      if (element.category === category) {
        isExists = true;
        return;
      }
    });
    return isExists;
  }

  // 이미 작성한 카테고리인지 체크
  existsCategory(category: string): boolean {
    let isExists = false;
    let usedCategories: Category[] = LocalStorageController.getItem<Category>(STORENAME.CATEGORY_STORAGE_KEY);
    usedCategories.forEach((element: Category) => {
      if (element.categoryItem === category) {
        isExists = true;
        return;
      }
    });
    return isExists;
  }
}
