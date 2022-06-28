import { Accordion } from '../Accordion'
import { default as Details } from '../Details'
import { default as Summary } from '../Summary'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Accordion',
  `
    Accordions store information behind collapsible sections,
    allowing for more information to be stored in a limited amount of space.

    ${PicassoBook.createBaseDocsLink(
      'https://share.goabstract.com/636e68ee-2ef4-483d-bdaf-83aef2340477?collectionLayerId=aa49cc2c-6e4e-4d8d-aa3a-3def89e1837f&mode=design&present=true'
    )}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({
    component: Accordion,
    name: 'Accordion',
  })
  .addComponentDocs({
    component: Details,
    name: 'Accordion.Details',
  })
  .addComponentDocs({
    component: Summary,
    name: 'Accordion.Summary',
  })

page
  .createChapter()
  .addExample('Accordion/story/Default.example.tsx', {
    title: 'Default',
    description:
      'Accordion is uncontrolled until the `expanded` prop is specified.',
  })
  .addExample('Accordion/story/Disabled.example.tsx', {
    title: 'Disabled',
    description:
      'Accordion ignores pointer events when the `disabled` prop is truthy.',
    takeScreenshot: false,
  })
  .addExample('Accordion/story/BorderedGroups.example.tsx', {
    title: 'Borders and Groups',
    description: 'Accordions have configurable borders and can be grouped',
  })
  .addExample('Accordion/story/Controlled.example.tsx', {
    title: 'Controlled',
    description: 'Accordion can be controlled via the `expanded` prop.',
    takeScreenshot: false,
  })
  .addExample('Accordion/story/CustomSummary.example.tsx', {
    title: 'Custom Summary',
    description:
      "Accordion's summary is customizable. It either can be passed as `children` or be an external custom component.",
    takeScreenshot: false,
  })
