#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { createLayersIfNotExists } from './createLayers.js'
import { createFiles } from './createFile.js'

const { argv: { componentName }} = yargs(hideBin(process.argv))
// codegen skeleton
  .command('skeleton', 'creates a project skeleton', (builder) => {
    return builder
      .option('component-name', {
        alias: 'c',
        demandOption: true,
        describe: 'component\'s name',
        type: 'array'
      })

      .example('skeleton --component-name product', 'creates a project with a single domain')
      .example('skeleton -c product -c person -c colors', 'creates a project with a list of domain')
  })
  .epilog('copyright 2023 - Rodrigo Rolim corporation')

const env = process.env.NODE_ENV
const defaultMainFolder = env === 'dev' ? 'tmp' : 'src'

const layers = [ 'repository', 'service', 'factory' ].sort()
const config = {
  layers,
  defaultMainFolder,
  mainPath: '.'
}

await createLayersIfNotExists(config)

const pedingPromises = []

for (const domain of componentName) {
  const result = createFiles({
    ...config,
    componentName: domain
  })

  pedingPromises.push(result)
}

await Promise.all(pedingPromises)