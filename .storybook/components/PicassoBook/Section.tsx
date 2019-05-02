import React, { ReactNode } from 'react'

import { Paper } from '@components'

import Base from './Base'

const decorator = (story: any) => (
  <Paper className='component-section-container'>{story()}</Paper>
)

const DEFAULT_OPTIONS = {
  showSource: false,
  showPropTables: false,
  allowSourceToggling: false,
  allowPropTablesToggling: false,
  decorator
}

export interface SectionConfigType {
  title?: string
  subtitle?: string
  info?: string
  options?: any
  sectionFn: () => ReactNode
}

class Section extends Base {
  type = 'Section'

  constructor(config: SectionConfigType) {
    super({
      ...config,
      options: {
        ...DEFAULT_OPTIONS,
        ...config.options
      }
    })
  }

  toStoryBook() {
    return {
      ...this.options
    }
  }
}

export default Section
