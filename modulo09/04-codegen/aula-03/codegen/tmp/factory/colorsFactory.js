
import ColorsRepository from '../repository/colorsRepository.js'
import ColorsService from '../service/colorsService.js'

export default class ColorsFactory {
  static getInstance() {
    const repository = new ColorsRepository();
    const service = new ColorsService({ repository });
    return service
  }
}