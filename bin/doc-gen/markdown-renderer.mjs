/**
 * Render a parsed component page into LLM-optimized markdown.
 */
export function renderComponentMarkdown(page) {
  const lines = []

  // Title
  lines.push(`# ${page.name}`)
  lines.push('')

  // Description
  if (page.description) {
    lines.push(page.description)
    lines.push('')
  }

  // Props sections
  const propsChapters = page.chapters.filter(ch => ch.isPropsTab)
  if (propsChapters.length > 0) {
    lines.push('## Props')
    lines.push('')

    for (const chapter of propsChapters) {
      for (const section of chapter.sections) {
        if (section.type === 'componentDocs' && section.resolvedProps) {
          if (section.name) {
            lines.push(`### ${section.name}`)
            lines.push('')
          }
          if (section.description && !section.description.startsWith('[')) {
            lines.push(section.description)
            lines.push('')
          }
          lines.push(renderPropsTable(section.resolvedProps))
          lines.push('')
        }
      }
    }
  }

  // Manual docs (for hooks, etc.)
  for (const chapter of page.chapters) {
    if (chapter.isPropsTab) continue

    for (const section of chapter.sections) {
      if (section.type === 'docs' && section.docs) {
        lines.push(renderManualDocsTable(section.docs))
        lines.push('')
      }
    }
  }

  // Examples and text sections
  const contentChapters = page.chapters.filter(ch => !ch.isPropsTab)
  for (const chapter of contentChapters) {
    if (chapter.title) {
      lines.push(`## ${chapter.title}`)
      lines.push('')
      if (chapter.description) {
        lines.push(chapter.description)
        lines.push('')
      }
    }

    for (const section of chapter.sections) {
      if (section.type === 'text') {
        if (section.title) {
          lines.push(`### ${section.title}`)
          lines.push('')
        }
        if (section.content) {
          lines.push(section.content.trim())
          lines.push('')
        }
      } else if (section.type === 'example') {
        if (section.title) {
          lines.push(`### ${section.title}`)
          lines.push('')
        }
        if (section.description) {
          lines.push(section.description.trim())
          lines.push('')
        }
        if (section.resolvedSource) {
          lines.push('```tsx')
          lines.push(section.resolvedSource.trim())
          lines.push('```')
          lines.push('')
        }
      } else if (section.type === 'docs' && section.docs) {
        lines.push(renderManualDocsTable(section.docs))
        lines.push('')
      }
    }
  }

  // Connected child stories
  if (page.connectedChildren && page.connectedChildren.length > 0) {
    for (const child of page.connectedChildren) {
      for (const chapter of child.chapters) {
        if (chapter.title) {
          lines.push(`## ${chapter.title}`)
          lines.push('')
        }
        if (chapter.description) {
          lines.push(chapter.description)
          lines.push('')
        }

        for (const section of chapter.sections) {
          if (section.type === 'text') {
            if (section.title) {
              lines.push(`### ${section.title}`)
              lines.push('')
            }
            if (section.content) {
              lines.push(section.content.trim())
              lines.push('')
            }
          } else if (section.type === 'example') {
            if (section.title) {
              lines.push(`### ${section.title}`)
              lines.push('')
            }
            if (section.description) {
              lines.push(section.description.trim())
              lines.push('')
            }
            if (section.resolvedSource) {
              lines.push('```tsx')
              lines.push(section.resolvedSource.trim())
              lines.push('```')
              lines.push('')
            }
          } else if (section.type === 'docs' && section.docs) {
            lines.push(renderManualDocsTable(section.docs))
            lines.push('')
          }
        }
      }
    }
  }

  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n'
}

/**
 * Render a props table from extracted TypeScript props.
 */
function renderPropsTable(props) {
  if (!props || props.length === 0) return '_No props._'

  const lines = []
  lines.push('| Name | Type | Default | Description |')
  lines.push('|------|------|---------|-------------|')

  for (const prop of props) {
    const name = prop.required ? `**${escapeMd(prop.name)}**` : escapeMd(prop.name)
    const type = '`' + escapePipe(String(prop.type || 'unknown')) + '`'
    const def = prop.defaultValue ? '`' + escapePipe(String(prop.defaultValue)) + '`' : '-'
    const desc = escapePipe(prop.description || '').replace(/\n/g, ' ')
    lines.push(`| ${name} | ${type} | ${def} | ${desc} |`)
  }

  return lines.join('\n')
}

/**
 * Render a manual docs table (for hooks, etc.)
 */
function renderManualDocsTable(docs) {
  if (!docs || docs.length === 0) return ''

  const lines = []
  lines.push('| Name | Type | Description |')
  lines.push('|------|------|-------------|')

  for (const doc of docs) {
    const name = escapeMd(doc.name || '')
    const type = formatManualType(doc.type)
    const desc = escapePipe(doc.description || '').replace(/\n/g, ' ')
    lines.push(`| ${name} | ${type} | ${desc} |`)
  }

  return lines.join('\n')
}

