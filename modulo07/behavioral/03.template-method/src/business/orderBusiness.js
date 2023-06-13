import BaseBusiness from "./base/baseBusiness";

export default class OrderBusiness extends BaseBusiness {
  #orders = new Set();
  _validateRequiredFields(data) {
    return !!data.amount && !!data.products.length
  }
  _create(data) {
    this.#orders.add(data)
    return true
  }
}
