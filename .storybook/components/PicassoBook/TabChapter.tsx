declare var TEST_ENV: string // defined by ENV

import React, { ReactNode } from 'react'
import Section from './Section'

import TabsSection from './components/TabsSection'

import Chapter, { ChapterOptions } from './Chapter'

class TabChapter extends Chapter {
  constructor(options: ChapterOptions) {
    super(options)
  }

  toStoryBook() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { title, info, hideOnCompactLayout = true } = this.options

    const tabs = this.collection.map(section => {
      const { title, subtitle, sectionFn } = section.toStoryBook()

      return {
        name: title,
        description: subtitle,
        content: sectionFn()
      }
    })

    const render = () => (
      <TabsSection tabs={tabs} hideOnCompactLayout={hideOnCompactLayout} />
    )

    const tabsSection = new Section({
      title,
      info,
      sectionFn: render,
      options: {
        decorator: (story: () => ReactNode) => (
          <div className='tab-chapter-container'>{story()}</div>
        )
      }
    })

    return {
      ...this.options,
      title: '',
      sections: [tabsSection.toStoryBook()]
    }
  }
}

export default TabChapter
