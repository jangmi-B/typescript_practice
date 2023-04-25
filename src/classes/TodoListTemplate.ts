import { LocalStorageController } from "./LocalStorageController.js";
import { Category } from "./Category.js";

export class TodoListTemplate {
  constructor(private containner: HTMLSelectElement) {}

  render() {
    const categories: Category[] = LocalStorageController.getCategories();
    console.log(categories);
    categories.forEach((categories) => {
      const option = document.createElement("option");
      option.value = categories.categoryItem;
      option.text = categories.categoryItem;

      this.containner.append(option);
    });
  }
}
