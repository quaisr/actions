# Publishing Quaisr GitHub Actions

This guide explains how to publish and version the Quaisr GitHub Actions so others can use them.

## Prerequisites

- A GitHub account with owner/admin access to the Quaisr organization
- Git installed on your local machine

## Repository Structure

Each action is a composite action — an `action.yml` with `runs.using: composite` and one or more `bash` steps that shell out to `curl`, `tar`, etc.

```
quaisr/actions/
├── <action-name>/             # One directory per action
│   ├── action.yml
│   └── README.md
├── .github/
│   └── workflows/             # CI workflows
└── README.md
```

## Versioning

All actions in this repo are versioned together under a single set of tags. Users reference them like:

```yaml
- uses: quaisr/actions/register-block@v1
```

To cut a release:

1. Commit any changes on `main`.
2. Tag the release. Move the floating major tag and add an immutable patch tag:

   ```bash
   git tag -fa v1 -m "v1"
   git tag -a v1.2.0 -m "v1.2.0"
   git push origin main
   git push origin v1 --force
   git push origin v1.2.0
   ```

   For a new major version:

   ```bash
   git tag -a v2 -m "v2"
   git tag -a v2.0.0 -m "v2.0.0"
   git push origin v2 v2.0.0
   ```

## Adding a New Action

1. Create a directory with `action.yml` and `README.md`:

   ```
   new-action/
   ├── action.yml
   └── README.md
   ```

2. In `action.yml`, use `runs.using: composite` and declare inputs explicitly. Pass secrets in via `env:` on the step — composite actions do not inherit caller secrets implicitly.

3. Add a job to `.github/workflows/` that exercises the action end-to-end.

4. Commit, then tag a release as described above.

## Usage Recommendations

Recommend callers pin actions by major version or exact tag:

- Stability: `quaisr/actions/register-block@v1.0.0`
- Track minor/patch updates within a major: `quaisr/actions/register-block@v1`
- Development only: `quaisr/actions/register-block@main`

## Security

- The actions require `QUAISR_API_TOKEN`. Callers must pass it via `env:` sourced from a GitHub secret.
- Never commit tokens or credentials to this repository.

## GitHub Marketplace

To list an action in the Marketplace:

1. Open the repository on GitHub
2. Click **Edit repository details** in the About section
3. Check **Publish this Action to the GitHub Marketplace**
4. Fill in the required fields and submit
