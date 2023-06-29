import fsPromises from 'fs/promises'
import fs from 'fs'
import templates from './templates'
import Util from './util'

const defaultDependencies = (layer, componentName) => {
  // padrão HashMap
  const dependencies = {
    repository: [],
    service: [
      `${componentName}Repository`
    ],
    factory: [
      `${componentName}Repository`,
      `${componentName}Service`
    ]
  }

  return dependencies[layer]
    .map(Util.lowerCaseFirstLetter); // poder ser que venha: Product, mas deve retornar product
}

async function executeWrites(pedingFilesToWrite) {
  return Promise.all(pedingFilesToWrite
    .map(
      ({ fileName, txtFile }) => fsPromises.writeFile(fileName, txtFile)
    ))
}

export async function createFiles({ mainPath, defaultMainFolder, layers, componentName }) {
  const keys = Object.keys(templates)
  const pedingFilesToWrite = []

  for (const layer of layers) {

    const chosenTemplate = keys.find(key => key.includes(layer))
    if (!chosenTemplate) {
      return { error: 'the chosen layer doesnt have a template' }
    }

    const template = templates[chosenTemplate]
    const targetFolder = `${mainPath}/${defaultMainFolder}/${layer}`
    const dependencies = defaultDependencies(layer, componentName)

    const { fileName, template: txtFile } = template(componentName, ...dependencies)
    const fileNameTemplate = `${targetFolder}/${Util.lowerCaseFirstLetter(fileName)}.js`
    pedingFilesToWrite.push({ fileName: fileNameTemplate, txtFile })
  }

  await executeWrites(pedingFilesToWrite)

  return { success: true }
}