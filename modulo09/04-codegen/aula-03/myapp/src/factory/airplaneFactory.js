
import AirplaneRepository from '../repository/airplaneRepository.js'
import AirplaneService from '../service/airplaneService.js'

export default class AirplaneFactory {
  static getInstance() {
    const repository = new AirplaneRepository();
    const service = new AirplaneService({ repository });
    return service
  }
}