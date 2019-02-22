import React from 'react'

import Base from './Base'

const decorator = story => (
  <div className="component-section-container">{story()}</div>
)

const DEFAULT_OPTIONS = {
  showSource: false,
  showPropTables: false,
  allowSourceToggling: false,
  allowPropTablesToggling: false,
  decorator
}

class Section extends Base {
  type = 'Section'

  constructor(
    config = {
      title: null,
      subtitle: null,
      info: null,
      options: {},
      sectionFn: () => {}
    }
  ) {
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
