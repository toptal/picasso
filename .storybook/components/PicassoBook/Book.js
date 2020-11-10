import Base from './Base'
import { Page } from './Page'

class PicassoBook extends Base {
  type = 'Book'
  sections = []

  constructor(options = {}) {
    super(options)

    // initialize ENV vars to window
    window.PICASSO_BOOK = {
      TEST_ENV: TEST_ENV
    }

    return this
  }

  addSections = sections => {
    this.sections = sections
  }

  section = name => {
    if (!this.sections.includes(name)) {
      throw new Error(`
Section with the name '${name}' was not found.
You need to add this section to the list of available sections
in '.storybook/config.js'.
      `)
    }

    return {
      createPage: (title, info = undefined) => {
        const page = new Page({ title, info, section: name })
        this.collection.push(page)
        return page
      }
    }
  }

  createComponentDocs = (component, name, description, additionalDocs = {}) => {
    return { component, additionalDocs, name, description }
  }

  connectToPage = connector => page => connector(page)

  generate() {
    // {
    //   'Tutorials': 0,
    //   'Components': 1,
    //   ...
    // }
    const sectionsOrder = {}
    for (let index in this.sections) {
      sectionsOrder[this.sections[index]] = Number(index)
    }

    this.collection
      .sort(
        (page1, page2) =>
          sectionsOrder[page1.section] - sectionsOrder[page2.section]
      )
      .forEach(page => page.generate())
  }
}

export default new PicassoBook()
