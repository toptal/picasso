#!/usr/bin/env node

import { writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { discoverStories } from './doc-gen/story-resolver.mjs'
import { parseStoryFile, collectVariableChapterCalls } from './doc-gen/parser.mjs'
import { extractProps, resolveComponentFile, mergeProps } from './doc-gen/props-extractor.mjs'
import { readExample } from './doc-gen/example-reader.mjs'
import {
  renderComponentMarkdown,
  renderTutorialMarkdown,
  renderComponentIndex,
  renderTutorialIndex,
  renderLlmsTxt,
  toFileName,
} from './doc-gen/markdown-renderer.mjs'

const ROOT = resolve(import.meta.dirname, '..')
const DOCS_ROOT = resolve(ROOT, 'llm-docs')
const DOCS_COMPONENTS = resolve(DOCS_ROOT, 'components')
const DOCS_TUTORIALS = resolve(DOCS_ROOT, 'tutorials')

mkdirSync(DOCS_COMPONENTS, { recursive: true })
mkdirSync(DOCS_TUTORIALS, { recursive: true })

console.log('Discovering story files...')
const stories = discoverStories()
console.log(`Found ${stories.length} story files`)

// Step 1: Parse all stories
console.log('Parsing story files...')
const parsed = []
for (const story of stories) {
  const data = parseStoryFile(story.source, story.filePath)
  // Second pass for variable-assigned chapters
  collectVariableChapterCalls(story.source, story.filePath, data.chapters)
  parsed.push({ ...story, ...data })
}

// Step 2: Build maps for cross-referencing
const storyByImportName = new Map()
for (const story of parsed) {
  // Map by the directory-relative import path that other stories use
  // e.g., import modalTitleStory from '../../ModalTitle/story'
  const dir = dirname(story.filePath)
  storyByImportName.set(dir, story)
}

// Step 3: Resolve cross-references
console.log('Resolving cross-references...')
for (const page of parsed) {
  if (page.type !== 'parent') continue

  // Resolve connected children
  page.connectedChildren = []
  for (const connLocalName of page.connections) {
    const importInfo = page.imports.get(connLocalName)
    if (!importInfo) continue

    const resolvedDir = resolveImportDir(importInfo.source, page.filePath)
    if (resolvedDir) {
      const childStory = storyByImportName.get(resolvedDir)
      if (childStory) {
        page.connectedChildren.push(childStory)
      }
    }
  }

  // Resolve componentDocs cross-references in Props tab chapters
  for (const chapter of page.chapters) {
    for (const section of chapter.sections) {
      if (section.type === 'componentDocs' && section.crossRef) {
        const importInfo = page.imports.get(section.crossRef)
        if (!importInfo) continue

        const resolvedDir = resolveImportDir(importInfo.source, page.filePath)
        if (resolvedDir) {
          const childStory = storyByImportName.get(resolvedDir)
          if (childStory?.exportedComponentDocs) {
            section.name = childStory.exportedComponentDocs.name
            section.componentLocalName = childStory.exportedComponentDocs.componentLocalName
            section.description = childStory.exportedComponentDocs.description
            section.additionalDocs = childStory.exportedComponentDocs.additionalDocs
            // Resolve the component's imports from the child story
            section._childImports = childStory.imports
            section._childFilePath = childStory.filePath
          }
        }
      }
    }
  }
}

// Step 4: Extract props from TypeScript sources
console.log('Extracting component props...')
for (const page of parsed) {
  if (page.type !== 'parent' && page.type !== 'child') continue

  for (const chapter of page.chapters) {
    for (const section of chapter.sections) {
      if (section.type !== 'componentDocs') continue
      if (!section.componentLocalName) continue

      // Resolve component file path
      const imports = section._childImports || page.imports
      const filePath = section._childFilePath || page.filePath
      const componentFile = resolveComponentFile(section.componentLocalName, imports, filePath)

      if (componentFile) {
        const rawProps = extractProps(componentFile)
        section.resolvedProps = mergeProps(rawProps, section.additionalDocs)
      } else {
        section.resolvedProps = null
      }
    }
  }
}

// Step 5: Read example file source code
console.log('Reading example files...')
for (const page of parsed) {
  resolveExamples(page.chapters, page.filePath)
  if (page.connectedChildren) {
    for (const child of page.connectedChildren) {
      resolveExamples(child.chapters, child.filePath)
    }
  }
}

function resolveExamples(chapters, storyFilePath) {
  for (const chapter of chapters) {
    for (const section of chapter.sections) {
      if (section.type !== 'example') continue
      if (!section.source) continue

      const result = readExample(section.source, section.module, storyFilePath)
      if (result) {
        section.resolvedSource = result.source
      } else {
        console.warn(`  Warning: example not found: ${section.source}`)
        section.resolvedSource = null
      }
    }
  }
}

// Step 6: Render markdown
console.log('Generating markdown files...')
const componentPages = []
const tutorialPages = []
let componentCount = 0
let tutorialCount = 0

for (const page of parsed) {
  if (page.type === 'doc-page') continue // Skip README/CHANGELOG pages
  if (page.type === 'docs-only' || page.type === 'child') continue // Merged into parents
  if (page.type !== 'parent') continue

  const isTutorial = page.section === 'Tutorials'

  const md = isTutorial
    ? renderTutorialMarkdown(page)
    : renderComponentMarkdown(page)

  const fileName = toFileName(page.name) + '.md'

  if (isTutorial) {
    const outPath = resolve(DOCS_TUTORIALS, fileName)
    writeFileSync(outPath, md)
    tutorialPages.push(page)
    tutorialCount++
  } else {
    const outPath = resolve(DOCS_COMPONENTS, fileName)
    writeFileSync(outPath, md)
    componentPages.push(page)
    componentCount++
  }
}

// Step 7: Generate index files and root llms.txt
const indexMd = renderComponentIndex(componentPages)
writeFileSync(resolve(DOCS_COMPONENTS, 'index.md'), indexMd)

if (tutorialPages.length > 0) {
  const tutorialIndex = renderTutorialIndex(tutorialPages)
  writeFileSync(resolve(DOCS_TUTORIALS, 'index.md'), tutorialIndex)
}

const llmsTxt = renderLlmsTxt(componentPages, tutorialPages)
writeFileSync(resolve(DOCS_ROOT, 'llms.txt'), llmsTxt)

console.log(`\nDone! Generated:`)
console.log(`  ${componentCount} component docs → llm-docs/components/`)
console.log(`  ${tutorialCount} tutorial docs → llm-docs/tutorials/`)
console.log(`  llm-docs/llms.txt (root index)`)
console.log(`  llm-docs/components/index.md`)
console.log(`  llm-docs/tutorials/index.md`)

/**
 * Resolve an import source path to the absolute directory of the story file.
 */
function resolveImportDir(importSource, fromFilePath) {
  if (!importSource.startsWith('.')) return null
  const fromDir = dirname(fromFilePath)
  const resolved = resolve(fromDir, importSource)
  return resolved
}
