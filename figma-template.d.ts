import type { TemplateStringResult } from 'figma'

declare global {
  // Shape of the object a Code Connect template file (*.figma.ts) default-exports
  type CodeConnectTemplate = {
    id: string
    imports?: string[]
    example: TemplateStringResult
    metadata?: { nestable?: boolean }
  }
}
