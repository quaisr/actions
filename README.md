# Quaisr GitHub Actions

Official GitHub Actions for automating workflows with the Quaisr platform.

## Available Actions

This repository contains the following actions:

### Register Block

Registers a block with the Quaisr registry.

```yaml
- name: Register block
  uses: quaisr/actions/register-block@v1
  with:
    registry-url: "https://api.quaisr.io/registry/register"
    directory: "./my-block"
  env:
    QUAISR_API_TOKEN: ${{ secrets.QUAISR_API_TOKEN }}
```

#### Inputs

| Name              | Description                                     | Required | Default |
| ----------------- | ----------------------------------------------- | -------- | ------- |
| `registry-url`    | URL of the Quaisr registry                      | Yes      |         |
| `directory`       | Directory containing the block to register      | No       | `.`     |
| `ignore-patterns` | Comma-separated list of glob patterns to ignore | No       | `TODO`  |

## Required Environment Variables

- `QUAISR_API_TOKEN`: Authentication token for the Quaisr API. This should be stored as a GitHub secret.

## Usage Example

Here's an example workflow that uses the register-block action:

```yaml
name: Register Quaisr Block

on:
  push:
    branches: [main]

jobs:
  register:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Register block
        uses: quaisr/actions/register-block@v1
        with:
          directory: "."
        env:
          QUAISR_API_TOKEN: ${{ secrets.QUAISR_API_TOKEN }}
```

## License

MIT
