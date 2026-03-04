import { withCompilerOptions } from 'react-docgen-typescript'
import { resolve, dirname, basename } from 'path'
import { existsSync } from 'fs'
import glob from 'glob'
import ts from 'typescript'

const { sync: globSync } = glob

const ROOT = resolve(import.meta.dirname, '../..')

// Initialize parser with compiler options matching tsconfig.base.json
const parser = withCompilerOptions(
  {
    baseUrl: ROOT,
    module: ts.ModuleKind.ES2020,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    target: ts.ScriptTarget.ES2015,
    skipLibCheck: true,
    esModuleInterop: true,
    jsx: ts.JsxEmit.React,
    strict: true,
  },
  {
    savePropValueAsString: true,
    shouldExtractLiteralValuesFromEnum: true,
    shouldRemoveUndefinedFromOptional: true,
    propFilter: prop => {
      if (!prop.description || prop.description.length === 0) return false
      if (prop.parent) {
        return !prop.parent.fileName.includes('node_modules')
      }
      return true
    },
  }
)

/**
 * Extract props from a component TypeScript source file.
 * Returns an array of { name, type, defaultValue, description, required }
 * or null if extraction fails.
 */
export function extractProps(componentFilePath) {
  if (!componentFilePath || !existsSync(componentFilePath)) {
    return null
  }

  try {
    const docs = parser.parse(componentFilePath)
    if (!docs || docs.length === 0) return null

    // Take the first (or primary) component doc
    const doc = docs[0]
    const props = []

    for (const [propName, propInfo] of Object.entries(doc.props)) {
      props.push({
        name: propName,
        type: formatType(propInfo.type),
        defaultValue: propInfo.defaultValue?.value ?? '',
        description: propInfo.description.replace(/^@deprecated\s*/, ''),
        required: propInfo.required,
        deprecated: propInfo.description.startsWith('@deprecated'),
      })
    }

    return props
  } catch (err) {
    console.warn(`  Warning: props extraction failed for ${componentFilePath}: ${err.message}`)
    return null
  }
}

function formatType(type) {
  if (!type) return 'unknown'

  const name = type.name || ''

  if (name === 'enum' && type.value) {
    return type.value.map(v => v.value).join(' | ')
  }

  return name
}

/**
 * Resolve a component's local name from imports to an actual .tsx source file.
 */
export function resolveComponentFile(componentLocalName, imports, storyFilePath) {
  const importInfo = imports.get(componentLocalName)
  if (!importInfo) return null

  const importSource = importInfo.source
  const storyDir = dirname(storyFilePath)

  // Relative import: e.g., '../Button'
  if (importSource.startsWith('.')) {
    const importDir = resolve(storyDir, importSource)
    const dirName = basename(importDir)

    const candidates = [
      resolve(importDir, `${dirName}.tsx`),
      resolve(importDir, 'index.tsx'),
      resolve(importDir, `${dirName}.ts`),
      resolve(importDir, 'index.ts'),
      `${importDir}.tsx`,
      `${importDir}.ts`,
    ]

    for (const c of candidates) {
      if (existsSync(c)) return c
    }
  }

  // Package import: e.g., '@toptal/picasso'
  if (importSource.startsWith('@toptal/')) {
    const componentName = importInfo.importedName
    // Search for the component file in packages
    const patterns = [
      `packages/base/*/src/${componentName}/${componentName}.tsx`,
      `packages/*/src/${componentName}/${componentName}.tsx`,
      `packages/base/*/src/${componentName}/index.tsx`,
    ]

    for (const pattern of patterns) {
      const matches = globSync(pattern, { cwd: ROOT })
      if (matches.length > 0) {
        return resolve(ROOT, matches[0])
      }
    }
  }

  return null
}

/**
 * Merge extracted props with additionalDocs overrides.
 * Follows the merge logic from documentation-generator.ts.
 */
export function mergeProps(extractedProps, additionalDocs) {
  if (!additionalDocs || typeof additionalDocs !== 'object') return extractedProps
  if (!extractedProps) return []

  const propsMap = new Map()
  for (const prop of extractedProps) {
    propsMap.set(prop.name, { ...prop })
  }

  for (const [key, override] of Object.entries(additionalDocs)) {
    if (typeof override !== 'object' || override === null) continue
    if (propsMap.has(key)) {
      const existing = propsMap.get(key)
      // Merge override fields into existing
      if (override.type) {
        existing.type = formatAdditionalType(override.type)
      }
      if (override.description !== undefined) {
        existing.description = override.description
      }
      if (override.defaultValue !== undefined) {
        existing.defaultValue = String(override.defaultValue)
      }
      if (override.name) {
        existing.name = override.name
      }
    } else {
      // Add new prop
      propsMap.set(key, {
        name: override.name || key,
        type: formatAdditionalType(override.type),
        defaultValue: override.defaultValue ? String(override.defaultValue) : '',
        description: override.description || '',
        required: override.required || false,
      })
    }
  }

  return Array.from(propsMap.values())
}

function formatAdditionalType(type) {
  if (!type) return 'unknown'
  if (typeof type === 'string') return type

  // Object type from additionalDocs: { name, enums, description }
  if (type.enums && Array.isArray(type.enums)) {
    return type.enums.join(' | ')
  }
  if (type.name === 'function' && type.description) {
    return type.description
  }
  if (type.description) {
    return `${type.name}: ${type.description}`
  }
  return type.name || 'unknown'
}
