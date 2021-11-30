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
  disabled?: boolean
  hovered?: boolean
  checked?: boolean
}

interface RectangularTagArgs {
  variant?: TagRectangularProps['variant']
  indicator?: TagRectangularProps['indicator']
}

const renderRegularTag = ({ variant }: RegularTagArgs) => (
  <TestingPicasso>
    <Container
      flex
      direction='column'
      gap='small'
      right='small'
      padded='medium'
    >
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

const renderCheckableTag = ({
  checked,
  hovered,
  disabled
}: CheckableTagArgs) => (
  <TestingPicasso>
    <Container padded='small'>
      <Tag.Checkable
        onChange={noop}
        checked={checked}
        hovered={hovered}
        disabled={disabled}
      >
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
        mount(renderRegularTag({ variant: 'blue' }))

        cy.get('body').happoScreenshot()
      })
      it('renders as grey', () => {
        mount(renderRegularTag({ variant: 'grey' }))

        cy.get('body').happoScreenshot()
      })
      it('renders as green', () => {
        mount(renderRegularTag({ variant: 'green' }))

        cy.get('body').happoScreenshot()
      })
      it('renders as yellow', () => {
        mount(renderRegularTag({ variant: 'yellow' }))

        cy.get('body').happoScreenshot()
      })
      it('renders as red', () => {
        mount(renderRegularTag({ variant: 'red' }))

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
      it('renders disabled', () => {
        mount(
          renderCheckableTag({ checked: true, hovered: true, disabled: true })
        )
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
        mount(renderRectangularTag({ variant: 'red' }))
        cy.get('body').happoScreenshot()
      })
      it('renders yellow', () => {
        mount(renderRectangularTag({ variant: 'yellow' }))
        cy.get('body').happoScreenshot()
      })
      it('renders green', () => {
        mount(renderRectangularTag({ variant: 'green' }))
        cy.get('body').happoScreenshot()
      })
      it('renders dark grey', () => {
        mount(renderRectangularTag({ variant: 'dark-grey' }))
        cy.get('body').happoScreenshot()
      })
      it('renders light grey', () => {
        mount(renderRectangularTag({ variant: 'light-grey' }))
        cy.get('body').happoScreenshot()
      })
    })
    describe('Indicators', () => {
      it('renders red indicator', () => {
        mount(renderIndicatorTag({ indicator: 'red' }))
        cy.get('body').happoScreenshot()
      })
      it('renders yellow indicator', () => {
        mount(renderIndicatorTag({ indicator: 'yellow' }))
        cy.get('body').happoScreenshot()
      })
      it('renders green indicator', () => {
        mount(renderIndicatorTag({ indicator: 'green' }))
        cy.get('body').happoScreenshot()
      })
      it('renders blue indicator', () => {
        mount(renderIndicatorTag({ indicator: 'blue' }))
        cy.get('body').happoScreenshot()
      })
    })
  })
})
