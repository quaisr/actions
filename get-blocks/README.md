# Quaisr Register Block Action

This GitHub Action lists Blocks in the Quaisr registry.

## Inputs

| Name           | Description                | Required | Default |
| -------------- | -------------------------- | -------- | ------- |
| `registry-url` | URL of the Quaisr registry | Yes      |         |

## Required Environment Variables

- `QUAISR_API_TOKEN`: Authentication token for the Quaisr API. This should be stored as a GitHub secret.

## Usage Example

```yaml
- name: Get blocks
  uses: quaisr/actions/get-blocks@v1
  with:
    registry-url: "https://quaisr.example.com"
  env:
    QUAISR_API_TOKEN: ${{ secrets.QUAISR_API_TOKEN }}
```
