import React, { useState } from 'react'
import { mount } from '@cypress/react'
import {
  Autocomplete,
  Button,
  Container,
  Dropdown,
  Grid,
  Link,
  Menu,
  Modal,
  Tooltip,
  TooltipProps,
  Typography
} from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const TOOLTIP_LONG_TEXT = 'Content '.repeat(10)

const SnapshotTooltipExample = (props?: Partial<TooltipProps>) => (
  <TestingPicasso>
    <Tooltip content='Content' open {...props}>
      <Button>Button</Button>
    </Tooltip>
  </TestingPicasso>
)

const PlacementTooltipExample = () => {
  return (
    <TestingPicasso>
      <Container style={{ padding: '200px' }}>
        <Container>
          <Grid direction='row'>
            <Grid.Item small={4}>
              <Tooltip placement='top-start' content='Content' open>
                <Button fullWidth>top-start</Button>
              </Tooltip>
            </Grid.Item>
            <Grid.Item small={4}>
              <Tooltip placement='top' content='Content' open>
                <Button fullWidth>top</Button>
              </Tooltip>
            </Grid.Item>
            <Grid.Item small={4}>
              <Tooltip placement='top-end' content='Content' open>
                <Button fullWidth>top-end</Button>
              </Tooltip>
            </Grid.Item>
          </Grid>
        </Container>
        <Container bottom='small'>
          <Grid direction='row'>
            <Grid.Item small={4}>
              <Tooltip placement='left-start' content='Content' open>
                <Button fullWidth>left-start</Button>
              </Tooltip>
            </Grid.Item>
            <Grid.Item small={4} />
            <Grid.Item small={4}>
              <Tooltip placement='right-start' content='Content' open>
                <Button fullWidth>right-start</Button>
              </Tooltip>
            </Grid.Item>
          </Grid>
        </Container>
        <Container bottom='small'>
          <Grid direction='row'>
            <Grid.Item small={4}>
              <Tooltip placement='left' content='Content' open>
                <Button fullWidth>left</Button>
              </Tooltip>
            </Grid.Item>
            <Grid.Item small={4} />
            <Grid.Item small={4}>
              <Tooltip placement='right' content='Content' open>
                <Button fullWidth>right</Button>
              </Tooltip>
            </Grid.Item>
          </Grid>
        </Container>
        <Container bottom='small'>
          <Grid direction='row'>
            <Grid.Item small={4}>
              <Tooltip placement='left-end' content='Content' open>
                <Button fullWidth>left-end</Button>
              </Tooltip>
            </Grid.Item>
            <Grid.Item small={4} />
            <Grid.Item small={4}>
              <Tooltip placement='right-end' content='Content' open>
                <Button fullWidth>right-end</Button>
              </Tooltip>
            </Grid.Item>
          </Grid>
        </Container>
        <Container bottom='small'>
          <Grid direction='row'>
            <Grid.Item small={4}>
              <Tooltip placement='bottom-start' content='Content' open>
                <Button fullWidth>bottom-start</Button>
              </Tooltip>
            </Grid.Item>
            <Grid.Item small={4}>
              <Tooltip placement='bottom' content='Content' open>
                <Button fullWidth>bottom</Button>
              </Tooltip>
            </Grid.Item>
            <Grid.Item small={4}>
              <Tooltip placement='bottom-end' content='Content' open>
                <Button fullWidth>bottom-end</Button>
              </Tooltip>
            </Grid.Item>
          </Grid>
        </Container>
      </Container>
    </TestingPicasso>
  )
}

const ModalTooltipExample = () => {
  return (
    <TestingPicasso>
      <Tooltip content='Content' open>
        <Button>Button</Button>
      </Tooltip>
      <Modal open transitionDuration={0} size='full-screen'>
        <Modal.Title>Title</Modal.Title>
        <Modal.Actions>
          <Tooltip content='Content' open>
            <Button>Button</Button>
          </Tooltip>
        </Modal.Actions>
      </Modal>
    </TestingPicasso>
  )
}

const LinkTooltipExample = () => {
  const tooltipContent = (
    <Link href='#link' data-testid='tooltip-content'>
      Link
    </Link>
  )

  return (
    <TestingPicasso>
      <Tooltip content={tooltipContent} interactive>
        <Button data-testid='tooltip-trigger'>Button</Button>
      </Tooltip>
    </TestingPicasso>
  )
}

