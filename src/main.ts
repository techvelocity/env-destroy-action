import * as core from '@actions/core'
import {deleteAllDeployments} from './deployments'
import {destroy} from './veloctl'
import {download} from './download'

async function run(): Promise<void> {
  try {
    const velocityToken = core.getInput('velocity-token')
    if (!velocityToken) {
      throw new Error('Missing velocity-token')
    }

    const envName = core.getInput('name').toLowerCase()
    if (!envName) {
      throw new Error('Missing environment name')
    }

    if (core.getBooleanInput('use-gh-deployments')) {
      await deleteAllDeployments()
    }

    const veloctl = await download(core.getInput('version'))
    core.debug(`veloctl available at: ${veloctl}`)

    const destroyed = await destroy(velocityToken, envName)
    if (!destroyed) {
      throw new Error(`Unable to destroy the '${envName}' environment'`)
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
    throw error
  }
}

run()
