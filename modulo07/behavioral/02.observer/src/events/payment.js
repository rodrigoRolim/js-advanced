export default class Payment {
  constructor(paymentSubject) {
    this.paymentSubject = paymentSubject;
  }
  creditCard(paymentData) {
    this.paymentSubject.notify(paymentData)
  }
}