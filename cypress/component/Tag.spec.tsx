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

interface RegularExampleArgs {
  variant?: TagProps['variant']
}

interface CheckableExampleArgs {
  checked?: boolean
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

const renderCheckableExample = ({ checked, hovered }: CheckableExampleArgs) => (
  <TestingPicasso>
    <Container padded='small'>
      <Tag.Checkable onChange={noop} checked={checked} hovered={hovered}>
        Label
      </Tag.Checkable>
    </Container>
  </TestingPicasso>
)

const renderIndicatorExample = ({ indicator }: RectangularExampleArgs) => (
  <TestingPicasso>
    <Container padded='small'>
      <Tag.Rectangular indicator={indicator}>{indicator}</Tag.Rectangular>
    </Container>
  </TestingPicasso>
)

const renderRectangularExample = ({ variant }: RectangularExampleArgs) => (
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
          <Tag variant='grey'>
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
      it('renders as blue', () => {
        mount(renderVariantExample({ variant: 'blue' }))

        cy.get('body').happoScreenshot()
      })
      it('renders as grey', () => {
        mount(renderVariantExample({ variant: 'grey' }))

        cy.get('body').happoScreenshot()
      })
      it('renders as green', () => {
        mount(renderVariantExample({ variant: 'green' }))

        cy.get('body').happoScreenshot()
      })
      it('renders as yellow', () => {
        mount(renderVariantExample({ variant: 'yellow' }))

        cy.get('body').happoScreenshot()
      })
      it('renders as red', () => {
        mount(renderVariantExample({ variant: 'red' }))

        cy.get('body').happoScreenshot()
      })
    })
    describe('Interactive', () => {
      it('renders', () => {
        mount(renderCheckableExample({}))
        cy.get('body').happoScreenshot()
      })
      it('renders hovered', () => {
        mount(renderCheckableExample({ hovered: true }))
        cy.get('body').happoScreenshot()
      })
      it('renders selected', () => {
        mount(renderCheckableExample({ checked: true }))
        cy.get('body').happoScreenshot()
      })
      it('renders selected hovered', () => {
        mount(renderCheckableExample({ checked: true, hovered: true }))
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
      it('renders red', () => {
        mount(renderRectangularExample({ variant: 'red' }))
        cy.get('body').happoScreenshot()
      })
      it('renders yellow', () => {
        mount(renderRectangularExample({ variant: 'yellow' }))
        cy.get('body').happoScreenshot()
      })
      it('renders green', () => {
        mount(renderRectangularExample({ variant: 'green' }))
        cy.get('body').happoScreenshot()
      })
      it('renders dark-grey', () => {
        mount(renderRectangularExample({ variant: 'dark-grey' }))
        cy.get('body').happoScreenshot()
      })
      it('renders light-grey', () => {
        mount(renderRectangularExample({ variant: 'light-grey' }))
        cy.get('body').happoScreenshot()
      })
    })
    describe('Indicators', () => {
      it('renders red indicator', () => {
        mount(renderIndicatorExample({ indicator: 'red' }))
        cy.get('body').happoScreenshot()
      })
      it('renders yellow indicator', () => {
        mount(renderIndicatorExample({ indicator: 'yellow' }))
        cy.get('body').happoScreenshot()
      })
      it('renders green indicator', () => {
        mount(renderIndicatorExample({ indicator: 'green' }))
        cy.get('body').happoScreenshot()
      })
      it('renders blue indicator', () => {
        mount(renderIndicatorExample({ indicator: 'blue' }))
        cy.get('body').happoScreenshot()
      })
    })
  })
})
