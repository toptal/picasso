#!/usr/bin/env node

/**
 * Script to help configure OIDC trusted publishing for all packages in the monorepo
 * 
 * This script will:
 * 1. Discover all packages in the monorepo
 * 2. Generate a list of packages that need OIDC configuration
 * 3. Provide NPM CLI commands to configure trusted publishing
 * 
 * Usage: node bin/configure-oidc-packages.js
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔍 Discovering packages in the monorepo...\n');

// Find all package.json files in packages directories
const packagePaths = glob.sync('packages/*/package.json')
  .concat(glob.sync('packages/base/*/package.json'));

const packages = [];

packagePaths.forEach(packagePath => {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    // Skip private packages
    if (packageJson.private) {
      return;
    }
    
    // Only include @toptal scoped packages
    if (packageJson.name && packageJson.name.startsWith('@toptal/')) {
      packages.push({
        name: packageJson.name,
        version: packageJson.version,
        path: packagePath,
        directory: path.dirname(packagePath)
      });
    }
  } catch (error) {
    console.warn(`⚠️  Warning: Could not read ${packagePath}: ${error.message}`);
  }
});

console.log(`📦 Found ${packages.length} publishable packages:\n`);

packages.forEach(pkg => {
  console.log(`  • ${pkg.name}@${pkg.version}`);
});

console.log('\n' + '='.repeat(80));
console.log('📋 OIDC TRUSTED PUBLISHING CONFIGURATION');
console.log('='.repeat(80));

console.log(`
🔧 To configure OIDC trusted publishing, you need to:

1. **Visit each package page on NPM**:
   For each package listed above, go to:
   https://www.npmjs.com/package/[PACKAGE_NAME]/settings/publishing

2. **Add GitHub Actions as Trusted Publisher**:
   - Click "Add a trusted publisher"
   - Select "GitHub Actions"
   - Configure with:
     * Repository: toptal/picasso
     * Workflow: .github/workflows/release.yml
     * Environment: (leave empty)

3. **Packages to configure**:
`);

packages.forEach(pkg => {
  console.log(`   • ${pkg.name}`);
  console.log(`     📍 https://www.npmjs.com/package/${encodeURIComponent(pkg.name)}/settings/publishing`);
});

console.log(`
📝 **Quick Configuration Checklist**:

${packages.map((pkg, index) => `   ${index + 1}. [ ] ${pkg.name}`).join('\n')}

🚀 **After Configuration**:

1. Test with the new OIDC workflow:
   \`\`\`bash
   # Trigger the OIDC release workflow manually
   gh workflow run release-oidc.yml
   \`\`\`

2. Test alpha releases:
   \`\`\`
   # Comment on a PR:
   @toptal-bot run package:alpha-release-oidc
   \`\`\`

3. Monitor the first few releases to ensure everything works correctly.

⚠️  **Important Notes**:
- You need maintainer access to each package on NPM
- Configuration must be done manually through the NPM web interface
- Each package needs individual configuration
- The workflow file path must match exactly: .github/workflows/release.yml

🔒 **Security Benefits**:
- No more long-lived NPM tokens
- Automatic provenance attestations
- Reduced credential management overhead
- Enhanced supply chain security
`);

console.log('\n' + '='.repeat(80));
console.log('✅ Configuration guide complete!');
console.log('='.repeat(80));
