import * as core from '@actions/core'
import {ExecOutput, getExecOutput} from '@actions/exec'

async function execVeloctl(token: string, args: string[]): Promise<ExecOutput> {
  const output = await getExecOutput('veloctl', args, {
    env: {
      VELOCITY_TOKEN: token,
      NO_COLOR: '1',
      ...process.env
    },
    ignoreReturnCode: true,
    silent: true
  })

  return output
}

export async function destroy(
  token: string,
  envName: string
): Promise<boolean> {
  const output = await execVeloctl(token, [
    'env',
    'destroy',
    '--confirm',
    envName
  ])

  core.info(`Destroy:\n${output.stdout}\n${output.stderr}`)
  return output.exitCode === 0
}
