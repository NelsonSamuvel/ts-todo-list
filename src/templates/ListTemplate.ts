import FullList from "../model/FullList";

interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
  static instance: ListTemplate = new ListTemplate();

  ul: HTMLUListElement;

  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }

  clear(): void {
    this.ul.innerHTML = "";
  }

  render(fullList: FullList): void {
    // const li: HTMLLIElement = document.querySelector(".item") as HTMLLIElement;
    this.clear();

    fullList.list.forEach((item) => {
      const li = document.createElement("li") as HTMLLIElement;
      li.className = "item";
      const input = document.createElement("input") as HTMLInputElement;
      input.type = "checkbox";
      input.id = item.id;
      input.checked = item.checked;

      input.addEventListener("change", () => {
        item.checked = !item.checked;
        input.checked = item.checked;
        console.log("changed");
      });

      li.append(input);
      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = item.id;
      label.textContent = item.item;

      li.append(label);

      const button = document.createElement("button") as HTMLButtonElement;
      button.textContent = "X";
      button.className = "button";

      li.append(button);

      button.addEventListener("click", () => {
        fullList.removeItem(item.id);
        this.render(fullList);
      });

      this.ul.append(li);
    });
  }
}
