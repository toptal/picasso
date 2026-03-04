#!/usr/bin/env node

/* eslint-disable no-console */

import { writeFileSync, readFileSync, mkdirSync } from 'fs'
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
/**
 * Resolve an import source path to the absolute directory of the story file.
 */
const resolveImportDir = (importSource, fromFilePath) => {
  if (!importSource.startsWith('.')) {
    return null
  }

  const fromDir = dirname(fromFilePath)

  return resolve(fromDir, importSource)
}

const resolveExamples = (chapters, storyFilePath) => {
  for (const chapter of chapters) {
    for (const section of chapter.sections) {
      if (section.type !== 'example') {
        continue
      }

      if (!section.source) {
        continue
      }

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

const resolveChildConnection = (connLocalName, page, storyByImportName) => {
  const importInfo = page.imports.get(connLocalName)

  if (!importInfo) {
    return null
  }

  const resolvedDir = resolveImportDir(importInfo.source, page.filePath)

  if (!resolvedDir) {
    return null
  }

  return storyByImportName.get(resolvedDir) || null
}

const applyCrossRefToSection = (section, page, storyByImportName) => {
  const importInfo = page.imports.get(section.crossRef)

  if (!importInfo) {
    return
  }

  const resolvedDir = resolveImportDir(importInfo.source, page.filePath)

  if (!resolvedDir) {
    return
  }

  const childStory = storyByImportName.get(resolvedDir)

  if (!childStory?.exportedComponentDocs) {
    return
  }

  section.name = childStory.exportedComponentDocs.name
  section.componentLocalName = childStory.exportedComponentDocs.componentLocalName
  section.description = childStory.exportedComponentDocs.description
  section.additionalDocs = childStory.exportedComponentDocs.additionalDocs
  section._childImports = childStory.imports
  section._childFilePath = childStory.filePath
}

const resolveConnections = (page, storyByImportName) => {
  page.connectedChildren = []

  for (const connLocalName of page.connections) {
    const child = resolveChildConnection(connLocalName, page, storyByImportName)

    if (child) {
      page.connectedChildren.push(child)
    }
  }
}

const resolveCrossRefs = (page, storyByImportName) => {
  for (const chapter of page.chapters) {
    for (const section of chapter.sections) {
      if (section.type === 'componentDocs' && section.crossRef) {
        applyCrossRefToSection(section, page, storyByImportName)
      }
    }
  }
}

const resolvePropsForPage = (page) => {
  for (const chapter of page.chapters) {
    for (const section of chapter.sections) {
      if (section.type !== 'componentDocs' || !section.componentLocalName) {
        continue
      }

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

const writePage = (page, componentPages, tutorialPages) => {
  const isTutorial = page.section === 'Tutorials'

  const markdown = isTutorial
    ? renderTutorialMarkdown(page)
    : renderComponentMarkdown(page)

  const fileName = toFileName(page.name) + '.md'

  if (isTutorial) {
    writeFileSync(resolve(DOCS_TUTORIALS, fileName), markdown)
    tutorialPages.push(page)
  } else {
    writeFileSync(resolve(DOCS_COMPONENTS, fileName), markdown)
    componentPages.push(page)
  }
}

// --- Main pipeline ---

mkdirSync(DOCS_COMPONENTS, { recursive: true })
mkdirSync(DOCS_TUTORIALS, { recursive: true })
console.log('Discovering story files...')
const stories = discoverStories()

console.log(`Found ${stories.length} story files`)

// Step 1: Parse all stories
console.log('Parsing story files...')
const parsed = stories.map((story) => {
  const data = parseStoryFile(story.source, story.filePath)

  collectVariableChapterCalls(story.source, story.filePath, data.chapters)

  return { ...story, ...data }
})

// Step 2: Build maps for cross-referencing
const storyByImportName = new Map()

for (const story of parsed) {
  const dir = dirname(story.filePath)

  storyByImportName.set(dir, story)
}

// Step 3: Resolve cross-references
console.log('Resolving cross-references...')
for (const page of parsed) {
  if (page.type !== 'parent') {
    continue
  }

  resolveConnections(page, storyByImportName)
  resolveCrossRefs(page, storyByImportName)
}

// Step 4: Extract props from TypeScript sources
console.log('Extracting component props...')
for (const page of parsed) {
  if (page.type !== 'parent' && page.type !== 'child') {
    continue
  }

  resolvePropsForPage(page)
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

// Step 6: Render markdown
console.log('Generating markdown files...')
const componentPages = []
const tutorialPages = []

for (const page of parsed) {
  if (page.type !== 'parent') {
    continue
  }

  writePage(page, componentPages, tutorialPages)
}

// Step 7: Copy introduction (README)
const readmePath = resolve(ROOT, 'packages/picasso/README.md')
const readmeContent = readFileSync(readmePath, 'utf-8')

writeFileSync(resolve(DOCS_ROOT, 'initial-setup.md'), readmeContent)

// Step 8: Generate index files and root llms.txt
const indexMarkdown = renderComponentIndex(componentPages)

writeFileSync(resolve(DOCS_COMPONENTS, 'index.md'), indexMarkdown)

if (tutorialPages.length > 0) {
  const tutorialIndex = renderTutorialIndex(tutorialPages)

  writeFileSync(resolve(DOCS_TUTORIALS, 'index.md'), tutorialIndex)
}

const llmsTxt = renderLlmsTxt(componentPages, tutorialPages)

writeFileSync(resolve(DOCS_ROOT, 'llms.txt'), llmsTxt)

console.log(`\nDone! Generated:`)
console.log(`  ${componentPages.length} component docs → llm-docs/components/`)
console.log(`  ${tutorialPages.length} tutorial docs → llm-docs/tutorials/`)
console.log(`  llm-docs/llms.txt (root index)`)
console.log(`  llm-docs/components/index.md`)
console.log(`  llm-docs/tutorials/index.md`)
