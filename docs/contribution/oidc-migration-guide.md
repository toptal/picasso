# NPM OIDC Trusted Publishing Setup Guide

This guide explains how to configure NPM OIDC trusted publishing for the Picasso repository. OIDC is now the default publishing method for enhanced security.

## Overview

OIDC (OpenID Connect) trusted publishing eliminates the need for long-lived NPM tokens by allowing GitHub Actions to authenticate directly with NPM using short-lived tokens. This provides:

- ✅ **Enhanced Security**: No long-lived tokens to manage or rotate
- ✅ **Automatic Provenance**: Built-in supply chain security attestations
- ✅ **Simplified Management**: No need to store sensitive tokens in secrets
- ✅ **Audit Trail**: Better visibility into who published what and when

## Prerequisites

1. **NPM Account Access**: You need maintainer access to all packages in the `@toptal` scope
2. **Package Registration**: Each package must be individually configured for trusted publishing
3. **GitHub Repository**: Must be public or have NPM Pro/Teams plan for private repos

## Setup Steps

### Step 1: NPM Configuration

For each package in the monorepo, configure trusted publishing:

1. **Navigate to Package Settings**:
   - Go to https://www.npmjs.com/package/@toptal/[package-name]
   - Click "Settings" tab
   - Select "Publishing" from the sidebar

2. **Add Trusted Publisher**:
   - Click "Add a trusted publisher"
   - Select "GitHub Actions" as the provider
   - Configure:
     - **Repository**: `toptal/picasso`
     - **Workflow**: `.github/workflows/release.yml`
     - **Environment**: Leave empty

3. **Packages to Configure**:
   ```
   @toptal/picasso
   @toptal/picasso-forms
   @toptal/picasso-charts
   @toptal/picasso-provider
   @toptal/picasso-rich-text-editor
   @toptal/picasso-query-builder
   @toptal/picasso-pictograms
   @toptal/picasso-tailwind
   @toptal/picasso-tailwind-merge
   @toptal/picasso-codemod
   @toptal/shared
   @toptal/topkit-analytics-charts
   ... (all packages in packages/ and packages/base/)
   ```

### Step 2: Verification

1. **Test Release Process**:
   - Create a test changeset: `yarn changeset`
   - Merge to master and verify automatic publishing
   - Check that provenance attestations are generated

2. **Verify Alpha Releases**:
   - Comment `@toptal-bot run package:alpha-release` on a PR
   - Confirm alpha packages publish successfully

3. **Monitor Logs**:
   - Check GitHub Actions logs for OIDC authentication
   - Verify no NPM_TOKEN references in logs
   - Confirm provenance attestations in NPM package pages

## Current Implementation

The repository is now configured with OIDC trusted publishing as the default:

### 1. Workflow Permissions
```yaml
permissions:
  contents: write
  issues: write
  pull-requests: write
  id-token: write  # Required for OIDC token requests
```

### 2. Node.js Setup
```yaml
- name: Set up Node.js
  uses: actions/setup-node@v4
  with:
    node-version: 20.18
    registry-url: 'https://registry.npmjs.org'  # Enables OIDC auth
```

### 3. Publishing Command
```yaml
publish: yarn release  # Uses --provenance flag by default
```

### 4. Environment Variables
```yaml
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  # NODE_AUTH_TOKEN is automatically set by setup-node action
  # No NPM_TOKEN needed
```

## Legacy Support

If you need to fallback to token-based publishing temporarily:

1. **Use Legacy Script**:
   ```bash
   yarn release:legacy  # Publishes without --provenance flag
   ```

2. **Update Workflow Temporarily**:
   - Add `NPM_TOKEN` environment variable back to workflow
   - Remove `registry-url` from setup-node action
   - Change `publish: yarn release` to `publish: yarn release:legacy`

## Troubleshooting

### Common Issues

1. **"Authentication failed"**:
   - Verify package is configured for trusted publishing
   - Check repository name matches exactly: `toptal/picasso`
   - Ensure workflow path is correct: `.github/workflows/release.yml`

2. **"Package not found"**:
   - Verify package exists and you have maintainer access
   - Check package name spelling in NPM settings

3. **"Provenance generation failed"**:
   - Ensure `--provenance` flag is used in publish command
   - Verify `id-token: write` permission is set

### Debugging Steps

1. **Check OIDC Token**:
   ```yaml
   - name: Debug OIDC Token
     run: |
       echo "ACTIONS_ID_TOKEN_REQUEST_URL: $ACTIONS_ID_TOKEN_REQUEST_URL"
       echo "ACTIONS_ID_TOKEN_REQUEST_TOKEN: [REDACTED]"
   ```

2. **Verify Registry Configuration**:
   ```yaml
   - name: Check NPM Config
     run: |
       npm config list
       npm whoami
   ```

## Benefits After Migration

- 🔒 **No more token rotation**: OIDC tokens are automatically managed
- 📋 **Provenance attestations**: Automatic supply chain security metadata
- 🔍 **Better audit trail**: Clear visibility into publishing events
- ⚡ **Simplified CI/CD**: No secret management overhead
- 🛡️ **Reduced attack surface**: No long-lived credentials to compromise

## Support

For issues or questions:
- Check GitHub Actions logs for detailed error messages
- Verify NPM package settings for trusted publishing configuration
- Consult [NPM OIDC documentation](https://docs.npmjs.com/trusted-publishers)
- Review [GitHub OIDC documentation](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)
