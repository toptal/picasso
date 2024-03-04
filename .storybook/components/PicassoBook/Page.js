import { storiesOf } from '@storybook/react'
import chaptersAddon from 'react-storybook-addon-chapters'

import Base from './Base'
import Chapter from './Chapter'
import TabChapter from './TabChapter'

const COMPONENTS_SECTION = 'Components'

const DEFAULT_HAPPO_TARGET = 'chrome-desktop'

class Page extends Base {
  type = 'Page'
  title = ''
  section = COMPONENTS_SECTION
  sectionFn = null
  alwaysOnTop = false

  constructor({
    title = null,
    subtitle = null,
    info = null,
    sectionFn = null,
    section = COMPONENTS_SECTION,
    alwaysOnTop = false,
  }) {
    super({
      title,
      subtitle,
      info,
      section,
      sectionFn,
    })

    this.title = title
    this.section = section
    this.alwaysOnTop = alwaysOnTop
  }

  setDescription(description = '') {
    this.setOptions({ info: description })
    return this
  }

  createChapter = (title = undefined, info = undefined, options = {}) => {
    const chapter = new Chapter({ title, info, page: this, ...options })
    this.collection.push(chapter)

    return chapter
  }

  createTabChapter = (title, info = undefined, options = {}) => {
    const chapter = new TabChapter({ title, info, page: this, ...options })
    this.collection.push(chapter)

    return chapter
  }

  connect = toPage => toPage(this)

  toStoryBook() {
    return {
      ...this.options,
      chapters: this.collection.map(chapter => chapter.toStoryBook()),
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
    const page = this.toStoryBook()
    const stories = storiesOf(page.section + '/' + page.title, module)

    if (page.sectionFn) {
      stories.add(page.title, page.sectionFn)
      return
    }

    chaptersAddon.addWithChapters.call(stories, page.title, page)
  }

  generateVisualStories() {
    const page = this.toStoryBook()

    page.chapters.forEach(chapter => {
      // Support for sub-stories of child components
      const storyName = chapter.title || page.title

      const stories = storiesOf(storyName, module)
      chapter.sections.forEach(section => {
        const happoConfig = {}
        if (section.delay) {
          happoConfig.delay = 500
        }

        if (section.waitFor) {
          happoConfig.waitFor = section.waitFor
        }

        if (!section.screenshotBreakpoints) {
          happoConfig.targets = [DEFAULT_HAPPO_TARGET]
        }

        const parameters = {
          happo: section.takeScreenshot && happoConfig,
        }

        stories.add(section.title || section.id, section.sectionFn, parameters)
      })
    })
  }
}

export { Page }
