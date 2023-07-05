
import PersonRepository from '../repository/personRepository.js'
import PersonService from '../service/personService.js'

export default class PersonFactory {
  static getInstance() {
    const repository = new PersonRepository();
    const service = new PersonService({ repository });
    return service
  }
}