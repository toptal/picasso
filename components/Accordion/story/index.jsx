import PicassoBook from '../../../.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'Accordion',
  'Accordions store information behind collapsible sections, allowing for more information to be stored in a limited amount of space.'
)

const docs = [
  {
    name: 'Details',
    type: 'node',
    description: 'Collapsable content of accordion'
  },
  {
    name: 'Summary',
    type: 'node',
    description: 'Always visible part of accordion'
  },
  {
    name: 'expanded',
    type: 'boolean',
    description:
      'Define accordion content state, whether it should be collapsed or displayed'
  },
  {
    name: 'onChange',
    type: 'function',
    description: 'Callback called when accordion is toggled'
  }
]

page
  .addDocs(docs)
  .addExample('Accordion/story/Default.example.jsx', {
    title: 'Default',
    description:
      'Styled sections is a default behaviour of Accordion when `expanded` prop is not specified (uncontrolled)'
  })
  .addExample('Accordion/story/Controlled.example.jsx', {
    title: 'Controlled',
    description:
      'You can control of expansion or collapsing of the Details panel by passing `expanded` prop'
  })
  .addExample('Accordion/story/AccordionGroup.example.jsx', {
    title: 'Group',
    description: 'Accordions with styled sections in a group'
  })
