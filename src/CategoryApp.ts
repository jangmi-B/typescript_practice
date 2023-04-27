import { CategoryListTemplate } from "./classes/category/CategoryListTemplate.js";
import { LocalStorageController } from "./classes/LocalStorageController.js";
import { Category } from "./classes/category/Category.js";
import { STORENAME } from "./classes/StoreName.js";

const form = document.querySelector(".category-form") as HTMLFormElement;
const categoryListUl = document.querySelector("ul")!;
const categoryListTemplate = new CategoryListTemplate(categoryListUl);
const category = new Category();
const store = LocalStorageController.getItem<Category>(STORENAME.CATEGORY_STORAGE_KEY);

// 카테고리 render()
store.forEach((element: Category, index: number) => {
  categoryListTemplate.render(element, index);
});

// 등록
form.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const categoryInput = document.querySelector("#category") as HTMLInputElement;
  // 입력값이 있을때만
  if (categoryInput.value !== "") {
    category.categoryItem = categoryInput.value;
    category.categorySave(category);
    // 추가 후 input 비우기
    categoryInput.value = "";
  }
});

// 삭제
let ulList = document.querySelector(".ul-list")!;
ulList.addEventListener("click", (e) => {
  const selected = e.target as HTMLButtonElement;
  const selectedValue = Number(selected.value);

  if(confirm("카테고리를 삭제하시겠습니까?")){
    category.categoryDelete(selectedValue);
  }
});
