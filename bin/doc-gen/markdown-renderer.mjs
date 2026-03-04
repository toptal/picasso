/* eslint-disable import/no-extraneous-dependencies */

const escapePipe = (str) => str.replace(/\\/g, '\\\\').replace(/\|/g, '\\|')

const renderPropsTable = (props) => {
  if (!props || props.length === 0) {
    return '_No props._'
  }

  const header = '| Name | Type | Default | Description |\n|------|------|---------|-------------|'

  const rows = props.map((prop) => {
    const name = prop.required ? `**${escapePipe(prop.name)}**` : escapePipe(prop.name)
    const type = '`' + escapePipe(String(prop.type || 'unknown')) + '`'
    const def = prop.defaultValue ? '`' + escapePipe(String(prop.defaultValue)) + '`' : '-'
    const desc = escapePipe(prop.description || '').replace(/\n/g, ' ')

    return `| ${name} | ${type} | ${def} | ${desc} |`
  })

  return [header, ...rows].join('\n')
}

const renderManualDocsTable = (docs) => {
  if (!docs || docs.length === 0) {
    return ''
  }

  const header = '| Name | Type | Description |\n|------|------|-------------|'

  const formatType = (type) => {
    if (!type) {
      return '-'
    }

    if (typeof type === 'string') {
      return '`' + escapePipe(type) + '`'
    }

    if (type.name) {
      return '`' + escapePipe(type.name) + '`'
    }

    return '-'
  }

  const rows = docs.map((doc) => {
    const name = escapePipe(doc.name || '')
    const type = formatType(doc.type)
    const desc = escapePipe(doc.description || '').replace(/\n/g, ' ')

    return `| ${name} | ${type} | ${desc} |`
  })

  return [header, ...rows].join('\n')
}

const renderTextSection = (section, lines) => {
  if (section.title) {
    lines.push(`### ${section.title}`)
    lines.push('')
  }

  if (section.content) {
    lines.push(section.content.trim())
    lines.push('')
  }
}

const renderExampleSection = (section, lines) => {
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
}

const renderSection = (section, lines) => {
  if (section.type === 'text') {
    renderTextSection(section, lines)
  } else if (section.type === 'example') {
    renderExampleSection(section, lines)
  } else if (section.type === 'docs' && section.docs) {
    lines.push(renderManualDocsTable(section.docs))
    lines.push('')
  }
}

const renderComponentDocsSection = (section, lines) => {
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

const renderPropsChapters = (chapters, lines) => {
  const propsChapters = chapters.filter((ch) => ch.isPropsTab)

  if (propsChapters.length === 0) {
    return
  }

  lines.push('## Props')
  lines.push('')

  for (const chapter of propsChapters) {
    for (const section of chapter.sections) {
      if (section.type === 'componentDocs' && section.resolvedProps) {
        renderComponentDocsSection(section, lines)
      }
    }
  }
}

const renderContentChapters = (chapters, lines) => {
  const contentChapters = chapters.filter((ch) => !ch.isPropsTab)

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
      renderSection(section, lines)
    }
  }
}

const renderChildChapter = (chapter, lines) => {
  if (chapter.title) {
    lines.push(`## ${chapter.title}`)
    lines.push('')
  }

  if (chapter.description) {
    lines.push(chapter.description)
    lines.push('')
  }

  for (const section of chapter.sections) {
    renderSection(section, lines)
  }
}

const renderConnectedChildren = (connectedChildren, lines) => {
  if (!connectedChildren || connectedChildren.length === 0) {
    return
  }

  for (const child of connectedChildren) {
    for (const chapter of child.chapters) {
      renderChildChapter(chapter, lines)
    }
  }
}

/**
 * Render a parsed component page into LLM-optimized markdown.
 */
export const renderComponentMarkdown = (page) => {
  const lines = []

  lines.push(`# ${page.name}`)
  lines.push('')

  if (page.description) {
    lines.push(page.description)
    lines.push('')
  }

  renderPropsChapters(page.chapters, lines)

  // Manual docs (for hooks, etc.)
  for (const chapter of page.chapters) {
    if (chapter.isPropsTab) {
      continue
    }

    for (const section of chapter.sections) {
      if (section.type === 'docs' && section.docs) {
        lines.push(renderManualDocsTable(section.docs))
        lines.push('')
      }
    }
  }

  renderContentChapters(page.chapters, lines)
  renderConnectedChildren(page.connectedChildren, lines)

  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n'
}

