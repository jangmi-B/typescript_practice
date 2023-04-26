import { LocalStorageController } from "../LocalStorageController.js";
import { Category } from "../category/Category.js";

export class TodoListTemplate {
  constructor(private containner: HTMLSelectElement) {}

  render() {
    const categories: Category[] = LocalStorageController.getCategories();
    categories.forEach((categories) => {
      const option = document.createElement("option");
      option.value = categories.categoryItem;
      option.text = categories.categoryItem;

      this.containner.append(option);
    });
  }
}
