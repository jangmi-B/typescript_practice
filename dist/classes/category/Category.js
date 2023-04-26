import { LocalStorageController } from "../LocalStorageController.js";
export class Category {
    constructor() {
        this.categoryItem = "";
    }
    // 카테고리 저장
    categorySave(category) {
        // 이미 작성한 카테고리인지 체크
        if (this.existsCategory(category.categoryItem)) {
            alert("이미 존재하는 카테고리 입니다.");
            return;
        }
        // 로컬스토리지에 저장
        let localCategories = LocalStorageController.getCategories() != null
            ? LocalStorageController.getCategories()
            : [];
        localCategories.push(category);
        LocalStorageController.saveCategories(localCategories);
        localCategories = LocalStorageController.getCategories();
        // const categoryStorage = LocalStorageController.loadStore("category")
        // LocalStorageController.append(category);
        // LocalStorageController.store();
        // localCategories = LocalStorageController.getCategories();
        // // 기존내용 지우고 새롭게 랜더링
        // categoryList.innerHTML = "";
        // localCategories.forEach((element: Category, index: number) => {
        //   categoryFormat.render(element, index);
        // });
    }
    // 그릴때 넘겨주기
    // drawCategory() {
    //   const categoryList = document.querySelector("ul")!;
    //   const categoryFormat = new CategoryListTemplate(categoryList);
    // }
    // 카테고리 삭제
    categoryDelete(selectedValue) {
        let categories = LocalStorageController.getCategories();
        const categoryList = document.querySelector("ul"); //VIEW
        let checkCategory = categories[selectedValue].categoryItem;
        // 투두리스트에서 사용중인지 체크
        const isContain = this.existsTodoList(checkCategory);
        if (!isContain) {
            // 배열 삭제
            // 다시 그리기
            categoryList.children[selectedValue].remove(); //VIEW
            categories.splice(selectedValue, 1);
            LocalStorageController.saveCategories(categories);
            this.changeIndex(selectedValue);
        }
        else {
            alert("이미 사용중인 카테고리는 삭제할 수 없습니다");
            return;
        }
    }
    changeIndex(idx) {
        const delBtn = document.querySelectorAll(".deleteBtn");
        delBtn.forEach((button) => {
            const curValue = parseInt(button.getAttribute("value"));
            if (curValue > idx) {
                button.setAttribute("value", `${curValue - 1}`);
            }
        });
    }
    // 삭제할 때 투두리스트에서 사용중인 카테고리 체크
    existsTodoList(category) {
        let isExists = false;
        let usedCategories = LocalStorageController.getTodos();
        usedCategories.forEach((element) => {
            if (element.category === category) {
                isExists = true;
                return;
            }
        });
        return isExists;
    }
    // 이미 작성한 카테고리인지 체크
    existsCategory(category) {
        let isExists = false;
        let usedCategories = LocalStorageController.getCategories();
        usedCategories.forEach((element) => {
            if (element.categoryItem === category) {
                isExists = true;
                return;
            }
        });
        return isExists;
    }
}
