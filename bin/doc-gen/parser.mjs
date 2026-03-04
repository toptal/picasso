/* eslint-disable import/no-extraneous-dependencies, max-lines */
import { parse } from '@babel/parser'
import _traverse from '@babel/traverse'

const traverse = _traverse.default || _traverse

const PARSER_OPTIONS = {
  sourceType: 'module',
  plugins: ['jsx', 'typescript', 'dynamicImport'],
}

const CHAPTER_METHODS = new Set(['createChapter', 'createTabChapter'])
const SKIPPED_LINK_METHODS = new Set(['createBaseDocsLink', 'createSourceLink'])

const isMethodCall = (node, methodName) => {
  if (node.type !== 'CallExpression') {
    return false
  }

  const { callee } = node

  if (callee.type !== 'MemberExpression') {
    return false
  }

  return (callee.property.name || callee.property.value) === methodName
}

const isPicassoBookCall = (node) => {
  const { callee } = node

  if (callee.type !== 'MemberExpression') {
    return false
  }

  return callee.object.type === 'Identifier' && callee.object.name === 'PicassoBook'
}

const isConnectToPageContext = (path) => {
  let current = path.parentPath

  while (current) {
    if (current.node.type === 'CallExpression' && isMethodCall(current.node, 'connectToPage')) {
      return true
    }

    current = current.parentPath
  }

  return false
}

const getMethodName = (callNode) => {
  if (callNode.callee.type === 'MemberExpression') {
    return callNode.callee.property.name || callNode.callee.property.value
  }

  return null
}

/**
 * Flatten a chain of method calls into an array of CallExpression nodes.
 */
const flattenCallChain = (node) => {
  const calls = []

  const walk = (nd) => {
    if (!nd) {
      return
    }

    if (nd.type === 'CallExpression') {
      if (nd.callee.type === 'MemberExpression') {
        walk(nd.callee.object)
      }

      calls.push(nd)
    } else if (nd.type === 'ExpressionStatement') {
      walk(nd.expression)
    }
  }

  walk(node)

  return calls
}

const resolveTemplateExpression = (expr) => {
  if (expr.type === 'CallExpression') {
    const name = getMethodName(expr)

    return SKIPPED_LINK_METHODS.has(name) ? '' : '[expression]'
  }

  return extractStringValue(expr) // eslint-disable-line no-use-before-define
}

const extractTemplateLiteral = (node) => {
  let result = ''

  for (let idx = 0; idx < node.quasis.length; idx++) {
    result += node.quasis[idx].value.cooked || node.quasis[idx].value.raw

    if (idx < node.expressions.length) {
      result += resolveTemplateExpression(node.expressions[idx])
    }
  }

  return result
}

const extractStringValue = (node) => {
  if (!node) {
    return ''
  }

  switch (node.type) {
    case 'StringLiteral':
      return node.value

    case 'TemplateLiteral':
      return extractTemplateLiteral(node)

    case 'BinaryExpression':
      if (node.operator === '+') {
        return extractStringValue(node.left) + extractStringValue(node.right)
      }

      return ''

    case 'Identifier':
      if (node.name === 'undefined') {
        return ''
      }

      return `[${node.name}]`

    default:
      return ''
  }
}

const LITERAL_TYPES = new Set(['StringLiteral', 'NumericLiteral', 'BooleanLiteral'])

const extractValue = (node) => {
  if (!node) {
    return undefined
  }

  if (LITERAL_TYPES.has(node.type)) {
    return node.value
  }

  switch (node.type) {
    case 'TemplateLiteral':
      return extractStringValue(node)
    case 'NullLiteral':
      return null
    case 'ObjectExpression':
      return extractObjectLiteral(node) // eslint-disable-line no-use-before-define
    case 'ArrayExpression':
      return node.elements.map((el) => extractValue(el))
    case 'Identifier':
      return node.name === 'undefined' ? undefined : `[${node.name}]`
    default:
      return undefined
  }
}

