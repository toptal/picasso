/* eslint-disable max-nested-callbacks */
/* eslint-disable max-lines-per-function */
import React from 'react'
import {
  Container,
  Settings16,
  Tag,
  TagProps,
  TagRectangularProps
} from '@toptal/picasso'
import { TypographyOverflow } from '@toptal/picasso-lab'
import { noop } from '@toptal/picasso/utils'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'

interface RegularTagArgs {
  variant?: TagProps['variant']
}

interface CheckableTagArgs {
  checked?: boolean
  hovered?: boolean
}

interface RectangularTagArgs {
  variant?: TagRectangularProps['variant']
  indicator?: TagRectangularProps['indicator']
}

const renderRegularTag = ({ variant }: RegularTagArgs) => (
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

const renderCheckableTag = ({ checked, hovered }: CheckableTagArgs) => (
  <TestingPicasso>
    <Container padded='small'>
      <Tag.Checkable onChange={noop} checked={checked} hovered={hovered}>
        Label
      </Tag.Checkable>
    </Container>
  </TestingPicasso>
)

const renderIndicatorTag = ({ indicator }: RectangularTagArgs) => (
  <TestingPicasso>
    <Container padded='small'>
      <Tag.Rectangular indicator={indicator}>{indicator}</Tag.Rectangular>
    </Container>
  </TestingPicasso>
)

const renderRectangularTag = ({ variant }: RectangularTagArgs) => (
  <TestingPicasso>
    <Container padded='small'>
      <Tag.Rectangular variant={variant}>{variant}</Tag.Rectangular>
    </Container>
  </TestingPicasso>
)

describe('Tag', () => {
  it('allows to overflow with ellipsis', () => {
    mount(
      <TestingPicasso>
        <Container style={{ width: '500px' }}>
          <Tag variant='light'>
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
        mount(renderRegularTag({ variant: 'primary' }))

        cy.get('body').happoScreenshot()
      })
      it('renders as light', () => {
        mount(renderRegularTag({ variant: 'light' }))

        cy.get('body').happoScreenshot()
      })
      it('renders as positive', () => {
        mount(renderRegularTag({ variant: 'positive' }))

        cy.get('body').happoScreenshot()
      })
      it('renders as warning', () => {
        mount(renderRegularTag({ variant: 'warning' }))

        cy.get('body').happoScreenshot()
      })
      it('renders as negative', () => {
        mount(renderRegularTag({ variant: 'negative' }))

        cy.get('body').happoScreenshot()
      })
    })
    describe('Interactive', () => {
      it('renders', () => {
        mount(renderCheckableTag({}))
        cy.get('body').happoScreenshot()
      })
      it('renders hovered', () => {
        mount(renderCheckableTag({ hovered: true }))
        cy.get('body').happoScreenshot()
      })
      it('renders selected', () => {
        mount(renderCheckableTag({ checked: true }))
        cy.get('body').happoScreenshot()
      })
      it('renders selected hovered', () => {
        mount(renderCheckableTag({ checked: true, hovered: true }))
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
            <Tag
              icon={<Settings16 />}
              disabled
              endAdornment={<Tag.Connection>0</Tag.Connection>}
            >
              Label
            </Tag>
          </Container>
          <Container padded='small'>
            <Tag
              icon={<Settings16 />}
              onDelete={noop}
              disabled
              endAdornment={<Tag.Connection>0</Tag.Connection>}
            >
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
            <Tag endAdornment={<Tag.Connection>0</Tag.Connection>}>Label</Tag>
          </Container>
          <Container padded='small'>
            <Tag
              icon={<Settings16 />}
              endAdornment={<Tag.Connection>0</Tag.Connection>}
            >
              Label
            </Tag>
          </Container>
          <Container padded='small'>
            <Tag
              icon={<Settings16 />}
              onDelete={noop}
              endAdornment={<Tag.Connection>0</Tag.Connection>}
            >
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
        mount(renderRectangularTag({ variant: 'negative' }))
        cy.get('body').happoScreenshot()
      })
      it('renders warning', () => {
        mount(renderRectangularTag({ variant: 'warning' }))
        cy.get('body').happoScreenshot()
      })
      it('renders positive', () => {
        mount(renderRectangularTag({ variant: 'positive' }))
        cy.get('body').happoScreenshot()
      })
      it('renders dark', () => {
        mount(renderRectangularTag({ variant: 'dark' }))
        cy.get('body').happoScreenshot()
      })
      it('renders light', () => {
        mount(renderRectangularTag({ variant: 'light' }))
        cy.get('body').happoScreenshot()
      })
    })
    describe('Indicators', () => {
      it('renders negative indicator', () => {
        mount(renderIndicatorTag({ indicator: 'negative' }))
        cy.get('body').happoScreenshot()
      })
      it('renders warning indicator', () => {
        mount(renderIndicatorTag({ indicator: 'warning' }))
        cy.get('body').happoScreenshot()
      })
      it('renders positive indicator', () => {
        mount(renderIndicatorTag({ indicator: 'positive' }))
        cy.get('body').happoScreenshot()
      })
      it('renders primary indicator', () => {
        mount(renderIndicatorTag({ indicator: 'primary' }))
        cy.get('body').happoScreenshot()
      })
    })
  })
})
