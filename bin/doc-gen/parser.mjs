import { parse } from '@babel/parser'
import _traverse from '@babel/traverse'
import { dirname, resolve } from 'path'

// Handle ESM default export from @babel/traverse
const traverse = _traverse.default || _traverse

/**
 * Parse a story file into an intermediate data structure.
 *
 * Returns: {
 *   type: 'parent' | 'child' | 'docs-only' | 'doc-page',
 *   name: string,
 *   section: string,
 *   description: string,
 *   imports: Map<localName, { source, specifiers }>,
 *   componentDocs: [{ componentLocalName, name, additionalDocs, description }],
 *   chapters: [{ title, description, sections: [{ type, ... }] }],
 *   connections: [localName],
 *   exportedChapter: boolean,
 *   exportedComponentDocs: { componentLocalName, name } | null,
 * }
 */
export function parseStoryFile(source, filePath) {
  const ast = parse(source, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript', 'dynamicImport'],
  })

  const result = {
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
  }

  // First pass: collect imports
  traverse(ast, {
    ImportDeclaration(path) {
      const source = path.node.source.value
      for (const spec of path.node.specifiers) {
        const localName = spec.local.name
        let importedName = localName
        if (spec.type === 'ImportSpecifier' && spec.imported) {
          importedName = spec.imported.name || spec.imported.value
        }
        result.imports.set(localName, {
          source,
          importedName,
          isDefault: spec.type === 'ImportDefaultSpecifier',
        })
      }
    },
  })

  // Second pass: extract PicassoBook API calls
  traverse(ast, {
    CallExpression(path) {
      // Detect createPage
      if (isMethodCall(path.node, 'createPage')) {
        result.type = 'parent'
        const args = path.node.arguments
        if (args.length >= 1) {
          result.name = extractStringValue(args[0])
        }
        if (args.length >= 2) {
          result.description = cleanDescription(
            extractStringValue(args[1])
          )
        }
        // Get section from the chain: PicassoBook.section('X').createPage(...)
        const callee = path.node.callee
        if (callee.type === 'MemberExpression' && callee.object.type === 'CallExpression') {
          const sectionCall = callee.object
          if (isMethodCall(sectionCall, 'section') && sectionCall.arguments.length > 0) {
            result.section = extractStringValue(sectionCall.arguments[0])
          }
        }
      }

      // Detect createDocPage - mark and skip
      if (isMethodCall(path.node, 'createDocPage')) {
        result.type = 'doc-page'
        const args = path.node.arguments
        if (args.length >= 1) {
          result.name = extractStringValue(args[0])
        }
      }

      // Detect connectToPage
      if (isMethodCall(path.node, 'connectToPage')) {
        result.type = 'child'
        // The arg is a lambda; parse the body for chapter calls
        const arg = path.node.arguments[0]
        if (arg && (arg.type === 'ArrowFunctionExpression' || arg.type === 'FunctionExpression')) {
          const chapter = parseChapterFromExpression(arg.body)
          if (chapter) {
            result.chapters.push(chapter)
          }
        }
      }

      // Detect createComponentDocs (standalone, not chained on chapter)
      if (isMethodCall(path.node, 'createComponentDocs') && isPicassoBookCall(path.node)) {
        const args = path.node.arguments
        if (args.length >= 2) {
          result.exportedComponentDocs = {
            componentLocalName: args[0].type === 'Identifier' ? args[0].name : null,
            name: extractStringValue(args[1]),
            description: args.length >= 3 ? extractStringValue(args[2]) : '',
            additionalDocs: args.length >= 4 ? extractObjectLiteral(args[3]) : null,
          }
        }
      }
    },

    // Detect default export
    ExportDefaultDeclaration(path) {
      const decl = path.node.declaration
      if (decl.type === 'ObjectExpression') {
        for (const prop of decl.properties) {
          if (prop.type === 'Property' || prop.type === 'ObjectProperty') {
            const key = prop.key.name || prop.key.value
            if (key === 'chapter') {
              result.exportedChapter = true
            }
            if (key === 'componentDocs') {
              result.exportedChapter = true // It exports docs info
            }
          }
        }
      }
    },
  })

  // Third pass: extract chapters from chained method calls on page variable
  // We look for .createChapter() and .createTabChapter() chains
  traverse(ast, {
    CallExpression(path) {
      if (isMethodCall(path.node, 'createChapter') && !isConnectToPageContext(path)) {
        const chapter = { title: '', description: '', sections: [] }
        const args = path.node.arguments
        if (args.length >= 1 && args[0].type !== 'ObjectExpression') {
          chapter.title = extractStringValue(args[0])
        }
        if (args.length >= 2) {
          chapter.description = extractStringValue(args[1])
        }
        // Walk up to find chained calls on this chapter
        collectChainedSections(path, chapter)
        result.chapters.push(chapter)
      }

      if (isMethodCall(path.node, 'createTabChapter')) {
        const chapter = { title: '', description: '', sections: [], isPropsTab: true }
        const args = path.node.arguments
        if (args.length >= 1) {
          chapter.title = extractStringValue(args[0])
        }
        collectChainedSections(path, chapter)
        result.chapters.push(chapter)
      }

      // Detect page.connect(importedStory.chapter)
      if (isMethodCall(path.node, 'connect')) {
        const arg = path.node.arguments[0]
        if (arg) {
          if (arg.type === 'MemberExpression' && arg.object.type === 'Identifier') {
            result.connections.push(arg.object.name)
          } else if (arg.type === 'Identifier') {
            result.connections.push(arg.name)
          }
        }
      }
    },
  })

  // If still unknown but has exported componentDocs, mark as docs-only
  if (result.type === 'unknown' && result.exportedComponentDocs) {
    result.type = 'docs-only'
  }

  return result
}

