/* eslint-disable react/no-multi-comp, react/require-optimization, react/prop-types */
import React from 'react'
import { storiesOf } from '@storybook/react'

import StoryTeller from '../../.storybook/StoryTeller'
import Accordion from './'
import Spacer from '../Spacer'
import Button from '../Button'

const stories = storiesOf('Accordion', module)

class ExpandedControl extends React.Component {
  constructor () {
    super()

    this.state = {
      expanded: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    const { expanded } = this.state

    this.setState({
      expanded: !expanded
    })
  }

  render () {
    const { children } = this.props
    const { expanded } = this.state

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Spacer bottom={2}>
          <Button onClick={this.handleClick}>Expand/Collapse</Button>
        </Spacer>

        <div>{React.cloneElement(children, { expanded })}</div>
      </div>
    )
  }
}

const SummaryDogDefinitionPanel = () => <div>What is a dog?</div>
const DetailsDogDefinitionPanel = () => (
  <div>
    A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households across
    the world.
  </div>
)

// Chapter Accordion

const teller = new StoryTeller(
  'Accordion',
  'Accordions store information behind collapsible sections, allowing for more information to be stored in a limited amount of space.'
)
const chapter = teller.addChapter()

chapter.addSection(
  'Default',
  'Styled sections is a default behaviour of Accordion when `expanded` prop is not specified (uncontrolled).',
  () => (
    <div style={{ width: '430px' }}>
      <Accordion
        Details={<DetailsDogDefinitionPanel />}
        Summary={<SummaryDogDefinitionPanel />}
      />
    </div>
  )
)

chapter.addSection(
  'Controlled',
  'You can control of expansion or collapsing of the Details panel by passing `expanded` prop.',
  () => (
    <ExpandedControl>
      <Accordion Details={<DetailsDogDefinitionPanel />} expanded={false} />
    </ExpandedControl>
  )
)
stories.addWithChapters('Accordion', teller.toStory())

// Chapter Accordion Group

const tellerGroup = new StoryTeller(
  'Group',
  'Default Accordions with styled sections in a group.'
)
const chapterGroup = tellerGroup.addChapter()

const SummaryDogKindPanel = () => <div>What kinds of dogs are there?</div>
const DetailsDogKindPanel = () => (
  <div>
    There are many breeds of dogs. Each breed varies in size and temperament.
    Owners often select a breed of dog that they find to be compatible with
    their own lifestyle and desires from a companion.
  </div>
)
const SummaryDogAcquirePanel = () => <div>How do you acquire a dog?</div>
const DetailsDogAcquirePanel = () => (
  <div>
    Three common ways for a prospective owner to acquire a dog is from pet
    shops, private owners, or shelters. A pet shop may be the most convenient
    way to buy a dog. Buying a dog from a private owner allows you to assess the
    pedigree and upbringing of your dog before choosing to take it home. Lastly,
    finding your dog from a shelter, helps give a good home to a dog who may not
    find one so readily.
  </div>
)

chapterGroup.addSection('Default', null, () => (
  <div style={{ width: '430px' }}>
    <Accordion
      Details={<DetailsDogDefinitionPanel />}
      Summary={<SummaryDogDefinitionPanel />}
    />
    <Accordion
      Details={<DetailsDogKindPanel />}
      Summary={<SummaryDogKindPanel />}
    />
    <Accordion
      Details={<DetailsDogAcquirePanel />}
      Summary={<SummaryDogAcquirePanel />}
    />
  </div>
))

stories.addWithChapters('Accordion Group', tellerGroup.toStory())
