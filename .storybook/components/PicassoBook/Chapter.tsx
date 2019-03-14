declare var TEST_ENV: string // defined by ENV

import React, { Fragment } from 'react'
import { toArray } from 'lodash'

import Base from './Base'
import Section from './Section'
import CodeExample from '../CodeExample'
import Page, { COMPONENTS_FOLDER } from './Page'

import PropsTable from './components/PropsTable'
import DocumentationGenerator, {
  PropDocumentation,
  PropDocumentationMap,
  Documentable
} from '../../utils/documentationGenerator'
import { generateUrl, getHost, normalize } from '../../../utils/urlGenerator'

const componentDocumentation = new DocumentationGenerator()

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

  createSection = (options: any) => {
    const section = new Section(options)
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

  addComponentDocs = (
    Component: Documentable,
    customDocs: PropDocumentationMap = {} as PropDocumentationMap
  ) => {
    if (TEST_ENV === 'visual') {
      return this
    }

    if (!Component.__docgenInfo && !customDocs) {
      return this
    }

    if (!Component.__docgenInfo) {
      throw new Error(
        `Failed to parse __docgenInfo for '${Component.displayName}'`
      )
    }

    const generatedDocumentation = componentDocumentation.transform(
      Component.__docgenInfo
    )

    const documentation = componentDocumentation.merge(
      generatedDocumentation,
      customDocs
    )

    const render = () => <PropsTable documentation={toArray(documentation)} />

    this.createSection({
      sectionFn: render
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
      kind: COMPONENTS_FOLDER,
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
          <CodeExample src={source} permanentLink={permanentLink} />
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
