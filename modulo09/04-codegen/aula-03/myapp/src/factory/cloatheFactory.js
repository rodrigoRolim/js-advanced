
import CloatheRepository from '../repository/cloatheRepository.js'
import CloatheService from '../service/cloatheService.js'

export default class CloatheFactory {
  static getInstance() {
    const repository = new CloatheRepository();
    const service = new CloatheService({ repository });
    return service
  }
}