/**
 * Render a tutorial page into markdown.
 */
export const renderTutorialMarkdown = (page) => renderComponentMarkdown(page)

/**
 * Convert a component name to a filename.
 */
export const toFileName = (name) =>
  name
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase()

/**
 * Extract the first sentence of a page's description for use in index listings.
 */
const getShortDescription = (page) => {
  if (!page.description) {
    return ''
  }

  const text = page.description.trim()

  if (!text) {
    return ''
  }

  const sentenceMatch = text.match(/^(.+?\.)\s/)
  const firstLine = text.split('\n')[0].trim()

  let short = sentenceMatch ? sentenceMatch[1] : firstLine

  if (short.length > 120) {
    short = short.slice(0, 117) + '...'
  }

  return short
}

const renderPageLink = (page, pathPrefix) => {
  const fileName = toFileName(page.name)
  const desc = getShortDescription(page)
  const link = `[${page.name}](${pathPrefix}${fileName}.md)`

  return desc ? `- ${link}: ${desc}` : `- ${link}`
}

const groupBySection = (pages) => {
  const sections = new Map()

  for (const page of pages) {
    const section = page.section || 'Other'

    if (!sections.has(section)) {
      sections.set(section, [])
    }

    sections.get(section).push(page)
  }

  return sections
}

/**
 * Generate an index file listing all components grouped by section.
 */
export const renderComponentIndex = (pages) => {
  const lines = []

  lines.push('# Picasso Component Documentation')
  lines.push('')
  lines.push('LLM-optimized documentation generated from Picasso Storybook stories.')
  lines.push('')

  const sections = groupBySection(pages)

  for (const [section, sectionPages] of sections) {
    lines.push(`## ${section}`)
    lines.push('')

    for (const page of sectionPages.sort((aa, bb) => aa.name.localeCompare(bb.name))) {
      lines.push(renderPageLink(page, './'))
    }

    lines.push('')
  }

  return lines.join('\n').trim() + '\n'
}

/**
 * Generate a tutorial index with descriptions.
 */
export const renderTutorialIndex = (pages) => {
  const lines = []

  lines.push('# Picasso Tutorials')
  lines.push('')
  lines.push('Step-by-step guides for using Picasso components.')
  lines.push('')

  for (const page of pages.sort((aa, bb) => aa.name.localeCompare(bb.name))) {
    lines.push(renderPageLink(page, './'))
  }

  lines.push('')

  return lines.join('\n').trim() + '\n'
}

const renderLlmsHeader = () => [
  '# Picasso Design System',
  '',
  '> Picasso is Toptal\'s React component library implementing the BASE design system.',
  '> This documentation is optimized for LLM consumption.',
  '',
  '## Docs',
  '',
  '- [Initial Setup](./initial-setup.md): Installation, setup, and getting started',
  '- [Component Index](./components/index.md): Full list of all UI components',
  '- [Tutorial Index](./tutorials/index.md): Step-by-step usage guides',
  '',
]

const renderSectionLinks = (sections, pathPrefix) => {
  const lines = []

  for (const [section, sectionPages] of sections) {
    lines.push(`## ${section}`)
    lines.push('')

    for (const page of sectionPages.sort((aa, bb) => aa.name.localeCompare(bb.name))) {
      lines.push(renderPageLink(page, pathPrefix))
    }

    lines.push('')
  }

  return lines
}

/**
 * Generate the root llms.txt file that references all doc sections.
 */
export const renderLlmsTxt = (componentPages, tutorialPages) => {
  const lines = [...renderLlmsHeader()]

  const sections = groupBySection(componentPages)

  lines.push(...renderSectionLinks(sections, './components/'))

  if (tutorialPages.length > 0) {
    lines.push('## Tutorials')
    lines.push('')

    for (const page of tutorialPages.sort((aa, bb) => aa.name.localeCompare(bb.name))) {
      lines.push(renderPageLink(page, './tutorials/'))
    }

    lines.push('')
  }

  return lines.join('\n').trim() + '\n'
}
