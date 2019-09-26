declare var TEST_ENV: string // defined by ENV

import React, { Fragment } from 'react'
import { toArray } from 'lodash'

import DocumentationGenerator, {
  PropDocumentation,
  PropDocumentationMap,
  Documentable
} from '~/.storybook/utils/documentation-generator'
import { generateUrl, getHost, normalize } from '@/utils/url-generator'

import Base from './Base'
import Section from './Section'
import Page from './Page'

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

  addTextSection = (text: string, options: any) => {
    if (TEST_ENV === 'visual') {
      return this
    }

    const render = () => <Markdown>{text}</Markdown>

    this.createSection({
      sectionFn: render,
      ...options,
      options: {
        decorator: (story: any) => (
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

    const sectionId = finalOptions.title || finalOptions.id

    const sectionLinkId = normalize(sectionId)
    const permanentLink = generateUrl({
      host: getHost(),
      kind: this.page.getPicassoSection(this.page.section),
      type: this.page.title,
      section: sectionId
    })

    let render = null
    if (TEST_ENV === 'visual') {
      const CodeExampleVisualTest = React.lazy(() =>
        import('../CodeExampleVisualTest')
      )

      render = () => (
        <React.Suspense fallback={null}>
          <Fragment>
            <div
              className='chapter-container'
              style={{ display: 'inline-block' }}
              id={sectionLinkId}
            >
              <CodeExampleVisualTest src={source} />
            </div>
          </Fragment>
        </React.Suspense>
      )
    } else {
      const CodeExample = React.lazy(() => import('../CodeExample'))

      render = () => (
        <React.Suspense fallback={null}>
          <Fragment>
            <div
              className='chapter-container'
              style={{ display: 'block' }}
              id={sectionLinkId}
            >
              <CodeExample
                src={source}
                permanentLink={permanentLink}
                showEditCode={finalOptions.showEditCode}
              />
            </div>
          </Fragment>
        </React.Suspense>
      )
    }

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
