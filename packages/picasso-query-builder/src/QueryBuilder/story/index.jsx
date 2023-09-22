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

  .addExample('QueryBuilder/story/RuleValidation.example.tsx', {
    title: 'Validation on Rule Level',
    description: `
    Providing a validator function on the rule level. Field level validation is working by passing validation function to \`validator\` field. It simply works by passing \`handleValidationChange\` function to \`onValidationChange\` prop in QB.
    In this example, the validation checks if the Name input has been filled and Age input is greater or equal to 18 and the query is not empty.
    In order to see validation errors click on \`Add rule\` button and run query without filling in Name input and Fill in Age input with wrong value ( < 18).
    `,
    takeScreenshot: false,
  })

  .addExample('QueryBuilder/story/QueryValidation.example.tsx', {
    title: 'Validation on Query Level',
    description: `
    We can provide \`Query Level Validation\` to Query Builder. Instead of passing validators in the fields (as in \`Validation on Rule Level\` story) we can have validation function that is passed directly to the QB. 

    Here we are validating rules and group, a query is valid if it has non-empty rules.
    `,
    takeScreenshot: false,
  })

  .addExample('QueryBuilder/story/CustomOperators.example.tsx', {
    title: 'Custom Operators',
    description: `
    Example of the Query Builder with custom operators. We can override default operators from the fields with some custom values. 

    In this case we are providing Custom Operators for text and number inputTypes and for the rest we are providing default operators.
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
