import Base from './Base'
import Page from './Page'
import React from 'react'

import { storiesOf } from '@storybook/react'

const normalize = name =>
  name
    .replace(/[^\w]+/gi, '-')
    .trim()
    .toLowerCase()

class PicassoBook extends Base {
  type = 'Book'

  constructor(options = {}) {
    super(options)

    // initialize ENV vars to window
    window.PICASSO_BOOK = {
      TEST_ENV: TEST_ENV
    }

    return this
  }

  createPage = (title, info, section) => {
    const page = new Page({ title, info, section })
    this.collection.push(page)

    return page.createChapter()
  }

  lookupPage(title) {
    const page = this.collection.find(page => page.options.title === title)

    if (!page) {
      throw new Error(`Couldn't lookup a page '${title}'`)
    } else {
      return page
    }
  }

  generate() {
    if (TEST_ENV === 'visual') {
      this.generateVisualStories()
    } else {
      this.generateHumanStories()
    }
  }

  generateHumanStories() {
    this.collection.forEach(page => page.generate())
  }

  generateVisualStories() {
    const pages = this.collection.map(page => page.serialize())
    const stories = storiesOf('Storyshots', module)

    const children = []
    pages.forEach(page => {
      page.chapters.forEach(chapter => {
        chapter.sections.forEach(story => {
          children.push({
            group: chapter.title ? chapter.title : 'main',
            page: page.title,
            story
          })
        })
      })
    })

    stories.add('storyshots', () => (
      <div>
        {children.map(child => (
          <div
            data-story-id={`${normalize(child.page)}-${normalize(
              child.story.title
            )}`}
            style={{ display: 'flex', margin: '20px' }}
          >
            {child.story.sectionFn()}
          </div>
        ))}
      </div>
    ))
  }
}

export default new PicassoBook()
