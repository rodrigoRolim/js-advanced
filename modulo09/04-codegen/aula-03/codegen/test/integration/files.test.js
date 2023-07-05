import {
  expect,
  describe,
  test,
  jest,
  beforeEach,
  afterAll,
  beforeAll
} from '@jest/globals'

import { tmpdir } from 'os'
import fsPromises from 'fs/promises'
import { join } from 'path'
import { createLayersIfNotExists } from '../../../../aula-02/codegen/src/createLayers.js'
import Util from "../../src/util.js"
import { createFiles } from '../../src/createFile.js'

function getAllFunctionsFromInstance(instance) {
  Reflect.ownKeys(Reflect.getPrototypeOf(instance))
    .filter(method => method !== 'constructor')
}

function generateFilePath({ mainPath, defaultMainFolder, layers, componentName }) {
  return layers.map(layer => {
    // factory
    // factory/heroesFactory.js
    const filename = `${componentName}/${Util.upperCaseFirstLetter(layer)}`
    // mainPath: /Documents/project/jsexpert
    // defaultMainFolder: src
    // layers:  factory
    // filename: heroesFactory.js
    return join(mainPath, defaultMainFolder, layer, filename)
  })
}

describe('#Integration - Layers - Layers Structure', () => {
  const config = {
    defaultMainFolder: 'src',
    mainPath: '',
    layers: ['service', 'factory', 'repository'].sort(), // o sistema retorna em ordem alfabética
    componentName: 'heroes'
  }
  // como não obtivemos o caminho relativo estamos pensando que o comando
  // vai rodar do package.json que está na raiz, por isso, iniciamos pegando da
  // pasta test
  const packageJSON = 'package.json'
  const packageJSONLocation = join('./test/integration/mocks', packageJSON)
  beforeAll(async () => {
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'layers-'))
    await fsPromises.copyFile(
      packageJSONLocation,
      join(config.mainPath, packageJSON)
    )
    await createLayersIfNotExists(config)
  })

  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  afterAll(async () => {
    await fsPromises.rm(config.mainPath, { recursive: true })
  })
  test('Repository class should have create, read, update and delete methods', async () => {
    const myConfig = {
      ...config,
      layers: ['repository']
    }
    
    await createFiles(myConfig)
    const [ repositoryFile ] = generateFilePath(myConfig)
    const { default: Repository } = await import(repositoryFile)
    const instance = new Repository()
    const expectNotImplemented = fn => expect(() => fn.call()).rejects.toEqual("method not implemented")

    expectNotImplemented(instance.create)
    expectNotImplemented(instance.read)
    expectNotImplemented(instance.update)
    expectNotImplemented(instance.delete)

  })
  test('Service should have the same signature as repository and call all its methods', async () => {
    const myConfig = {
      ...config,
      layers: ['repository', 'service']
    }
    
    await createFiles(myConfig)
    const [ repositoryFile, serviceFile ] = generateFilePath(myConfig)
    const { default: Repository } = await import(repositoryFile)
    const { default: Service } = await import(serviceFile)
    const repository  = new Repository()
    const service = new Service({ repository })

    const allRepositoryMethods = getAllFunctionsFromInstance(repository)

    allRepositoryMethods
      .forEach(method => jest.spyOn(repository, method).mockResolvedValue())

    // executa todos os métodos de service
    getAllFunctionsFromInstance(service)
      .forEach(method => service[method].call(service, []))

    allRepositoryMethods
      .forEach(method => expect(repository[method]).toHaveBeenCalled())
  })
  test('Factory instance should match layers', async () => {
    const myConfig = {
      ...config
    }
    
    await createFiles(myConfig)
    const [ factoryFile, repositoryFile, serviceFile ] = generateFilePath(myConfig)
    const { default: Repository } = await import(repositoryFile)
    const { default: Service } = await import(serviceFile)
    const { default: Factory } = await import(factoryFile)
    
    const expectedInstance = new Service({ repository: new Repository() })
    const instance = Factory.getInstance()
    
    expect(instance).toMatchObject(expectedInstance)
    expect(instance).toBeInstanceOf(Service)
  })
})

