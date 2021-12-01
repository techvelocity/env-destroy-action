# env-destroy-action

This is a GitHub Action to destroy an environment in [Velocity](https://velocity.tech/).

## Examples

Incorporate the following action in your workflow to destroy an environment in Velocity using an authentication token (can be obtained from your organization's account manager), and an environment name:

```yml
steps:
  - uses: techvelocity/env-name-action@v1
    id: env-name
  - uses: techvelocity/env-destroy-action@v1
    with:
      velocity-token: ${{ secrets.VELOCITY_TOKEN }}
      name: ${{ steps.env-name.outputs.name }}
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Inputs

The following inputs are mandatory:

| Name             | Description                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------------- |
| `velocity-token` | Velocity's authentication token. It is strongly recommended that this value be retrieved from a GitHub secret. |
| `name`           | The environment name. It is strongly recommended to have a constant name for the same PR / branch.             |

The following inputs are optional:

| Name                 | Description                                                                                                                                                                               | Default  |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `use-gh-deployments` | Enables the usage of [Github Deployments API](https://docs.github.com/en/rest/reference/repos#deployments). When set to `true`, make sure the `GITHUB_TOKEN` environment variable is set. | `true`   |
| `version`            | Select a specific version of `veloctl` to use.                                                                                                                                            | `latest` |
