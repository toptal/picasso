import _ from 'lodash'
import { ComponentDoc, PropItemType } from 'react-docgen-typescript/lib/parser'

export interface PropTypeDocumentation {
  name: string
  description?: string
  enums?: string[]
  type?: string
}

export interface PropDocumentation {
  name: string
  type: string | PropTypeDocumentation
  required?: boolean
  defaultValue?: string
  description: string
  enums?: string[]
  value?: any[]
}

export interface PropDocumentationMap {
  [propName: string]: PropDocumentation
}

export interface Documentable {
  displayName: string
  __docgenInfo: any
}

const FUNCTION_TYPE_REGEX = /.+ => .+/
const ENUM_TYPE_REGEX = /enum/
const ENUM_VALUES_REGEX = /.*\|.*/

class DocumentationGenerator {
  resolveType(type: PropItemType): PropTypeDocumentation {
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

    // Enum parsed type
    if (typeName.match(ENUM_TYPE_REGEX)) {
      let baseShape = {}

      if (type.value && _.isArray(type.value)) {
        baseShape = {
          enums: type.value.map(({ value }: any) => value)
        }
      }

      return {
        name: typeName,
        description: '',
        ...baseShape
      }
    }

    // Enum unparsed type
    if (typeName.match(ENUM_VALUES_REGEX)) {
      const enums = typeName.split('|').map(value => value.trim())
      return {
        name: 'enum',
        enums
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

  transform(generatedDocumentation: ComponentDoc): PropDocumentationMap {
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
