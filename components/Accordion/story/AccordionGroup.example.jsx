import React from 'react'
import { Accordion } from '@toptal/picasso'

const AccordionAccordionGroupExample = () => (
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
)

const SummaryDogDefinitionPanel = () => <div>What is a dog?</div>
const DetailsDogDefinitionPanel = () => (
  <div>
    A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households across
    the world.
  </div>
)
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

export default AccordionAccordionGroupExample
