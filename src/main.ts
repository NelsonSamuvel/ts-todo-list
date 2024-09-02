import "./css/style.css";
import FullList from "./model/FullList";
import ListTemplate from "./templates/ListTemplate";
import ListItem from "./model/ListItem";

const initApp = () => {
  const fullList = FullList.instance;
  const template = ListTemplate.instance;

  const entryForm = document.getElementById("itemEntryForm") as HTMLFormElement;

  entryForm.addEventListener("submit", (e: SubmitEvent): void => {
    e.preventDefault();
    const inputVal = document.getElementById("newItem") as HTMLInputElement;
    const newText = inputVal.value;
    if (!newText) return;

    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1;

    const listItem = new ListItem(itemId.toString(), newText);

    console.log(listItem);

    fullList.addItem(listItem);

    template.render(fullList);

    inputVal.value = "";
  });

  const clearBtn = document.getElementById(
    "clearItemsButton"
  ) as HTMLButtonElement;

  clearBtn.addEventListener("click", (): void => {
    fullList.clearItems();
    template.clear();
  });

  fullList.load();
  template.render(fullList);
};

document.addEventListener("DOMContentLoaded", initApp);