const AutocompleteTooltipExample = () => {
  const [value, setValue] = useState('')

  const tooltipContent = (
    <Typography data-testid='tooltip-content'>Content</Typography>
  )

  return (
    <TestingPicasso>
      <Autocomplete
        value={value}
        options={[{ text: 'Belarus' }, { text: 'Slovakia' }]}
        placeholder='Start typing country...'
        renderOption={(option, index) => (
          <Tooltip open={!index} content={tooltipContent}>
            <Typography size='medium' weight='semibold'>
              {option.text}
            </Typography>
          </Tooltip>
        )}
        onChange={setValue}
        data-testid='autocomplete'
      />
    </TestingPicasso>
  )
}

const DropdownTooltipExample = () => {
  const tooltipContent = (
    <Typography data-testid='tooltip-content'>Content</Typography>
  )

  const dropdownContent = (
    <Menu>
      <Menu.Item>Option 1</Menu.Item>
      <Tooltip open content={tooltipContent}>
        <Menu.Item>Option 2</Menu.Item>
      </Tooltip>
      <Menu.Item>Option 3</Menu.Item>
    </Menu>
  )

  return (
    <TestingPicasso>
      <Dropdown content={dropdownContent}>
        Open Dropdown
        <Dropdown.Arrow data-testid='dropdown-trigger' />
      </Dropdown>
    </TestingPicasso>
  )
}

describe('Tooltip', () => {
  it('renders by default', () => {
    mount(<SnapshotTooltipExample />)
    cy.get('body').happoScreenshot()
  })

  it('renders without arrow', () => {
    mount(<SnapshotTooltipExample arrow={false} />)
    cy.get('body').happoScreenshot()
  })

  it('renders with disabled portals', () => {
    mount(<SnapshotTooltipExample disablePortal />)
    cy.get('body').happoScreenshot()
  })

  it('renders compact', () => {
    mount(<SnapshotTooltipExample compact />)
    cy.get('body').happoScreenshot()
  })

  it('renders in light variant', () => {
    mount(<SnapshotTooltipExample variant='light' />)
    cy.get('body').happoScreenshot()
  })

  it('renders in dark variant', () => {
    mount(<SnapshotTooltipExample variant='dark' />)
    cy.get('body').happoScreenshot()
  })

  it('renders long text with max width', () => {
    mount(<SnapshotTooltipExample content={TOOLTIP_LONG_TEXT} />)
    cy.get('body').happoScreenshot()
  })

  it('renders long text with no max width', () => {
    mount(
      <SnapshotTooltipExample content={TOOLTIP_LONG_TEXT} maxWidth='none' />
    )
    cy.get('body').happoScreenshot()
  })

  it('renders without overflow prevention', () => {
    mount(
      <SnapshotTooltipExample
        content={TOOLTIP_LONG_TEXT}
        preventOverflow={false}
      />
    )
    cy.get('body').happoScreenshot()
  })

  it('renders with different placements', () => {
    mount(<PlacementTooltipExample />)
    cy.get('body').happoScreenshot()
  })

  it('renders inside and outside of a modal', () => {
    mount(<ModalTooltipExample />)
    cy.get('body').happoScreenshot()
  })

  it('renders interactive content', () => {
    mount(<LinkTooltipExample />)

    cy.get('[data-testid="tooltip-trigger"').click()
    cy.get('[data-testid="tooltip-content"').should('be.visible')
    cy.get('body').happoScreenshot()

    cy.get('[data-testid="tooltip-content"').click()
    cy.url().should('include', '#link')
    cy.get('[data-testid="tooltip-content"').should('be.visible')

    cy.get('[data-testid="tooltip-trigger"').click()
    cy.get('[data-testid="tooltip-content"').should('not.be.visible')
  })

  it('renders inside an autocomplete', () => {
    mount(<AutocompleteTooltipExample />)

    cy.get('[data-testid="autocomplete"').click()
    cy.get('[data-testid="tooltip-content"').should('be.visible')
    cy.get('body').happoScreenshot()
  })

  it('renders inside a dropdown', () => {
    mount(<DropdownTooltipExample />)

    cy.get('[data-testid="dropdown-trigger"]').click()
    cy.get('[data-testid="tooltip-content"]').should('be.visible')
    cy.get('body').happoScreenshot()
  })
})
