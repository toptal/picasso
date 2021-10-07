/* eslint-disable max-nested-callbacks */
import React from 'react'
import {
  Container,
  Settings16,
  Tag,
  TagProps,
  TagRectangularProps
} from '@toptal/picasso'
import { TypographyOverflow } from '@toptal/picasso-lab'
import { noop } from '@toptal/picaso-shared'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'

interface RegularExampleArgs {
  variant: TagProps['variant']
  hovered?: boolean
}

interface RectangularExampleArgs {
  variant?: TagRectangularProps['variant']
  indicator?: TagRectangularProps['indicator']
}

const renderVariantExample = ({ variant }: RegularExampleArgs) => (
  <TestingPicasso>
    <Container flex direction='column' gap='1rem' right='small' padded='medium'>
      <div>
        <Tag variant={variant}>{variant}</Tag>
      </div>
      <div>
        <Tag icon={<Settings16 />} variant={variant}>
          {variant}
        </Tag>
      </div>
    </Container>
  </TestingPicasso>
)

const renderInteractiveExample = ({
  variant,
  hovered
}: RegularTagExampleArgs) => (
  <TestingPicasso>
    <Container padded='small'>
      <Tag onClick={noop} variant={variant} hovered={hovered}>
        Label
      </Tag>
    </Container>
  </TestingPicasso>
)

const renderRectangularExample = ({
  variant = 'light',
  indicator
}: RectangularExampleArgs) => (
  <TestingPicasso>
    <Container padded='small'>
      <Tag.Rectangular indicator={indicator} variant={variant}>
        {variant}
      </Tag.Rectangular>
    </Container>
  </TestingPicasso>
)

describe('Tag', () => {
  it('allows to overflow with ellipsis', () => {
    mount(
      <TestingPicasso>
        <Container style={{ width: '500px' }}>
          <Tag variant='secondary'>
            <TypographyOverflow inline weight='semibold'>
              Loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong
            </TypographyOverflow>
          </Tag>
        </Container>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders in group', () => {
    mount(
      <TestingPicasso>
        <Tag.Group>
          <Tag>Angular JS</Tag>
          <Tag>React JS</Tag>
          <Tag onDelete={noop}>Ember JS</Tag>
          <Tag>Vue JS</Tag>
        </Tag.Group>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })
  describe('Regular', () => {
    describe('Variants', () => {
      it('renders as primary', () => {
        mount(renderVariantExample({ variant: 'primary' }))

        cy.get('body').happoScreenshot()
      })
      it('renders as secondary', () => {
        mount(renderVariantExample({ variant: 'secondary' }))

        cy.get('body').happoScreenshot()
      })
      it('renders as positive', () => {
        mount(renderVariantExample({ variant: 'positive' }))

        cy.get('body').happoScreenshot()
      })
      it('renders as warning', () => {
        mount(renderVariantExample({ variant: 'warning' }))

        cy.get('body').happoScreenshot()
      })
      it('renders as negative', () => {
        mount(renderVariantExample({ variant: 'negative' }))

        cy.get('body').happoScreenshot()
      })
    })
    describe('Interactive', () => {
      it('renders', () => {
        mount(renderInteractiveExample({}))
        cy.get('body').happoScreenshot()
      })
      it('renders hovered', () => {
        mount(renderInteractiveExample({ hovered: true }))
        cy.get('body').happoScreenshot()
      })
      it('renders selected', () => {
        mount(renderInteractiveExample({ variant: 'positive' }))
        cy.get('body').happoScreenshot()
      })
      it('renders selected hovered', () => {
        mount(renderInteractiveExample({ variant: 'positive', hovered: true }))
        cy.get('body').happoScreenshot()
      })
    })
    it('renders', () => {
      mount(
        <TestingPicasso>
          <Container padded='small'>
            <Tag>Label</Tag>
          </Container>
        </TestingPicasso>
      )

      cy.get('body').happoScreenshot()
    })
    it('renders with Icon', () => {
      mount(
        <TestingPicasso>
          <Container padded='small'>
            <Tag icon={<Settings16 />}>Label</Tag>
          </Container>
        </TestingPicasso>
      )

      cy.get('body').happoScreenshot()
    })
    it('renders with remove button', () => {
      mount(
        <TestingPicasso>
          <Container padded='small'>
            <Tag onDelete={noop}>Label</Tag>
          </Container>
          <Container padded='small'>
            <Tag icon={<Settings16 />} onDelete={noop}>
              Label
            </Tag>
          </Container>
        </TestingPicasso>
      )

      cy.get('body').happoScreenshot()
    })
    it('renders disabled', () => {
      mount(
        <TestingPicasso>
          <Container padded='small'>
            <Tag disabled>Label</Tag>
          </Container>
          <Container padded='small'>
            <Tag icon={<Settings16 />} onDelete={noop} disabled>
              Label
            </Tag>
          </Container>
          <Container padded='small'>
            <Tag icon={<Settings16 />} disabled connection={0}>
              Label
            </Tag>
          </Container>
          <Container padded='small'>
            <Tag icon={<Settings16 />} onDelete={noop} disabled connection={0}>
              Label
            </Tag>
          </Container>
        </TestingPicasso>
      )

      cy.get('body').happoScreenshot()
    })
    it('renders with connection', () => {
      mount(
        <TestingPicasso>
          <Container padded='small'>
            <Tag connection={0}>Label</Tag>
          </Container>
          <Container padded='small'>
            <Tag icon={<Settings16 />} connection={0}>
              Label
            </Tag>
          </Container>
          <Container padded='small'>
            <Tag icon={<Settings16 />} onDelete={noop} connection={0}>
              Label
            </Tag>
          </Container>
        </TestingPicasso>
      )
      cy.get('body').happoScreenshot()
    })
  })

  describe('Rectangular', () => {
    describe('Variants', () => {
      it('renders negative', () => {
        mount(renderRectangularExample({ variant: 'negative' }))
        cy.get('body').happoScreenshot()
      })
      it('renders warning', () => {
        mount(renderRectangularExample({ variant: 'warning' }))
        cy.get('body').happoScreenshot()
      })
      it('renders positive', () => {
        mount(renderRectangularExample({ variant: 'positive' }))
        cy.get('body').happoScreenshot()
      })
      it('renders dark', () => {
        mount(renderRectangularExample({ variant: 'dark' }))
        cy.get('body').happoScreenshot()
      })
      it('renders light', () => {
        mount(renderRectangularExample({ variant: 'light' }))
        cy.get('body').happoScreenshot()
      })
    })
    describe('Indicators', () => {
      it('renders negative indicator', () => {
        mount(renderRectangularExample({ indicator: 'negative' }))
        cy.get('body').happoScreenshot()
      })
      it('renders warning indicator', () => {
        mount(renderRectangularExample({ indicator: 'warning' }))
        cy.get('body').happoScreenshot()
      })
      it('renders positive indicator', () => {
        mount(renderRectangularExample({ indicator: 'positive' }))
        cy.get('body').happoScreenshot()
      })
      it('renders primary indicator', () => {
        mount(renderRectangularExample({ indicator: 'primary' }))
        cy.get('body').happoScreenshot()
      })
    })
  })
})
