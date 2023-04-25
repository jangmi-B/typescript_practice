import { CategoryListTemplate } from "./classes/CategoryListTemplate.js";
import { LocalStorageController } from "./classes/LocalStorageController.js";
import { Category } from "./classes/category.js";

const form = document.querySelector(".category-form") as HTMLFormElement;
const addBtn = document.querySelector("button") as HTMLButtonElement;
const categoryList = document.querySelector("ul")!;
const categoryFormat = new CategoryListTemplate(categoryList);
const category = new Category();

let local = LocalStorageController.getCategories();
if (local.length == 0) {
//   emptyFormat.render();
  localStorage.clear();
}

// todo리스트 render()
local.forEach((element: Category, index: number) => {
    categoryFormat.render(element,index);
});

form.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    
    const categoryInput = document.querySelector("#category") as HTMLInputElement;
    // 입력값이 있을때만
    if(categoryInput.value !== ""){
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
    category.categoryDelete(selectedValue);
});