const extractObjectLiteral = (node) => {
  if (!node || node.type !== 'ObjectExpression') {
    return {}
  }

  const result = {}

  for (const prop of node.properties) {
    if (prop.type === 'SpreadElement') {
      continue
    }

    if (prop.type !== 'ObjectProperty' && prop.type !== 'Property') {
      continue
    }

    const key = prop.key.name || prop.key.value

    if (!key) {
      continue
    }

    result[key] = extractValue(prop.value)
  }

  return result
}

const cleanDescription = (desc) => {
  if (!desc) {
    return ''
  }

  return desc
    .replace(/\[BASE documentation\]\([^)]*\)/g, '')
    .replace(/\[Source link\]\([^)]*\)/g, '')
    .replace(/\[expression\]/g, '')
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim()
}

const parseExampleSection = (args) => {
  const section = { type: 'example' }

  if (args.length >= 1) {
    section.source = extractStringValue(args[0])
  }

  if (args.length >= 2) {
    if (args[1].type === 'StringLiteral' || args[1].type === 'TemplateLiteral') {
      section.title = extractStringValue(args[1])
    } else if (args[1].type === 'ObjectExpression') {
      const opts = extractObjectLiteral(args[1])

      section.title = opts.title || ''
      section.description = opts.description || ''
      section.id = opts.id || ''
    }
  }

  if (args.length >= 3) {
    section.module = extractStringValue(args[2])
  }

  return section
}

const parseTextSection = (args) => {
  const section = { type: 'text' }

  if (args.length >= 1) {
    section.content = extractStringValue(args[0])
  }

  if (args.length >= 2 && args[1].type === 'ObjectExpression') {
    const opts = extractObjectLiteral(args[1])

    section.title = opts.title || ''
  }

  return section
}

const parseDocsSection = (args) => {
  const section = { type: 'docs' }

  if (args.length >= 1 && args[0].type === 'ArrayExpression') {
    section.docs = args[0].elements.map((el) => extractObjectLiteral(el))
  }

  return section
}

const extractComponentIdentifier = (objNode) => {
  for (const prop of objNode.properties) {
    if (prop.type !== 'ObjectProperty' && prop.type !== 'Property') {
      continue
    }

    const key = prop.key.name || prop.key.value

    if (key === 'component' && prop.value.type === 'Identifier') {
      return prop.value.name
    }
  }

  return null
}

const parseComponentDocsSection = (args) => {
  const section = { type: 'componentDocs' }

  if (args.length < 1) {
    return section
  }

  if (args[0].type === 'ObjectExpression') {
    const obj = extractObjectLiteral(args[0])

    section.componentLocalName = extractComponentIdentifier(args[0])
    section.name = obj.name || ''
    section.description = obj.description || ''
    section.additionalDocs = obj.additionalDocs || null
  } else if (args[0].type === 'MemberExpression') {
    section.crossRef = args[0].object.name
    section.crossRefProp = 'componentDocs'
  }

  return section
}

const parseSectionCall = (methodName, args) => {
  switch (methodName) {
    case 'addExample':
      return parseExampleSection(args)
    case 'addTextSection':
      return parseTextSection(args)
    case 'addDocs':
      return parseDocsSection(args)
    case 'addComponentDocs':
      return parseComponentDocsSection(args)
    default:
      return null
  }
}

const parseChapterFromExpression = (body) => {
  const chapter = { title: '', description: '', sections: [] }
  const calls = flattenCallChain(body)

  for (const call of calls) {
    const methodName = getMethodName(call)

    if (!methodName) {
      continue
    }

    if (methodName === 'createChapter') {
      const { arguments: args } = call

      if (args.length >= 1 && args[0].type !== 'ObjectExpression') {
        chapter.title = extractStringValue(args[0])
      }

      if (args.length >= 2) {
        chapter.description = extractStringValue(args[1])
      }
    } else {
      const section = parseSectionCall(methodName, call.arguments)

      if (section) {
        chapter.sections.push(section)
      }
    }
  }

  return chapter
}

