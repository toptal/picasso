class Base {
  options = {}
  collection = []

  constructor(options = {}) {
    this.setOptions(options)
  }

  setOptions(options = {}) {
    this.options = {
      ...this.options,
      ...options
    }

    return this.options
  }

  toJSON() {
    return {
      type: this.type,
      children: this.collection.map(item => item.toJSON())
    }
  }
}

export default Base
