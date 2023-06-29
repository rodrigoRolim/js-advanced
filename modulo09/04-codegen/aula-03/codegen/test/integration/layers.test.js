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

async function getFolders({ mainPath, defaultMainFolder }) {
  return fsPromises.readdir(join(mainPath, defaultMainFolder))
}

describe('#Integration - Layers - Layers Structure', () => {
  const config = {
    defaultMainFolder: 'src',
    mainPath: '',
    layers: ['service', 'factory', 'repository'].sort() // o sistema retorna em ordem alfabética
  }
  beforeAll(async () => {
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'skeleton-'))
  })

  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  afterAll(async () => {
    await fsPromises.rm(config.mainPath, { recursive: true })
  })
  test('should not create folder if it exists', async () => {
    const beforeRun = await fsPromises.readdir(config.mainPath)

    await createLayersIfNotExists(config)

    const afterRun = await getFolders(config)
    expect(beforeRun).not.toStrictEqual(afterRun)
    expect(afterRun).toEqual(config.layers)
  })
  test('should create folder if it doenst exists', async () => {
    const beforeRun = await getFolders(config)
    await createLayersIfNotExists(config)

    const afterRun = await getFolders(config)
    expect(afterRun).toEqual(beforeRun)
  })
})

