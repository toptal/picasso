import _ from 'lodash'

export interface PropTypeDocumentation {
  name: string
  description?: string
}

export interface PropDocumentation {
  name: string
  type: string | PropTypeDocumentation
  required?: boolean
  defaultValue?: string
  description: string
  enums?: string[]
}

export interface PropDocumentationMap {
  [propName: string]: PropDocumentation
}

export interface Documentable {
  __docgenInfo: any
}

const FUNCTION_TYPE_REGEX = /.+ => .+/

class DocumentationGenerator {
  resolveType(type: any): PropTypeDocumentation {
    if (!type) {
      return {} as PropTypeDocumentation
    }

    const typeName = type.name.replace('| undefined', '')

    // Function type
    if (typeName.match(FUNCTION_TYPE_REGEX)) {
      return {
        name: 'function',
        description: typeName
      }
    }

    // Add new cases for shorthanding complex type definitions ...

    // Simple types
    return {
      name: typeName,
      description: ''
    }
  }

  resolveDefaultValue(defaultValue: any): string {
    if (!defaultValue) {
      return ''
    }

    return defaultValue.value
  }

  merge(...sources: PropDocumentationMap[]): PropDocumentationMap {
    return _.merge({} as PropDocumentationMap, ...sources)
  }

  transform(generatedDocumentation: any): PropDocumentationMap {
    const { props: propDocs } = generatedDocumentation

    return _.mapValues(propDocs, (propDoc, propName) => {
      const { type, description, required, defaultValue } = propDoc

      return {
        name: propName,
        type: this.resolveType(type),
        defaultValue: this.resolveDefaultValue(defaultValue),
        description,
        required
      }
    })
  }
}

export default DocumentationGenerator
