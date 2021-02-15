import React, { ReactNode } from 'react'

import { Paper } from '@toptal/picasso'

import Base from './Base'

const decorator = (story: () => ReactNode) => (
  <Paper className='component-section-container'>{story()}</Paper>
)

const DEFAULT_CONFIG = {
  takeScreenshot: false
}

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
  takeScreenshot?: boolean
}

class Section extends Base {
  type = 'Section'

  constructor(config: SectionConfigType) {
    super({
      ...DEFAULT_CONFIG,
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
