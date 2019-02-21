import React from 'react'

import Base from './Base'
import Section from './Section'
import CodeExample from '../CodeExample'

const Container = ({ children }) => (
  <div className="chapter-container">{children}</div>
)

class Chapter extends Base {
  type = 'Chapter'

  constructor(options = {}) {
    super(options)
  }

  createSection = options => {
    const section = new Section(options)
    this.collection.push(section)

    return section
  }

  addExample = (source, _options) => {
    const render = () => (
      <Container>
        <CodeExample src={source} />
      </Container>
    )

    let finalOptions = _options

    if (typeof _options === 'string') {
      finalOptions = {
        title: _options
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