const findTopExpression = (path) => {
  let top = path

  while (top.parentPath) {
    const parentType = top.parentPath.node.type

    if (parentType === 'ExpressionStatement') {
      break
    }

    if (parentType === 'CallExpression' || parentType === 'MemberExpression') {
      top = top.parentPath

      continue
    }

    break
  }

  return top
}

const collectChainedSections = (path, chapter) => {
  const topExpression = findTopExpression(path)
  const calls = flattenCallChain(topExpression.node)

  for (const call of calls) {
    const methodName = getMethodName(call)

    if (!methodName || CHAPTER_METHODS.has(methodName)) {
      continue
    }

    const section = parseSectionCall(methodName, call.arguments)

    if (section) {
      chapter.sections.push(section)
    }
  }
}

const createEmptyResult = (filePath) => ({
  type: 'unknown',
  name: '',
  section: '',
  description: '',
  filePath,
  imports: new Map(),
  componentDocs: [],
  chapters: [],
  connections: [],
  exportedChapter: false,
  exportedComponentDocs: null,
})

const collectImports = (ast, result) => {
  traverse(ast, {
    ImportDeclaration(path) {
      const importSource = path.node.source.value

      for (const spec of path.node.specifiers) {
        const localName = spec.local.name
        let importedName = localName

        if (spec.type === 'ImportSpecifier' && spec.imported) {
          importedName = spec.imported.name || spec.imported.value
        }

        result.imports.set(localName, {
          source: importSource,
          importedName,
          isDefault: spec.type === 'ImportDefaultSpecifier',
        })
      }
    },
  })
}

const handleCreatePage = (path, result) => {
  result.type = 'parent'
  const { arguments: args } = path.node

  if (args.length >= 1) {
    result.name = extractStringValue(args[0])
  }

  if (args.length >= 2) {
    result.description = cleanDescription(extractStringValue(args[1]))
  }

  const { callee } = path.node

  if (callee.type === 'MemberExpression' && callee.object.type === 'CallExpression') {
    const sectionCall = callee.object

    if (isMethodCall(sectionCall, 'section') && sectionCall.arguments.length > 0) {
      result.section = extractStringValue(sectionCall.arguments[0])
    }
  }
}

const handleConnectToPage = (path, result) => {
  result.type = 'child'
  const arg = path.node.arguments[0]

  if (arg && (arg.type === 'ArrowFunctionExpression' || arg.type === 'FunctionExpression')) {
    const chapter = parseChapterFromExpression(arg.body)

    if (chapter) {
      result.chapters.push(chapter)
    }
  }
}

const handleCreateComponentDocs = (path, result) => {
  const { arguments: args } = path.node

  if (args.length >= 2) {
    result.exportedComponentDocs = {
      componentLocalName: args[0].type === 'Identifier' ? args[0].name : null,
      name: extractStringValue(args[1]),
      description: args.length >= 3 ? extractStringValue(args[2]) : '',
      additionalDocs: args.length >= 4 ? extractObjectLiteral(args[3]) : null,
    }
  }
}

const collectApiCalls = (ast, result) => {
  traverse(ast, {
    CallExpression(path) {
      if (isMethodCall(path.node, 'createPage')) {
        handleCreatePage(path, result)
      }

      if (isMethodCall(path.node, 'createDocPage')) {
        result.type = 'doc-page'

        if (path.node.arguments.length >= 1) {
          result.name = extractStringValue(path.node.arguments[0])
        }
      }

      if (isMethodCall(path.node, 'connectToPage')) {
        handleConnectToPage(path, result)
      }

      if (isMethodCall(path.node, 'createComponentDocs') && isPicassoBookCall(path.node)) {
        handleCreateComponentDocs(path, result)
      }
    },

    ExportDefaultDeclaration(path) {
      const decl = path.node.declaration

      if (decl.type !== 'ObjectExpression') {
        return
      }

      for (const prop of decl.properties) {
        if (prop.type !== 'Property' && prop.type !== 'ObjectProperty') {
          continue
        }

        const key = prop.key.name || prop.key.value

        if (key === 'chapter' || key === 'componentDocs') {
          result.exportedChapter = true
        }
      }
    },
  })
}

