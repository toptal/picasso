import React, { useState } from 'react'
import { mount } from '@cypress/react'
import {
  Autocomplete,
  Button,
  Checkbox,
  Container,
  Dropdown,
  Grid,
  Link,
  Menu,
  Modal,
  Radio,
  Tooltip,
  TooltipProps,
  Typography
} from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const TOOLTIP_LONG_TEXT = 'Content '.repeat(10)

const TRIGGER_TEST_ID = 'tooltip-trigger'
const CONTENT_TEST_ID = 'tooltip-content'
const TRIGGER_QUERY_SELECTOR = `[data-testid="${TRIGGER_TEST_ID}"]`
const CONTENT_QUERY_SELECTOR = `[data-testid="${CONTENT_TEST_ID}"]`

const hoverTrigger = () => {
  cy.get(TRIGGER_QUERY_SELECTOR).realHover()
}

const hoverOutsideTrigger = () => {
  cy.get(TRIGGER_QUERY_SELECTOR).realHover({
    position: { x: 0, y: -200 }
  })
}

const clickTrigger = () => {
  cy.get(TRIGGER_QUERY_SELECTOR).click()
}

const BasicTooltipExample = () => {
  const tooltipContent = <span data-testid='tooltip-content'>Content</span>

  return (
    <TestingPicasso>
      <Tooltip content={tooltipContent}>
        <Button data-testid={TRIGGER_TEST_ID}>
          <span style={{ padding: '20px' }}>Button</span>
        </Button>
      </Tooltip>
    </TestingPicasso>
  )
}

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

const TOOLTIP_LINK_HREF = '#link'
const LinkTooltipExample = () => {
  const tooltipContent = (
    <span data-testid={CONTENT_TEST_ID}>
      <Link href={TOOLTIP_LINK_HREF} color='white'>Link</Link>
    </span>
  )

  return (
    <TestingPicasso>
      <Tooltip content={tooltipContent} interactive>
        <Button data-testid={TRIGGER_TEST_ID}>Button</Button>
      </Tooltip>
    </TestingPicasso>
  )
}

const CheckboxTooltipExample = () => {
  const tooltipContent = <span data-testid={CONTENT_TEST_ID}>Content</span>

  return (
    <TestingPicasso>
      <Tooltip content={tooltipContent} interactive>
        <Checkbox label='Checkbox' data-testid={TRIGGER_TEST_ID} />
      </Tooltip>
    </TestingPicasso>
  )
}

const RadioTooltipExample = () => {
  const tooltipContent = <span data-testid={CONTENT_TEST_ID}>Content</span>

  return (
    <TestingPicasso>
      <Tooltip content={tooltipContent} interactive>
        <Radio label='Radio' data-testid={TRIGGER_TEST_ID} />
      </Tooltip>
    </TestingPicasso>
  )
}

const AutocompleteTooltipExample = () => {
  const [value, setValue] = useState('')

  const tooltipContent = (
    <Typography data-testid={CONTENT_TEST_ID}>Content</Typography>
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
    <Typography data-testid={CONTENT_TEST_ID}>Content</Typography>
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

  it('renders on hover, and hides on click', () => {
    mount(<BasicTooltipExample />)

    hoverOutsideTrigger()
    cy.get(CONTENT_QUERY_SELECTOR).should('not.exist')

    hoverTrigger()
    cy.get(CONTENT_QUERY_SELECTOR).should('be.visible')

    clickTrigger()
    cy.get(CONTENT_QUERY_SELECTOR).should('not.be.visible')
  })

  it('renders on hover, and hides on click for Checkbox', () => {
    mount(<CheckboxTooltipExample />)

    hoverOutsideTrigger()
    cy.get(CONTENT_QUERY_SELECTOR).should('not.exist')

    hoverTrigger()
    cy.get(CONTENT_QUERY_SELECTOR).should('exist')

    cy.get('body').happoScreenshot()

    clickTrigger()
    cy.get(CONTENT_QUERY_SELECTOR).should('not.be.visible')
  })

  it('renders on hover, and hides on click for Radio', () => {
    mount(<RadioTooltipExample />)

    hoverOutsideTrigger()
    cy.get(CONTENT_QUERY_SELECTOR).should('not.exist')

    hoverTrigger()
    cy.get(CONTENT_QUERY_SELECTOR).should('be.visible')

    cy.get('body').happoScreenshot()

    clickTrigger()
    cy.get(CONTENT_QUERY_SELECTOR).should('not.be.visible')
  })

  it('renders on hover, hides on click, and does not render again until the mouse leave trigger element boundaries', () => {
    mount(<BasicTooltipExample />)

    hoverOutsideTrigger()
    cy.get(CONTENT_QUERY_SELECTOR).should('not.exist')

    hoverTrigger()
    cy.get(CONTENT_QUERY_SELECTOR).should('be.visible')

    clickTrigger()
    cy.get(CONTENT_QUERY_SELECTOR).should('not.be.visible')

    cy.get(TRIGGER_QUERY_SELECTOR).realHover({ position: 'topLeft' })
    cy.get(TRIGGER_QUERY_SELECTOR).realHover({
      position: 'bottomRight'
    })
    cy.get(CONTENT_QUERY_SELECTOR).should('not.be.visible')
  })

  it('renders interactive content', () => {
    mount(<LinkTooltipExample />)

    hoverTrigger()
    cy.get(CONTENT_QUERY_SELECTOR).should('be.visible')
    cy.get('body').happoScreenshot()

    cy.get(CONTENT_QUERY_SELECTOR).click()
    cy.url().should('include', TOOLTIP_LINK_HREF)
    cy.get(CONTENT_QUERY_SELECTOR).should('be.visible')

    clickTrigger()
    cy.get(CONTENT_QUERY_SELECTOR).should('not.be.visible')
  })

  it('renders inside an autocomplete', () => {
    mount(<AutocompleteTooltipExample />)

    cy.get('[data-testid="autocomplete"').click()
    cy.get(CONTENT_QUERY_SELECTOR).should('exist')
    cy.get('body').happoScreenshot()
  })

  it('renders inside a dropdown', () => {
    mount(<DropdownTooltipExample />)

    cy.get('[data-testid="dropdown-trigger"]').click()
    cy.get(CONTENT_QUERY_SELECTOR).should('be.visible')
    cy.get('body').happoScreenshot()
  })
})
