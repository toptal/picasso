import { storiesOf } from '@storybook/react'

import Base from './Base'
import Chapter from './Chapter'

const COMPONENTS_SECTION = 'Components'

class Page extends Base {
  type = 'Page'
  title = ''
  section = COMPONENTS_SECTION

  constructor({
    title = null,
    subtitle = null,
    info = null,
    section = COMPONENTS_SECTION
  }) {
    super({
      title,
      subtitle,
      info,
      section
    })

    this.title = title
    this.section = section
  }

  setDescription(description = '') {
    this.setOptions({ info: description })
    return this
  }

  createChapter = (title, info, options = {}) => {
    const chapter = new Chapter({ title, info, page: this, ...options })
    this.collection.push(chapter)

    return chapter
  }

  toStoryBook() {
    return {
      ...this.options,
      chapters: this.collection.map(chapter => chapter.toStoryBook())
    }
  }

  generate() {
    if (TEST_ENV === 'visual') {
      this.generateVisualStories()
    } else {
      this.generateHumanStories()
    }
  }

  getPicassoSection(section) {
    return section + '|Folder'
  }

  generateHumanStories() {
    const page = this.toStoryBook()
    const section = this.getPicassoSection(page.section)
    const stories = storiesOf(section, module)
    stories.addWithChapters(page.title, page)
  }

  generateVisualStories() {
    const page = this.toStoryBook()
    const stories = storiesOf(page.title, module)

    page.chapters.forEach(chapter => {
      chapter.sections.forEach(section => {
        stories.add(section.title, section.sectionFn)
      })
    })
  }
}

export default Page
