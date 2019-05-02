declare var TEST_ENV: string // defined by ENV

import React, { Fragment } from 'react'
import { toArray } from 'lodash'

import DocumentationGenerator, {
  PropDocumentation,
  PropDocumentationMap,
  Documentable
} from '~/.storybook/utils/documentationGenerator'
import { generateUrl, getHost, normalize } from '@/utils/urlGenerator'

import Base from './Base'
import Section from './Section'
import CodeExample from '../CodeExample'
import Page from './Page'

import PropsTable from './components/PropsTable'
import TabsSection from './components/TabsSection'

const documentationGenerator = new DocumentationGenerator()

export interface ComponentDocumentation {
  component: Documentable
  additionalDocs?: PropDocumentationMap
  name?: string
  description?: string
}

export interface ChapterOptions {
  title: string
  info?: string
  page: Page
}

class Chapter extends Base {
  type = 'Chapter'
  page: Page

  constructor(options: ChapterOptions) {
    super(options)

    this.page = options.page
  }

  createSection = (config: any) => {
    const section = new Section(config)
    this.collection.push(section)

    return section
  }

  addDocs = (documentation: PropDocumentation[]) => {
    if (TEST_ENV === 'visual') {
      return this
    }

    const render = () => <PropsTable documentation={documentation} />

    this.createSection({
      sectionFn: render
    })

    return this
  }

  addComponentDocs = (componentDocumentation: ComponentDocumentation) => {
    if (TEST_ENV === 'visual') {
      return this
    }

    const {
      component,
      name,
      description,
      additionalDocs
    } = componentDocumentation

    if (!component.__docgenInfo && !additionalDocs) {
      return this
    }

    if (!component.__docgenInfo) {
      throw new Error(
        `Failed to parse __docgenInfo for '${component.displayName}'`
      )
    }

    const generatedDocumentation = documentationGenerator.transform(
      component.__docgenInfo
    )

    const documentation = documentationGenerator.merge(
      generatedDocumentation,
      additionalDocs!
    )

    const render = () => <PropsTable documentation={toArray(documentation)} />

    this.createSection({
      sectionFn: render,
      title: name,
      subtitle: description
    })

    return this
  }

  addExample = (source: string, options: any) => {
    let finalOptions = options

    if (typeof options === 'string') {
      finalOptions = {
        title: options
      }
    }

    const sectionLinkId = normalize(finalOptions.title)
    const permanentLink = generateUrl({
      host: getHost(),
      kind: this.page.getPicassoSection(this.page.section),
      type: this.page.title,
      section: finalOptions.title
    })

    const render = () => (
      <Fragment>
        <div
          className='chapter-container'
          style={{ display: TEST_ENV === 'visual' ? 'inline-block' : 'block' }}
          id={sectionLinkId}
        >
          <CodeExample
            src={source}
            permanentLink={permanentLink}
            showEditCode={finalOptions.showEditCode}
          />
        </div>
      </Fragment>
    )

    this.createSection({
      sectionFn: render,
      ...finalOptions,
      subtitle: finalOptions.description,
      info: finalOptions.extra
    })

    return this
  }

  toStoryBook() {
    return {
      ...this.options,
      sections: this.collection.map(section => section.toStoryBook())
    }
  }
}

export default Chapter
