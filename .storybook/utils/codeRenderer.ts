import React from 'react'
import * as ts from 'typescript'
import _ from 'lodash'
import * as esprima from 'esprima'
import { ImportDeclaration, ExportDefaultDeclaration, Identifier } from 'estree'
import path from 'path'

const compilerOptions = {
  module: ts.ModuleKind.ESNext,
  target: ts.ScriptTarget.ES2015,
  moduleResolution: ts.ModuleResolutionKind.NodeJs,
  skipLibCheck: true,
  esModuleInterop: true,
  sourceMap: false,
  allowJs: true,
  jsx: ts.JsxEmit.React,
  forceConsistentCasingInFileNames: true,
  strict: true,
  experimentalDecorators: true
}

class CodeRenderer {
  compileCodeIntoComponent = (sourceCode: string, componentFolder: string) => {
    const commonPackages = ['react']
    // @ts-ignore
    this.REACT = require('react')

    const commonPackagesImports = `
      const React = this.REACT\n
    `

    const codeScheme = esprima.parseModule(sourceCode, { jsx: true })

    const imports = this.getImports(codeScheme, componentFolder, commonPackages)
    const body = this.getBody(sourceCode)
    const defaultExport = this.getExports(codeScheme)

    const IIFE = `
      (function() {\n
        ${commonPackagesImports}
        ${imports}
        ${body}
        return ${defaultExport}\n
      }.call(this))
    `

    const result = ts.transpile(IIFE, compilerOptions)
    const Example = eval(result)

    const exampleComponent = _.isFunction(Example)
      ? React.createElement(Example)
      : Example

    if (!React.isValidElement(exampleComponent)) {
      throw new Error('Exported component is not a valid element')
    } else {
      return exampleComponent
    }
  }

  importDefaultFromPackage = (
    moduleVariableName: string,
    componentFolder: string,
    importFromModule: string
  ) => {
    const importRelativePath = path.join(
      componentFolder,
      'story',
      importFromModule
    )

    // @ts-ignore
    this[moduleVariableName] = require('../../components/' +
      importRelativePath).default
  }

  getImports = (
    codeScheme: esprima.Program,
    componentFolder: string,
    commonPackages: Array<string>
  ) => {
    const imports = codeScheme.body
      .filter(m => m.type === esprima.Syntax.ImportDeclaration)
      .map(m => m as ImportDeclaration)

    return imports
      .map(m => {
        const constStatements: Array<string> = []
        const importFromModule = m.source.value as string

        // remove common modules, included manually
        if (commonPackages.find(x => x === importFromModule)) {
          return
        }

        // default imports
        m.specifiers
          .filter(s => s.type === esprima.Syntax.ImportDefaultSpecifier)
          .forEach(s => {
            const moduleVariableName = _.snakeCase(
              importFromModule
            ).toUpperCase()
            this.importDefaultFromPackage(
              moduleVariableName,
              componentFolder,
              importFromModule
            )

            const importVariable = s.local.name
            constStatements.push(
              `const ${importVariable} = this.${moduleVariableName}`
            )
          })

        return constStatements.join('\n')
      })
      .join('\n')
  }

  getBody = (sourceCode: string) => {
    return _.get(
      /(export\sdefault\sclass|const|class\s\S*\sextends)[\s\S]*/.exec(
        sourceCode
      ),
      '[0]',
      ''
    )
      .replace(/export\s+default\s+(?!class|function)\w+([\s\n]+)?/, '') // remove `export default Foo` statements
      .replace(/export\s+default\s+/, '') // remove `export default ...`
  }

  getExports = (codeScheme: esprima.Program) => {
    // supported only default export:
    // `export default Component`

    const exportDeclaration = codeScheme.body.find(
      m => m.type === esprima.Syntax.ExportDefaultDeclaration
    ) as ExportDefaultDeclaration

    return (exportDeclaration.declaration as Identifier).name
  }
}

export default CodeRenderer
