import { HasFormatter } from "../Interface/HasFormatter";
import { CategoryListTemplate } from "./CategoryListTemplate.js";
import { LocalStorageController } from "./LocalStorageController.js";

export class Category{
    
    categoryItem:string = "";
    
    categorySave(category: Category){
        const categoryList = document.querySelector("ul")!;
        const categoryFormat = new CategoryListTemplate(categoryList);

        if(this.existsCategory(category.categoryItem)){
            alert("이미 존재하는 카테고리 입니다.");
            return;
        }

        let localCategories: Category[] = 
            LocalStorageController.getCategories() != null 
            ? LocalStorageController.getCategories() 
            : [];

        localCategories.push(category);
        LocalStorageController.saveCategories(localCategories);  
        localCategories = LocalStorageController.getCategories();

        categoryList.innerHTML = "";
        localCategories.forEach((element: Category, index: number) => {
            categoryFormat.render(element, index);
        });
    }

    categoryDelete(selectedValue: number){
        let categories: Category[] = LocalStorageController.getCategories();
        const categoryList = document.querySelector("ul")!;
        let checkCategory = categories[selectedValue].categoryItem;
        const isExist = this.existsTodoList(checkCategory);

        if(!isExist){
            categoryList.children[selectedValue].remove();
            categories.splice(selectedValue,1);
            LocalStorageController.saveCategories(categories);
            this.changeIndex(selectedValue);
        } else {
            alert("이미 사용중인 카테고리는 삭제할 수 없습니다");
            return;
        }
    }

    changeIndex(idx: number) {
        const delBtn = document.querySelectorAll(".deleteBtn");
        delBtn.forEach((button) => {
          const curValue = parseInt(button.getAttribute("value")!);
          if (curValue > idx) {
            button.setAttribute("value", `${curValue - 1}`);
          }
        });
      }

    // 삭제할 때 이미 존재하는 카테고리 체크
    existsTodoList(category: string): boolean{
        let isExists = false;
        let usedCategories: HasFormatter[] = LocalStorageController.getTodos();
        usedCategories.forEach((element: HasFormatter) => {
            if(element.category === category){
                isExists = true;
                return;
            }
        });

        return isExists;
    }

    existsCategory(category: string):boolean{
        let isExists = false;
        let usedCategories: Category[] = LocalStorageController.getCategories();
        usedCategories.forEach((element: Category) => {
            if(element.categoryItem === category){
                isExists = true;
                return;
            }
        });

        return isExists;
    }
}