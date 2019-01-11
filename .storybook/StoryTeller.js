import React from 'react'

/* This class needs some love, but let's start with something simple */

const decorator = story => (
  <div
    style={{
      border: '1px solid rgba(0, 0, 0, 0.1)',
      display: 'flex',
      padding: '20px',
      justifyContent: 'center',
      borderRadius: '5px'
    }}
  >
    {story()}
  </div>
)

class Section {
  constructor (title, subtitle, callback = () => {}) {
    this.section = {
      title,
      subtitle,
      sectionFn: callback,
      options: {
        showSource: false,
        allowSourceToggling: true,
        allowPropTablesToggling: false,
        decorator
      }
    }
  }

  toJSON () {
    return this.section
  }
}

class Chapter {
  constructor (title, info) {
    this.chapter = {
      title,
      info,
      sections: []
    }
  }

  addSection (...args) {
    const section = new Section(...args)
    this.chapter = {
      ...this.chapter,
      sections: [...this.chapter.sections, section]
    }

    return this
  }

  toJSON () {
    return {
      ...this.chapter,
      sections: this.chapter.sections.map(section => section.toJSON())
    }
  }
}

class Story {
  constructor (title, info) {
    this.story = {
      title,
      info,
      chapters: []
    }
  }

  addChapter (...args) {
    const chapter = new Chapter(...args)
    this.story = {
      ...this.story,
      chapters: [...this.story.chapters, chapter]
    }

    return chapter
  }

  toStory () {
    return {
      ...this.toJSON(),
      chapters: this.story.chapters.map(chapter => chapter.toJSON())
    }
  }

  toJSON () {
    return this.story
  }
}

class StoryTeller {
  constructor (title = '', info = '') {
    this.story = new Story(title, info)
    return this.story
  }
}

export default StoryTeller
