declare var TEST_ENV: string // defined by ENV

import React, { Fragment, ReactNode } from 'react'
import { toArray } from 'lodash'

import DocumentationGenerator, {
  PropDocumentation,
  PropDocumentationMap,
  Documentable
} from '~/.storybook/utils/documentation-generator'
import {
  generateUrl,
  getHost,
  normalize
} from '../../../src/utils/url-generator'
import { Typography } from '@toptal/picasso'

import Base from './Base'
import Section, { SectionConfigType } from './Section'
import CodeExample from '../CodeExample'
import { Page } from './Page'

import PropsTable from './components/PropsTable'
import Markdown from '../Markdown'

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

type Options = {
  showEditCode?: boolean
  title?: string
  id?: string
  extra?: string
  description?: string
} & Record<string, string | boolean>

class Chapter extends Base {
  type = 'Chapter'
  page: Page

  constructor(options: ChapterOptions) {
    super(options)

    this.page = options.page
  }

  createSection = (config: SectionConfigType) => {
    const section = new Section(config)
    this.collection.push(section)

    return section
  }

  addTextSection = (text: string, options: Record<string, string> = {}) => {
    if (TEST_ENV === 'visual') {
      return this
    }

    const render = () => <Markdown>{text}</Markdown>

    this.createSection({
      sectionFn: render,
      ...options,
      options: {
        decorator: (story: () => ReactNode) => (
          <div className='text-section-container'>{story()}</div>
        )
      }
    })

    return this
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

    const documentationArray = toArray(documentation)

    const render = () =>
      documentationArray.length > 0 ? (
        <PropsTable documentation={documentationArray} />
      ) : (
        <Typography size='medium'>Component doesn't have props.</Typography>
      )

    this.createSection({
      sectionFn: render,
      title: name,
      subtitle: description
    })

    return this
  }

  addExample = (source: string, options: Options | string, module?: string) => {
    const finalOptions: Options =
      typeof options === 'string'
        ? {
            title: options
          }
        : options

    const { title, id, description, showEditCode, extra } = finalOptions

    const sectionId = title || id
    if (!sectionId) {
      throw new Error(
        'Cannot construct section id from options. Missing "title" or "id"'
      )
    }

    const sectionLinkId = normalize(sectionId)
    const permanentLink = generateUrl({
      host: getHost(),
      kind: this.page.section,
      type: this.page.title,
      section: sectionId
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
            module={module}
            permanentLink={permanentLink}
            showEditCode={showEditCode}
          />
        </div>
      </Fragment>
    )

    this.createSection({
      sectionFn: render,
      ...finalOptions,
      subtitle: description,
      info: extra
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
