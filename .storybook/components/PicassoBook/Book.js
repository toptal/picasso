import Base from './Base'
import Page from './Page'

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

    return page
  }

  createComponentDocs = (component, name, description, additionalDocs = {}) => {
    return { component, additionalDocs, name, description }
  }

  connectToPage = connector => page => connector(page)

  generate() {
    this.collection.forEach(page => page.generate())
  }
}

export default new PicassoBook()