function formatManualType(type) {
  if (!type) return '-'
  if (typeof type === 'string') return '`' + escapePipe(type) + '`'
  if (type.name) {
    if (type.description) {
      return '`' + escapePipe(type.name) + '`'
    }
    return '`' + escapePipe(type.name) + '`'
  }
  return '-'
}

function escapeMd(s) {
  return s.replace(/\|/g, '\\|')
}

function escapePipe(s) {
  return s.replace(/\|/g, '\\|')
}

/**
 * Render a tutorial page into markdown.
 */
export function renderTutorialMarkdown(page) {
  // Tutorials use the same format as components
  return renderComponentMarkdown(page)
}

/**
 * Generate an index file listing all components grouped by section,
 * with short descriptions.
 */
export function renderComponentIndex(pages) {
  const lines = []
  lines.push('# Picasso Component Documentation')
  lines.push('')
  lines.push('LLM-optimized documentation generated from Picasso Storybook stories.')
  lines.push('')

  // Group by section
  const sections = new Map()
  for (const page of pages) {
    const section = page.section || 'Other'
    if (!sections.has(section)) sections.set(section, [])
    sections.get(section).push(page)
  }

  for (const [section, sectionPages] of sections) {
    lines.push(`## ${section}`)
    lines.push('')
    for (const page of sectionPages.sort((a, b) => a.name.localeCompare(b.name))) {
      const fileName = toFileName(page.name)
      const desc = getShortDescription(page)
      if (desc) {
        lines.push(`- [${page.name}](./${fileName}.md): ${desc}`)
      } else {
        lines.push(`- [${page.name}](./${fileName}.md)`)
      }
    }
    lines.push('')
  }

  return lines.join('\n').trim() + '\n'
}

/**
 * Generate a tutorial index with descriptions.
 */
export function renderTutorialIndex(pages) {
  const lines = []
  lines.push('# Picasso Tutorials')
  lines.push('')
  lines.push('Step-by-step guides for using Picasso components.')
  lines.push('')

  for (const page of pages.sort((a, b) => a.name.localeCompare(b.name))) {
    const fileName = toFileName(page.name)
    const desc = getShortDescription(page)
    if (desc) {
      lines.push(`- [${page.name}](./${fileName}.md): ${desc}`)
    } else {
      lines.push(`- [${page.name}](./${fileName}.md)`)
    }
  }
  lines.push('')

  return lines.join('\n').trim() + '\n'
}

/**
 * Generate the root llms.txt file that references all doc sections.
 */
export function renderLlmsTxt(componentPages, tutorialPages) {
  const lines = []
  lines.push('# Picasso Design System')
  lines.push('')
  lines.push('> Picasso is Toptal\'s React component library implementing the BASE design system.')
  lines.push('> This documentation is optimized for LLM consumption.')
  lines.push('')
  lines.push('## Docs')
  lines.push('')
  lines.push('- [Component Index](./components/index.md): Full list of all UI components')
  lines.push('- [Tutorial Index](./tutorials/index.md): Step-by-step usage guides')
  lines.push('')

  // Components grouped by section
  const sections = new Map()
  for (const page of componentPages) {
    const section = page.section || 'Other'
    if (!sections.has(section)) sections.set(section, [])
    sections.get(section).push(page)
  }

  for (const [section, sectionPages] of sections) {
    lines.push(`## ${section}`)
    lines.push('')
    for (const page of sectionPages.sort((a, b) => a.name.localeCompare(b.name))) {
      const fileName = toFileName(page.name)
      const desc = getShortDescription(page)
      if (desc) {
        lines.push(`- [${page.name}](./components/${fileName}.md): ${desc}`)
      } else {
        lines.push(`- [${page.name}](./components/${fileName}.md)`)
      }
    }
    lines.push('')
  }

  if (tutorialPages.length > 0) {
    lines.push('## Tutorials')
    lines.push('')
    for (const page of tutorialPages.sort((a, b) => a.name.localeCompare(b.name))) {
      const fileName = toFileName(page.name)
      const desc = getShortDescription(page)
      if (desc) {
        lines.push(`- [${page.name}](./tutorials/${fileName}.md): ${desc}`)
      } else {
        lines.push(`- [${page.name}](./tutorials/${fileName}.md)`)
      }
    }
    lines.push('')
  }

  return lines.join('\n').trim() + '\n'
}

/**
 * Extract the first sentence of a page's description for use in index listings.
 */
function getShortDescription(page) {
  if (!page.description) return ''

  // Take the first sentence or first line, whichever is shorter
  const text = page.description.trim()
  if (!text) return ''

  // First sentence: up to the first period followed by space or end
  const sentenceMatch = text.match(/^(.+?\.)\s/)
  const firstLine = text.split('\n')[0].trim()

  let short = sentenceMatch ? sentenceMatch[1] : firstLine
  // Cap at reasonable length
  if (short.length > 120) {
    short = short.slice(0, 117) + '...'
  }

  return short
}

/**
 * Convert a component name to a filename.
 */
export function toFileName(name) {
  return name
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase()
}
