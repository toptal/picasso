/* eslint-disable max-nested-callbacks */
/* eslint-disable max-lines-per-function */
import React from 'react'
import {
  Container,
  Settings16,
  Tag,
  TagProps,
  TagRectangularProps,
  TypographyOverflow,
} from '@toptal/picasso'
import { noop } from '@toptal/picasso/utils'

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
  <Container flex direction='column' gap='small' right='small' padded='medium'>
    <div>
      <Tag variant={variant}>{variant}</Tag>
    </div>
    <div>
      <Tag icon={<Settings16 />} variant={variant}>
        {variant}
      </Tag>
    </div>
  </Container>
)

const renderCheckableTag = ({
  checked,
  hovered,
  disabled,
}: CheckableTagArgs) => (
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
)

const renderIndicatorTag = ({ indicator }: RectangularTagArgs) => (
  <Container padded='small'>
    <Tag.Rectangular indicator={indicator}>{indicator}</Tag.Rectangular>
  </Container>
)

const renderRectangularTag = ({ variant }: RectangularTagArgs) => (
  <Container padded='small'>
    <Tag.Rectangular variant={variant}>{variant}</Tag.Rectangular>
  </Container>
)

describe('Tag', () => {
  it('allows to overflow with ellipsis', () => {
    cy.mount(
      <Container style={{ width: '500px' }}>
        <Tag variant='light-grey'>
          <TypographyOverflow inline weight='semibold'>
            Loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong
          </TypographyOverflow>
        </Tag>
      </Container>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders in group', () => {
    cy.mount(
      <Tag.Group>
        <Tag>Angular JS</Tag>
        <Tag>React JS</Tag>
        <Tag onDelete={noop}>Ember JS</Tag>
        <Tag>Vue JS</Tag>
      </Tag.Group>
    )
    cy.get('body').happoScreenshot()
  })
  describe('Regular', () => {
    describe('Variants', () => {
      it('renders as blue', () => {
        cy.mount(renderRegularTag({ variant: 'blue' }))

        cy.get('body').happoScreenshot()
      })
      it('renders as grey', () => {
        cy.mount(renderRegularTag({ variant: 'light-grey' }))

        cy.get('body').happoScreenshot()
      })
      it('renders as green', () => {
        cy.mount(renderRegularTag({ variant: 'green' }))

        cy.get('body').happoScreenshot()
      })
      it('renders as yellow', () => {
        cy.mount(renderRegularTag({ variant: 'yellow' }))

        cy.get('body').happoScreenshot()
      })
      it('renders as red', () => {
        cy.mount(renderRegularTag({ variant: 'red' }))

        cy.get('body').happoScreenshot()
      })
    })
    describe('Interactive', () => {
      it('renders', () => {
        cy.mount(renderCheckableTag({}))
        cy.get('body').happoScreenshot()
      })
      it('renders hovered', () => {
        cy.mount(renderCheckableTag({ hovered: true }))
        cy.get('body').happoScreenshot()
      })
      it('renders selected', () => {
        cy.mount(renderCheckableTag({ checked: true }))
        cy.get('body').happoScreenshot()
      })
      it('renders selected hovered', () => {
        cy.mount(renderCheckableTag({ checked: true, hovered: true }))
        cy.get('body').happoScreenshot()
      })
      it('renders disabled', () => {
        cy.mount(
          renderCheckableTag({ checked: true, hovered: true, disabled: true })
        )
        cy.get('body').happoScreenshot()
      })
    })
    it('renders', () => {
      cy.mount(
        <Container padded='small'>
          <Tag>Label</Tag>
        </Container>
      )

      cy.get('body').happoScreenshot()
    })
    it('renders with Icon', () => {
      cy.mount(
        <Container padded='small'>
          <Tag icon={<Settings16 />}>Label</Tag>
        </Container>
      )

      cy.get('body').happoScreenshot()
    })
    it('renders with remove button', () => {
      cy.mount(
        <>
          <Container padded='small'>
            <Tag onDelete={noop}>Label</Tag>
          </Container>
          <Container padded='small'>
            <Tag icon={<Settings16 />} onDelete={noop}>
              Label
            </Tag>
          </Container>
        </>
      )

      cy.get('body').happoScreenshot()
    })
    it('renders disabled', () => {
      cy.mount(
        <>
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
        </>
      )

      cy.get('body').happoScreenshot()
    })
    it('renders with connection', () => {
      cy.mount(
        <>
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
        </>
      )
      cy.get('body').happoScreenshot()
    })
  })

  describe('Rectangular', () => {
    describe('Variants', () => {
      it('renders red', () => {
        cy.mount(renderRectangularTag({ variant: 'red' }))
        cy.get('body').happoScreenshot()
      })
      it('renders yellow', () => {
        cy.mount(renderRectangularTag({ variant: 'yellow' }))
        cy.get('body').happoScreenshot()
      })
      it('renders green', () => {
        cy.mount(renderRectangularTag({ variant: 'green' }))
        cy.get('body').happoScreenshot()
      })
      it('renders dark grey', () => {
        cy.mount(renderRectangularTag({ variant: 'dark-grey' }))
        cy.get('body').happoScreenshot()
      })
      it('renders light grey', () => {
        cy.mount(renderRectangularTag({ variant: 'light-grey' }))
        cy.get('body').happoScreenshot()
      })
    })
    describe('Indicators', () => {
      it('renders red indicator', () => {
        cy.mount(renderIndicatorTag({ indicator: 'red' }))
        cy.get('body').happoScreenshot()
      })
      it('renders yellow indicator', () => {
        cy.mount(renderIndicatorTag({ indicator: 'yellow' }))
        cy.get('body').happoScreenshot()
      })
      it('renders green indicator', () => {
        cy.mount(renderIndicatorTag({ indicator: 'green' }))
        cy.get('body').happoScreenshot()
      })
      it('renders blue indicator', () => {
        cy.mount(renderIndicatorTag({ indicator: 'blue' }))
        cy.get('body').happoScreenshot()
      })
    })
  })
})
