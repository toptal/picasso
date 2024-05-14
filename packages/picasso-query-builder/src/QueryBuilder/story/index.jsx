import PicassoBook from '~/.storybook/components/PicassoBook'
import QueryBuilder from '../QueryBuilder'

const page = PicassoBook.section('Picasso Query Builder').createPage(
  'QueryBuilder'
)

page.createTabChapter('Props').addComponentDocs({
  component: QueryBuilder,
  name: 'QueryBuilder',
})

page
  .createChapter()
  .addExample('QueryBuilder/story/Default.example.tsx', 'Default')

  .addExample('QueryBuilder/story/InitialValues.example.tsx', 'Initial Values')

  .addExample('QueryBuilder/story/DynamicMultiselect.example.tsx', {
    title: 'ValueEditor with Async Values',
    description: `
    Loading async values for value editors.
    `,
    takeScreenshot: false,
  })

  .addExample('QueryBuilder/story/DragDrop.example.tsx', {
    title: 'Drag and Drop',
  })

  .addExample('QueryBuilder/story/Footer.example.tsx', {
    title: 'Footer',
    description: 'Customized footer',
  })

  .addExample('QueryBuilder/story/HideControls.example.tsx', {
    title: 'Hide Controls',
    description: 'Hide buttons used for query reset and submitting',
  })

  .addExample('QueryBuilder/story/Header.example.tsx', {
    title: 'Header',
    description: 'Customized header',
  })

  .addExample('QueryBuilder/story/CustomPadding.example.tsx', {
    title: 'Custom Padding',
  })

  .addExample('QueryBuilder/story/CustomRunQueryButton.example.tsx', {
    title: 'Custom Run Query Button',
    description: 'Example of Customized children for Run query button',
  })

  .addExample('QueryBuilder/story/FieldDescription.example.tsx', {
    title: 'Field Description',
    description: `Hover over 'First  name' field in the field selector dropdown to display field description in a tooltip`,
  })

  .addExample('QueryBuilder/story/Loading.example.tsx', {
    title: 'Loading',
  })

  .addExample('QueryBuilder/story/MaxDepth.example.tsx', {
    title: 'Maximum Group Depth',
    description: 'Maximum group depth is set to one',
  })

  .addExample('QueryBuilder/story/Callback.example.tsx', {
    title: 'Functional Callbacks',
    description: 'onQueryChange, onValidationChange, onQueryReset',
    takeScreenshot: false,
  })

  .addExample('QueryBuilder/story/CustomOperators.example.tsx', {
    title: 'Custom Operators',
    takeScreenshot: false,
  })

  .addExample('QueryBuilder/story/RuleValidation.example.tsx', {
    title: 'Validation on Rule Level',
    description: `
    Providing a validator function on the rule level. Field level validation is working by passing validation function to \`validator\` field. It simply works by passing \`handleValidationChange\` function to \`onValidationChange\` prop in QB.
    In this example, the validation checks if the Name input has been filled and Age input is greater or equal to 18 and the query is not empty.
    In order to see validation errors click on \`Add rule\` button and run query without filling in Name input and Fill in Age input with wrong value ( < 18).
    `,
    takeScreenshot: false,
  })

  .addExample('QueryBuilder/story/CustomValueEditor.example.tsx', {
    title: 'Custom Value Editor',
    description: `
    We can create CustomValueEditor component and pass it to QB props.

    In this component we are checking inputType of the field and based on it we can return some Custom Value Editor. In this case only for text inputs we are returning Custom Editor and for the rest we return an Input.`,
    takeScreenshot: false,
  })