const handleConnectArg = (arg, result) => {
  if (arg.type === 'MemberExpression' && arg.object.type === 'Identifier') {
    result.connections.push(arg.object.name)
  } else if (arg.type === 'Identifier') {
    result.connections.push(arg.name)
  }
}

const collectChapters = (ast, result) => {
  traverse(ast, {
    CallExpression(path) {
      if (isMethodCall(path.node, 'createChapter') && !isConnectToPageContext(path)) {
        const chapter = { title: '', description: '', sections: [] }
        const { arguments: args } = path.node

        if (args.length >= 1 && args[0].type !== 'ObjectExpression') {
          chapter.title = extractStringValue(args[0])
        }

        if (args.length >= 2) {
          chapter.description = extractStringValue(args[1])
        }

        collectChainedSections(path, chapter)
        result.chapters.push(chapter)
      }

      if (isMethodCall(path.node, 'createTabChapter')) {
        const chapter = { title: '', description: '', sections: [], isPropsTab: true }
        const { arguments: args } = path.node

        if (args.length >= 1) {
          chapter.title = extractStringValue(args[0])
        }

        collectChainedSections(path, chapter)
        result.chapters.push(chapter)
      }

      if (isMethodCall(path.node, 'connect') && path.node.arguments[0]) {
        handleConnectArg(path.node.arguments[0], result)
      }
    },
  })
}

/**
 * Parse a story file into an intermediate data structure.
 */
export const parseStoryFile = (source, filePath) => {
  const ast = parse(source, PARSER_OPTIONS)
  const result = createEmptyResult(filePath)

  collectImports(ast, result)
  collectApiCalls(ast, result)
  collectChapters(ast, result)

  if (result.type === 'unknown' && result.exportedComponentDocs) {
    result.type = 'docs-only'
  }

  return result
}

const findChapterVarMappings = (ast, chapters) => {
  const chapterVarMap = new Map()

  traverse(ast, {
    VariableDeclarator(path) {
      const init = path.node.init

      if (!init) {
        return
      }

      const calls = flattenCallChain(init)

      for (const call of calls) {
        const name = getMethodName(call)

        if (!CHAPTER_METHODS.has(name)) {
          continue
        }

        const varName = path.node.id.name
        const { arguments: args } = call
        const title = args.length >= 1 ? extractStringValue(args[0]) : ''
        const idx = chapters.findIndex((ch) => ch.title === title)

        if (idx >= 0) {
          chapterVarMap.set(varName, idx)
        }

        break
      }
    },
  })

  return chapterVarMap
}

const findChainRoot = (calls) => {
  const firstCall = calls[0]
  let rootObj = firstCall.callee?.object

  while (rootObj?.type === 'CallExpression') {
    rootObj = rootObj.callee?.object
  }

  return rootObj
}

const collectVarChapterSections = (ast, chapterVarMap, chapters) => {
  traverse(ast, {
    ExpressionStatement(path) {
      const expr = path.node.expression

      if (expr.type !== 'CallExpression') {
        return
      }

      const calls = flattenCallChain(expr)

      if (calls.length === 0) {
        return
      }

      const rootObj = findChainRoot(calls)

      if (!rootObj || rootObj.type !== 'Identifier') {
        return
      }

      const chapterIdx = chapterVarMap.get(rootObj.name)

      if (chapterIdx === undefined) {
        return
      }

      for (const call of calls) {
        const methodName = getMethodName(call)

        if (!methodName || CHAPTER_METHODS.has(methodName)) {
          continue
        }

        const section = parseSectionCall(methodName, call.arguments)

        if (section) {
          chapters[chapterIdx].sections.push(section)
        }
      }
    },
  })
}

/**
 * Second pass to collect calls on named chapter variables.
 */
export const collectVariableChapterCalls = (source, filePath, chapters) => {
  const ast = parse(source, PARSER_OPTIONS)
  const chapterVarMap = findChapterVarMappings(ast, chapters)

  if (chapterVarMap.size === 0) {
    return
  }

  collectVarChapterSections(ast, chapterVarMap, chapters)
}
