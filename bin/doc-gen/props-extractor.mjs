/* eslint-disable import/no-extraneous-dependencies */
import { withCompilerOptions } from 'react-docgen-typescript'
import { resolve, dirname, basename } from 'path'
import { existsSync } from 'fs'
import glob from 'glob'
import ts from 'typescript'

const { sync: globSync } = glob

const ROOT = resolve(import.meta.dirname, '../..')

const propFilter = (prop) => {
  if (!prop.description || prop.description.length === 0) {
    return false
  }

  if (prop.parent) {
    return !prop.parent.fileName.includes('node_modules')
  }

  return true
}

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
    propFilter,
  }
)

const formatType = (type) => {
  if (!type) {
    return 'unknown'
  }

  const name = type.name || ''

  if (name === 'enum' && type.value) {
    return type.value.map((val) => val.value).join(' | ')
  }

  return name
}

const formatAdditionalType = (type) => {
  if (!type) {
    return 'unknown'
  }

  if (typeof type === 'string') {
    return type
  }

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

/**
 * Extract props from a component TypeScript source file.
 */
export const extractProps = (componentFilePath) => {
  if (!componentFilePath || !existsSync(componentFilePath)) {
    return null
  }

  try {
    const docs = parser.parse(componentFilePath)

    if (!docs || docs.length === 0) {
      return null
    }

    const doc = docs[0]

    return Object.entries(doc.props).map(([propName, propInfo]) => ({
      name: propName,
      type: formatType(propInfo.type),
      defaultValue: propInfo.defaultValue?.value ?? '',
      description: propInfo.description.replace(/^@deprecated\s*/, ''),
      required: propInfo.required,
      deprecated: propInfo.description.startsWith('@deprecated'),
    }))
  } catch (err) {
    console.warn(`  Warning: props extraction failed for ${componentFilePath}: ${err.message}`)

    return null
  }
}

const buildRelativeCandidates = (importSource, storyDir) => {
  const importDir = resolve(storyDir, importSource)
  const dirName = basename(importDir)

  return [
    resolve(importDir, `${dirName}.tsx`),
    resolve(importDir, 'index.tsx'),
    resolve(importDir, `${dirName}.ts`),
    resolve(importDir, 'index.ts'),
    `${importDir}.tsx`,
    `${importDir}.ts`,
  ]
}

const findFirstExisting = (candidates) => {
  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate
    }
  }

  return null
}

const resolveRelativeImport = (importSource, storyDir) => {
  const candidates = buildRelativeCandidates(importSource, storyDir)

  return findFirstExisting(candidates)
}

const resolvePackageImport = (importInfo) => {
  const componentName = importInfo.importedName
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

  return null
}

/**
 * Resolve a component's local name from imports to an actual .tsx source file.
 */
export const resolveComponentFile = (componentLocalName, imports, storyFilePath) => {
  const importInfo = imports.get(componentLocalName)

  if (!importInfo) {
    return null
  }

  const { source: importSource } = importInfo
  const storyDir = dirname(storyFilePath)

  if (importSource.startsWith('.')) {
    return resolveRelativeImport(importSource, storyDir)
  }

  if (importSource.startsWith('@toptal/')) {
    return resolvePackageImport(importInfo)
  }

  return null
}

const applyOverride = (existing, override) => {
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
}

const createNewProp = (key, override) => ({
  name: override.name || key,
  type: formatAdditionalType(override.type),
  defaultValue: override.defaultValue ? String(override.defaultValue) : '',
  description: override.description || '',
  required: override.required || false,
})

/**
 * Merge extracted props with additionalDocs overrides.
 */
export const mergeProps = (extractedProps, additionalDocs) => {
  if (!additionalDocs || typeof additionalDocs !== 'object') {
    return extractedProps
  }

  if (!extractedProps) {
    return []
  }

  const propsMap = new Map()

  for (const prop of extractedProps) {
    propsMap.set(prop.name, { ...prop })
  }

  for (const [key, override] of Object.entries(additionalDocs)) {
    if (typeof override !== 'object' || override === null) {
      continue
    }

    if (propsMap.has(key)) {
      applyOverride(propsMap.get(key), override)
    } else {
      propsMap.set(key, createNewProp(key, override))
    }
  }

  return Array.from(propsMap.values())
}
