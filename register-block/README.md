# Quaisr Register Block Action

This GitHub Action registers a block with the Quaisr registry.

## Inputs

| Name              | Description                                     | Required | Default |
| ----------------- | ----------------------------------------------- | -------- | ------- |
| `registry-url`    | URL of the Quaisr registry                      | Yes      |         |
| `directory`       | Directory containing the block to register      | No       | `.`     |
| `ignore-patterns` | Comma-separated list of glob patterns to ignore | No       | `TODO`  |

## Required Environment Variables

- `QUAISR_API_TOKEN`: Authentication token for the Quaisr API. This should be stored as a GitHub secret.

## Usage Example

```yaml
- name: Register block
  uses: quaisr/actions/register-block@v1
  with:
    registry-url: "https://quaisr.example.com"
    directory: "./my-block"
    ignore-patterns: "TODO"
  env:
    QUAISR_API_TOKEN: ${{ secrets.QUAISR_API_TOKEN }}
```

## How It Works

This action performs the following steps:

1. Creates a tar archive of the specified directory, excluding files that match the ignore patterns
2. Uploads the archive to the Quaisr registry using the provided API token
3. Returns the registry response