/**
 * Check if a call expression is a method call with the given name.
 */
function isMethodCall(node, methodName) {
  if (node.type !== 'CallExpression') return false
  const callee = node.callee
  if (callee.type === 'MemberExpression') {
    const prop = callee.property
    return (prop.name || prop.value) === methodName
  }
  return false
}

/**
 * Check if a method call is directly on PicassoBook (not on a chapter).
 */
function isPicassoBookCall(node) {
  const callee = node.callee
  if (callee.type !== 'MemberExpression') return false
  const obj = callee.object
  if (obj.type === 'Identifier' && obj.name === 'PicassoBook') return true
  return false
}

/**
 * Check if this path is inside a connectToPage callback.
 */
function isConnectToPageContext(path) {
  let current = path.parentPath
  while (current) {
    if (current.node.type === 'CallExpression' && isMethodCall(current.node, 'connectToPage')) {
      return true
    }
    current = current.parentPath
  }
  return false
}

/**
 * Parse chapter from the body of a connectToPage callback.
 */
function parseChapterFromExpression(body) {
  // The body is typically a chained expression like
  // page.createChapter(...).addExample(...).addDocs(...)
  const chapter = { title: '', description: '', sections: [] }

  // Collect all call expressions in the chain
  const calls = flattenCallChain(body)

  for (const call of calls) {
    const methodName = getMethodName(call)
    if (!methodName) continue

    if (methodName === 'createChapter') {
      const args = call.arguments
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

/**
 * Flatten a chain of method calls into an array of CallExpression nodes.
 * Given a.b().c().d(), returns [a.b(), a.b().c(), a.b().c().d()]
 */
function flattenCallChain(node) {
  const calls = []

  function walk(n) {
    if (!n) return
    if (n.type === 'CallExpression') {
      // First recurse into the callee's object to get earlier calls
      if (n.callee.type === 'MemberExpression') {
        walk(n.callee.object)
      }
      calls.push(n)
    } else if (n.type === 'ExpressionStatement') {
      walk(n.expression)
    }
  }

  walk(node)
  return calls
}

function getMethodName(callNode) {
  if (callNode.callee.type === 'MemberExpression') {
    return callNode.callee.property.name || callNode.callee.property.value
  }
  return null
}

/**
 * Walk up from a createChapter/createTabChapter call to find chained method
 * calls (.addExample, .addTextSection, .addDocs, .addComponentDocs).
 */
function collectChainedSections(path, chapter) {
  // The chapter call may be part of a chain. We need to find the topmost
  // expression in the chain and then walk down.
  // Strategy: find the ExpressionStatement ancestor, then flatten the chain.

  let topExpression = path
  while (topExpression.parentPath) {
    if (topExpression.parentPath.node.type === 'ExpressionStatement') {
      break
    }
    if (topExpression.parentPath.node.type === 'CallExpression') {
      topExpression = topExpression.parentPath
      continue
    }
    if (topExpression.parentPath.node.type === 'MemberExpression') {
      topExpression = topExpression.parentPath
      continue
    }
    break
  }

  const calls = flattenCallChain(topExpression.node)

  // Also look for subsequent ExpressionStatements that chain on the same variable
  // e.g., `tutorialChapter.addTextSection(...)`
  // We need to find the variable that holds this chapter
  let chapterVarName = null
  const parentNode = topExpression.parentPath?.node
  if (parentNode?.type === 'ExpressionStatement') {
    // Check if this is an assignment or the chapter is a standalone expression
    // Look for VariableDeclarator that assigns this expression
  }

  // Check the context - if the createChapter is assigned to a variable,
  // look for subsequent calls on that variable
  let assignedVar = null
  if (topExpression.parentPath?.parentPath?.node?.type === 'VariableDeclarator') {
    assignedVar = topExpression.parentPath.parentPath.node.id.name
  }

  for (const call of calls) {
    const methodName = getMethodName(call)
    if (!methodName || methodName === 'createChapter' || methodName === 'createTabChapter') continue

    const section = parseSectionCall(methodName, call.arguments)
    if (section) {
      chapter.sections.push(section)
    }
  }

  // If assigned to a variable, we need to find calls on that variable in subsequent statements
  if (assignedVar) {
    // Find the program or block scope and look for subsequent calls
    let programPath = path
    while (programPath.parentPath && programPath.parentPath.node.type !== 'Program') {
      programPath = programPath.parentPath
    }
    // This is handled by the separate traversal pass below
  }
}

/**
 * Parse a section-level call (addExample, addTextSection, etc.) into a section descriptor.
 */
function parseSectionCall(methodName, args) {
  switch (methodName) {
    case 'addExample': {
      const section = { type: 'example' }
      if (args.length >= 1) section.source = extractStringValue(args[0])
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

    case 'addTextSection': {
      const section = { type: 'text' }
      if (args.length >= 1) section.content = extractStringValue(args[0])
      if (args.length >= 2 && args[1].type === 'ObjectExpression') {
        const opts = extractObjectLiteral(args[1])
        section.title = opts.title || ''
      }
      return section
    }

    case 'addDocs': {
      const section = { type: 'docs' }
      if (args.length >= 1 && args[0].type === 'ArrayExpression') {
        section.docs = args[0].elements.map(el => extractObjectLiteral(el))
      }
      return section
    }

    case 'addComponentDocs': {
      const section = { type: 'componentDocs' }
      if (args.length >= 1) {
        if (args[0].type === 'ObjectExpression') {
          const obj = extractObjectLiteral(args[0])
          section.componentLocalName = null
          section.name = obj.name || ''
          section.description = obj.description || ''
          section.additionalDocs = obj.additionalDocs || null

          // Extract the component identifier
          for (const prop of args[0].properties) {
            if (prop.type === 'ObjectProperty' || prop.type === 'Property') {
              const key = prop.key.name || prop.key.value
              if (key === 'component' && prop.value.type === 'Identifier') {
                section.componentLocalName = prop.value.name
              }
            }
          }
        } else if (args[0].type === 'MemberExpression') {
          // e.g., modalTitleStory.componentDocs
          section.crossRef = args[0].object.name
          section.crossRefProp = 'componentDocs'
        }
      }
      return section
    }

    default:
      return null
  }
}

/**
 * Extract a string value from an AST node (StringLiteral, TemplateLiteral, or BinaryExpression).
 */
function extractStringValue(node) {
  if (!node) return ''

  switch (node.type) {
    case 'StringLiteral':
      return node.value

    case 'TemplateLiteral': {
      let result = ''
      for (let i = 0; i < node.quasis.length; i++) {
        result += node.quasis[i].value.cooked || node.quasis[i].value.raw
        if (i < node.expressions.length) {
          const expr = node.expressions[i]
          // Handle PicassoBook.createBaseDocsLink(url) and createSourceLink
          if (expr.type === 'CallExpression') {
            const methodName = getMethodName(expr)
            if (methodName === 'createBaseDocsLink') {
              // Skip - we don't want BASE links in LLM docs
              result += ''
            } else if (methodName === 'createSourceLink') {
              // Skip source links
              result += ''
            } else {
              result += `[expression]`
            }
          } else {
            result += extractStringValue(expr)
          }
        }
      }
      return result
    }

    case 'BinaryExpression':
      if (node.operator === '+') {
        return extractStringValue(node.left) + extractStringValue(node.right)
      }
      return ''

    case 'Identifier':
      if (node.name === 'undefined') return ''
      return `[${node.name}]`

    default:
      return ''
  }
}

/**
 * Extract a simple object literal into a plain JS object.
 * Handles string values, nested objects, arrays, booleans, numbers.
 */
function extractObjectLiteral(node) {
  if (!node || node.type !== 'ObjectExpression') return {}

  const result = {}
  for (const prop of node.properties) {
    if (prop.type === 'SpreadElement') continue
    if (prop.type !== 'ObjectProperty' && prop.type !== 'Property') continue

    const key = prop.key.name || prop.key.value
    if (!key) continue

    result[key] = extractValue(prop.value)
  }
  return result
}

function extractValue(node) {
  if (!node) return undefined

  switch (node.type) {
    case 'StringLiteral':
      return node.value
    case 'TemplateLiteral':
      return extractStringValue(node)
    case 'NumericLiteral':
      return node.value
    case 'BooleanLiteral':
      return node.value
    case 'NullLiteral':
      return null
    case 'ObjectExpression':
      return extractObjectLiteral(node)
    case 'ArrayExpression':
      return node.elements.map(el => extractValue(el))
    case 'Identifier':
      if (node.name === 'undefined') return undefined
      return `[${node.name}]`
    default:
      return undefined
  }
}

/**
 * Clean a component description by removing BASE doc links, source links,
 * and excess whitespace.
 */
function cleanDescription(desc) {
  if (!desc) return ''
  return desc
    .replace(/\[BASE documentation\]\([^)]*\)/g, '')
    .replace(/\[Source link\]\([^)]*\)/g, '')
    .replace(/\[expression\]/g, '')
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim()
}

/**
 * Do a second pass to collect calls on named chapter variables.
 * e.g., const tutorialChapter = page.createChapter(...)
 * followed by tutorialChapter.addTextSection(...)
 */
export function collectVariableChapterCalls(source, filePath, chapters) {
  const ast = parse(source, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript', 'dynamicImport'],
  })

  // Find variable declarations that hold createChapter results
  const chapterVarMap = new Map() // varName -> chapter index

  traverse(ast, {
    VariableDeclarator(path) {
      const init = path.node.init
      if (!init) return

      // Unwrap chains to find if createChapter is in there
      const calls = flattenCallChain(init)
      for (const call of calls) {
        const name = getMethodName(call)
        if (name === 'createChapter' || name === 'createTabChapter') {
          const varName = path.node.id.name
          // Find matching chapter by title
          const args = call.arguments
          const title = args.length >= 1 ? extractStringValue(args[0]) : ''

          const idx = chapters.findIndex(ch => ch.title === title)
          if (idx >= 0) {
            chapterVarMap.set(varName, idx)
          }
          break
        }
      }
    },
  })

  if (chapterVarMap.size === 0) return

  // Find ExpressionStatements that call methods on these variables
  traverse(ast, {
    ExpressionStatement(path) {
      const expr = path.node.expression
      if (expr.type !== 'CallExpression') return

      const calls = flattenCallChain(expr)
      if (calls.length === 0) return

      // Find the root object of the chain
      let rootCall = calls[0]
      let rootObj = rootCall.callee?.object
      while (rootObj?.type === 'CallExpression') {
        rootObj = rootObj.callee?.object
      }
      if (!rootObj || rootObj.type !== 'Identifier') return

      const varName = rootObj.name
      const chapterIdx = chapterVarMap.get(varName)
      if (chapterIdx === undefined) return

      // Check if this is the defining statement (skip it)
      // The defining statement would be a VariableDeclaration, not ExpressionStatement

      for (const call of calls) {
        const methodName = getMethodName(call)
        if (!methodName || methodName === 'createChapter' || methodName === 'createTabChapter') continue

        const section = parseSectionCall(methodName, call.arguments)
        if (section) {
          chapters[chapterIdx].sections.push(section)
        }
      }
    },
  })
}
