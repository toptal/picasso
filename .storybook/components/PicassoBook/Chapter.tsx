declare var TEST_ENV: string // defined by ENV

import React from 'react'

import Base from './Base'
import Section from './Section'
import CodeExample from '../CodeExample'

import PropsTable, { Documentation } from './components/PropsTable'

class Chapter extends Base {
  type = 'Chapter'

  constructor(options = {}) {
    super(options)
  }

  createSection = (options: any) => {
    const section = new Section(options)
    this.collection.push(section)

    return section
  }

  addDocs = (documentation: Documentation) => {
    if (TEST_ENV === 'visual') {
      return this
    }

    const render = () => <PropsTable documentation={documentation} />

    this.createSection({
      sectionFn: render
    })

    return this
  }

  addExample = (source: string, options: any) => {
    const render = () => (
      <div className="chapter-container">
        <CodeExample src={source} />
      </div>
    )

    let finalOptions = options

    if (typeof options === 'string') {
      finalOptions = {
        title: options
      }
    }

    this.createSection({
      sectionFn: render,
      ...finalOptions,
      subtitle: finalOptions.description,
      info: finalOptions.extra
    })

    return this
  }

  toStoryBook() {
    return {
      ...this.options,
      sections: this.collection.map(section => section.toStoryBook())
    }
  }
}

export default Chapter
