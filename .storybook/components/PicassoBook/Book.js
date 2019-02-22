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

  createPage = (title, info) => {
    const page = new Page({ title, info })
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
    this.collection.forEach(page => page.generate())
  }
}

export default new PicassoBook()
