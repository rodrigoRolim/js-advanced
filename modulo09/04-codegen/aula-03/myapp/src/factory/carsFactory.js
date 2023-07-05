
import CarsRepository from '../repository/carsRepository.js'
import CarsService from '../service/carsService.js'

export default class CarsFactory {
  static getInstance() {
    const repository = new CarsRepository();
    const service = new CarsService({ repository });
    return service
  }
}