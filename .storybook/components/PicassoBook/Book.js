import Base from './Base'
import { Page } from './Page'

class PicassoBook extends Base {
  type = 'Book'
  sections = []

  constructor(options = {}) {
    super(options)

    // initialize ENV vars to window
    window.PICASSO_BOOK = {
      TEST_ENV: TEST_ENV,
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
in https://github.com/toptal/picasso/blob/dcc2b12a05ebec7cbce2cd591149d4f056762a32/.storybook/load-stories.js#L17.
      `)
    }

    return {
      createPage: (title, info = undefined) => {
        const page = new Page({ title, info, section: name })
        this.collection.push(page)
        return page
      },

      createDocPage: (title, sectionFn, options = {}) => {
        const { alwaysOnTop = false } = options
        const page = new Page({ title, section: name, sectionFn, alwaysOnTop })
        this.collection.push(page)
        return page
      },
    }
  }

  createBaseDocsLink = link => {
    return `[BASE documentation](${link})`
  }

  createSourceLink = link => {
    const linkWithoutStoryPath = link.split('/story/')[0]

    const linkSplittedByHash = linkWithoutStoryPath.split('/')

    const componentName = linkSplittedByHash[linkSplittedByHash.length - 1]

    const sourceLink = `https://github.com/toptal/picasso/tree/master/${linkWithoutStoryPath}/${componentName}.tsx`

    return `[Source link](${sourceLink})`
  }

  createComponentDocs = (component, name, description, additionalDocs = {}) => {
    return { component, additionalDocs, name, description }
  }

  connectToPage = connector => page => connector(page)

  generate() {
    // {
    //   'Tutorials': 0,
    //   'Components': 2,
    //   ...
    // }
    const sectionsOrder = {}
    for (let index in this.sections) {
      sectionsOrder[this.sections[index]] = Number(index) * 2
    }

    this.collection
      .sort((page1, page2) => {
        let page1Rating = sectionsOrder[page1.section]
        let page2Rating = sectionsOrder[page2.section]

        if (page1.alwaysOnTop) {
          page1Rating -= 1
        }

        if (page2.alwaysOnTop) {
          page2Rating -= 1
        }

        return page1Rating - page2Rating
      })
      .forEach(page => page.generate())
  }
}

export default new PicassoBook()
