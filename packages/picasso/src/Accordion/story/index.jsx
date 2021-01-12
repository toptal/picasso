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
    description: 'Accordion is uncontrolled until `expanded` prop is specified.'
  })
  .addExample('Accordion/story/Disabled.example.tsx', {
    title: 'Disabled',
    description:
      'Accordion ignores pointer events when `disabled` prop is truthy.'
  })
  .addExample('Accordion/story/Group.example.tsx', {
    title: 'Group',
    description: 'Accordions can be combined in groups'
  })
  .addExample('Accordion/story/Controlled.example.tsx', {
    title: 'Controlled',
    description: 'Accordion can be controlled via `expanded` prop.'
  })
  .addExample('Accordion/story/CustomSummary.example.tsx', {
    title: 'Custom Summary',
    description:
      "Accordion's summary is customizable. It either can be passed as `children` or be an external custom component."
  })
