import PicassoBook from '~/.storybook/components/PicassoBook'

import { Accordion } from '../Accordion'

const page = PicassoBook.createPage(
  'Accordion',
  'Accordions store information behind collapsible sections, allowing for more information to be stored in a limited amount of space.'
)

page.createTabChapter('Props').addComponentDocs({
  component: Accordion,
  additionalDocs: {
    onChange: {
      type: {
        name: 'function',
        description: '(event: React.ChangeEvent<{}>, expanded: boolean) => void'
      }
    }
  }
})

page
  .createChapter()

  .addExample('Accordion/story/Default.example.jsx', {
    title: 'Default',
    description:
      'Styled sections is a default behaviour of Accordion when `expanded` prop is not specified (uncontrolled)'
  })
  .addExample('Accordion/story/AccordionGroup.example.jsx', {
    title: 'Group',
    description: 'Accordions with styled sections in a group'
  })
  .addExample('Accordion/story/Controlled.example.jsx', {
    title: 'Controlled state',
    description: 'Accordions with controlled expanded property'
  })
  .addExample('Accordion/story/CustomFontStyling.example.jsx', {
    title: 'Custom styling',
    description:
      'Summary and Details of Accordion can be decorated with additional styles'
  })
