import ListItem from "./ListItem";

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearItems(): void;
  addItem(item: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();

  private constructor(private _list: ListItem[] = []) {}

  get list(): ListItem[] {
    return this._list;
  }

  load(): void {
    const listItemsStr: string | null = localStorage.getItem("myList");

    if (!listItemsStr) return;

    const listItems: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(listItemsStr);

    listItems.forEach((item) => {
      const storedItem = new ListItem(item._id, item._item, item._checked);
      FullList.instance.addItem(storedItem);
    });
  }

  save(): void {
    localStorage.setItem("myList", JSON.stringify(this._list));
  }

  clearItems(): void {
    this._list = [];
    this.save();
  }

  addItem(item: ListItem): void {
    this._list.push(item);
    this.save();
  }

  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }
}
