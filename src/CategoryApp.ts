import { CategoryListTemplate } from "./classes/category/CategoryListTemplate.js";
import { LocalStorageController } from "./classes/LocalStorageController.js";
import { Category } from "./classes/category/Category.js";
import { STORENAME } from "./classes/StoreName.js";

const form = document.querySelector(".category-form") as HTMLFormElement;
const categoryList = document.querySelector("ul")!;
const categoryFormat = new CategoryListTemplate(categoryList);
const category = new Category();
const store = new LocalStorageController();
const local = store.getItem<Category>(STORENAME.CATEGORY_STORAGE_KEY);

// 카테고리 render()
local.forEach((element: Category, index: number) => {
  categoryFormat.render(element, index);
});

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

let ulList = document.querySelector(".ul-list")!;
ulList.addEventListener("click", (e) => {
  const selected = e.target as HTMLButtonElement;
  const selectedValue = Number(selected.value);
  if(confirm("카테고리를 삭제하시겠습니까?")){
    category.categoryDelete(selectedValue);
  }
});
