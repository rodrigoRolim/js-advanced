import { NotImplementedException } from "../../../utils/exceptions";


export default class BaseBusiness {
  _validateRequiredFields(data) {
    throw new NotImplementedException(
      this._validateRequiredFields.name
    )
  }
  _create(data) {
    throw new NotImplementedException(
      this._create.name
    )
  }
  /* 
    padrão do martin fowler
    a proposta do padrão é garantir um fluxo de métodos definindo uma sequencia a ser executada

    esse create é a implementação efetiva do Template Method
  */
  create(data) {
    const isValid = this._validateRequiredFields(data)
    if(!isValid) throw new Error('invalid data!')

    return this._create(data)
  }
}