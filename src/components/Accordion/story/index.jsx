import PicassoBook from '.storybook/components/PicassoBook'

import { Accordion } from '../Accordion'

const page = PicassoBook.createPage(
  'Accordion',
  'Accordions store information behind collapsible sections, allowing for more information to be stored in a limited amount of space.'
)

page
  .addComponentDocs(Accordion, {
    onChange: {
      type: {
        name: 'function',
        description: '(event: React.ChangeEvent<{}>, expanded: boolean) => void'
      }
    }
  })
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
