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
      .filter(
        expression => expression.type === esprima.Syntax.ImportDeclaration
      )
      .map(expression => expression as ImportDeclaration)

    return imports
      .map(importDeclaration => {
        const constStatements: Array<string> = []
        const importFromModule = importDeclaration.source.value as string

        // remove common modules, included manually
        if (
          commonPackages.find(commonModule => commonModule === importFromModule)
        ) {
          return
        }

        // default imports
        constStatements.push(
          ...this.generateDefaultImports(
            importDeclaration,
            importFromModule,
            componentFolder
          )
        )

        return constStatements.join('\n')
      })
      .join('\n')
  }

  generateDefaultImports = (
    importDeclaration: ImportDeclaration,
    importFromModule: string,
    componentFolder: string
  ): Array<string> => {
    const constStatements: Array<string> = []
    const moduleVariableName = _.snakeCase(importFromModule).toUpperCase()
    this.importDefaultFromPackage(
      moduleVariableName,
      componentFolder,
      importFromModule
    )

    const defaultSpecifier = importDeclaration.specifiers.find(
      specifier => specifier.type === esprima.Syntax.ImportDefaultSpecifier
    )

    if (!defaultSpecifier) {
      return []
    }

    const importVariable = defaultSpecifier.local.name
    constStatements.push(`const ${importVariable} = this.${moduleVariableName}`)

    return constStatements
  }

  getBody = (sourceCode: string) => {
    const EXPORTED_COMPONENT = /(export\sdefault\sclass|const|class\s\S*\sextends)[\s\S]*/
    const EXPORT_DEFAULT_COMPONENT = /export\s+default\s+(?!class|function)\w+([\s\n]+)?/
    const EXPORT_DEFAULT = /export\s+default\s+/

    const exportedComponentParsingResult = EXPORTED_COMPONENT.exec(sourceCode)
    const exportedComponentCode = exportedComponentParsingResult
      ? exportedComponentParsingResult[0]
      : ''

    return exportedComponentCode
      .replace(EXPORT_DEFAULT_COMPONENT, '') // remove `export default Foo` statements
      .replace(EXPORT_DEFAULT, '') // remove `export default ...`
  }

  getExports = (codeScheme: esprima.Program) => {
    // supported only default export:
    // `export default Component`

    const exportDeclaration = codeScheme.body.find(
      expression => expression.type === esprima.Syntax.ExportDefaultDeclaration
    ) as ExportDefaultDeclaration

    return (exportDeclaration.declaration as Identifier).name
  }
}

export default CodeRenderer
