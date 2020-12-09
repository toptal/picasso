import { Accordion } from '../Accordion'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
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
  .addExample('Accordion/story/Default.example.tsx', {
    title: 'Default',
    description:
      'Styled sections is a default behaviour of Accordion when `expanded` prop is not specified (uncontrolled)'
  })
  .addExample('Accordion/story/AccordionGroup.example.tsx', {
    title: 'Group',
    description: 'Accordions with styled sections in a group'
  })
  .addExample('Accordion/story/Controlled.example.tsx', {
    title: 'Controlled state',
    description: 'Accordions with controlled expanded property'
  })
  .addExample('Accordion/story/CustomFontStyling.example.tsx', {
    title: 'Custom styling',
    description:
      'Summary and Details of Accordion can be decorated with additional styles'
  })
  .addExample('Accordion/story/CustomSummary.example.tsx', {
    title: 'Custom Summary',
    description: 'Summary can be a completely custom component'
  })
