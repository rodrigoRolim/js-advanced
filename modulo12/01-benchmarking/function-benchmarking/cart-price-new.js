import Product from "./product.js"
// import { v4 as uuid } from "uuid"
import { randomUUID as uuid } from "crypto"
export default class Cart {
  constructor({ at, products }) {
    this.products = products
    this.total = this.getCartPrice()
  }

  getCartPrice() {
    let price = 0
    for (const product of this.products) {
      price += product.price
    }

    return price;
  }
}
