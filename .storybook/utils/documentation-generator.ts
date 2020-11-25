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
  deprecated?: boolean
  enums?: string[]
  value?: any[]
}

export interface PropDocumentationMap
  extends Record<string, PropDocumentation> {}

export interface Documentable {
  displayName?: string
  __docgenInfo?: any
}

const FUNCTION_TYPE_REGEX = /.+ => .+/
const ENUM_TYPE_REGEX = /enum/
const ENUM_VALUES_REGEX = /.*\|.*/
const ARRAY_REGEX = /.*\[\]/
const OBJECT_REGEX = /\{.*\}/

const DEPRECATED_KEYWORD = '@deprecated'

const escapeType = (typeName: string) => typeName.replace('| undefined', '')

const merge = <T extends { [key: string]: unknown }>(
  o1: T,
  o2: T | undefined
) => {
  if (!o2) return o1

  const destination: Record<string, unknown> = Object.assign({}, o1)

  Object.keys(o2).forEach(key => {
    if (destination[key]) {
      Object.assign(destination[key], o2[key])
    } else {
      destination[key] = o2[key]
    }
  })

  return destination
}

const mapValues = <T>(
  map: Record<string, T>,
  callback: (value: T, key: string) => unknown
) => {
  return Object.fromEntries(
    Object.entries(map).map(([key, value]) => [key, callback(value, key)])
  )
}

class DocumentationGenerator {
  resolveType(type: PropItemType): PropTypeDocumentation {
    if (!type) {
      return {} as PropTypeDocumentation
    }

    const typeName = escapeType(type.name)

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

      if (type.value && Array.isArray(type.value)) {
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

    // Array type
    if (typeName.match(ARRAY_REGEX)) {
      const objectType = typeName.substring(0, typeName.indexOf('[]'))
      const objectDescription = this.generateObjectDescription(objectType)

      return {
        name: '[]',
        description: `${objectDescription}[]`
      }
    }

    // Object type
    if (typeName.match(OBJECT_REGEX)) {
      const objectDescription = this.generateObjectDescription(typeName)
      return {
        name: 'object',
        description: objectDescription
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

    // Simple types
    return {
      name: typeName,
      description: ''
    }
  }

  generateObjectDescription(objectType: string): string {
    // the object type is complex if contains props like '{ a: string, b: number}'
    // and not complex if it's just 'string'
    const OPENING_BRACKET = /\{\s*/
    const CLOSING_BRACKET = /\s*\}/
    const isComplexObjectType = OPENING_BRACKET.test(objectType)

    if (isComplexObjectType) {
      const objectTypeWithoutBrackets = objectType
        .replace(OPENING_BRACKET, '')
        .replace(CLOSING_BRACKET, '')
      const objectProps = objectTypeWithoutBrackets.split(';')
      const propsTable = objectProps
        .slice(0, -1)
        .map(
          prop =>
            `| ${prop.split(':')[0]} | ${escapeType(prop.split(':')[1])} |`
        )
        .join('\r\n')

      return `{

|                 |         |
| ----            | ------  |
${propsTable}

}`
    } else {
      return objectType
    }
  }

  resolveDefaultValue(defaultValue: { value: string } | undefined): string {
    if (!defaultValue) {
      return ''
    }

    return defaultValue.value
  }

  merge(docs: PropDocumentationMap, additionalDocs?: PropDocumentationMap) {
    return merge(docs, additionalDocs) as PropDocumentationMap
  }

  transform(generatedDocumentation: ComponentDoc): PropDocumentationMap {
    const { props: propDocs } = generatedDocumentation

    return mapValues(propDocs, (propDoc, propName) => {
      const { type, description, required, defaultValue } = propDoc

      const deprecated = description.startsWith(DEPRECATED_KEYWORD)

      return {
        name: propName,
        type: this.resolveType(type),
        defaultValue: this.resolveDefaultValue(defaultValue),
        description: deprecated
          ? description.replace(DEPRECATED_KEYWORD, '')
          : description,
        deprecated,
        required
      }
    }) as PropDocumentationMap
  }
}

export default DocumentationGenerator
