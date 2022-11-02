import { Category, ICategory } from '.';

export interface IProduct {
  sku: number;
  name: string;
  type: string;
  price: number;
  upc: string;
  shipping: number;
  description: string;
  manufacturer: string;
  model: string;
  url: string;
  image: string;
  category?: ICategory[];
}

export class Product {
  public sku: number;
  public name: string;
  public type: string;
  public price: number;
  public upc: string;
  public shipping: number;
  public description: string;
  public manufacturer: string;
  public model: string;
  public url: string;
  public image: string;
  public category: Category[];
  constructor(product: IProduct) {
    this.sku = product.sku;
    this.name = product.name;
    this.type = product.type;
    this.price = product.price;
    this.upc = product.upc;
    this.shipping = product.shipping;
    this.description = product.description;
    this.manufacturer = product.manufacturer;
    this.model = product.model;
    this.url = product.url;
    this.image = product.image;
    this.category =
      product.category && product.category.length > 0
        ? product.category.map((res) => new Category(res))
        : [];
  }
}
