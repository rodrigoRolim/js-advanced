import Util from "../util.js"

const componentNameAnchor = '$$componentName'

const template = `
export default class $$componentNameRepository {
  constructor() {}

  create(data) {
    return Promise.reject("method not implemented")
  }
  read(query) {
    return Promise.reject("method not implemented")
  }
  update(id, data) {
    return Promise.reject("method not implemented")
  }
  delete(id) {
    return Promise.reject("method not implemented")
  }
}`

export function repositoryTemplate(componentName) {
  const repositoryStr = 'Repository'
  return {
    fileName: `${componentName}${repositoryStr}`,
    template: template.replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
  }
}