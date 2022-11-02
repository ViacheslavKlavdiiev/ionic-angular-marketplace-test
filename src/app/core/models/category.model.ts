export interface ICategory {
  id: string;
  name: string;
}

export class Category {
  public id: string;
  public name: string;
  constructor(category: ICategory) {
    this.id = category.id;
    this.name = category.name;
  }
}
