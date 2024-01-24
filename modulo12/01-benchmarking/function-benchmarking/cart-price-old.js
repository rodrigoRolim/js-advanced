import Product from "./product.js"
// import { v4 as uuid } from "uuid"
import { randomUUID as uuid } from "crypto"
export default class Cart {
  constructor({ at, products }) {
    this.products = products
    this.total = this.getCartPrice()
  }

  getCartPrice() {
    return this.products
      .map(product => product.price)
      .reduce((prev, next) => prev + next, 0)
  }
}
