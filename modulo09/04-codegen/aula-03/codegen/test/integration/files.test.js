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

async function generateFilePath({ mainPath, defaultMainFolder, layers, componentName }) {
  layers.map(layer => {
    const filename = `${componentName}/${Util.upperCaseFirstLetter(layer)}`
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
  test.todo('Repository class should have create, read, update and delete methods')
  test.todo('Service should have the same signature as repository and call all its methods')
  test.todo('Factory instance should match layers')
})

