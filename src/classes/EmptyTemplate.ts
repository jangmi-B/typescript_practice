export class EmptyTemplate {
  constructor(private containner: HTMLUListElement) {}

  render() {
    const h4 = document.createElement("h4");
    h4.append("There are no saved to-do lists.");
    h4.classList.add("empty-sentence");

    this.containner.append(h4);
  }
}
