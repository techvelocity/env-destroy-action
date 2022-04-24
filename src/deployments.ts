import {Octokit} from '@octokit/action'

const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? '?/?').split('/')

export async function deleteAllDeployments(): Promise<void> {
  const octokit = new Octokit()
  const ref = process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF || '?'

  const deployments = await octokit.repos.listDeployments({
    owner,
    repo,
    ref
  })

  for (const deployment of deployments.data) {
    await octokit.repos.createDeploymentStatus({
      owner,
      repo,
      deployment_id: deployment.id,
      state: 'inactive'
    })

    await octokit.repos.deleteDeployment({
      owner,
      repo,
      deployment_id: deployment.id
    })
  }
}
