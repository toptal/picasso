import { Autocomplete } from '../Autocomplete'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Forms').createPage('Autocomplete')

page.createTabChapter('Props').addComponentDocs({
  component: Autocomplete,
  name: 'Autocomplete',
  additionalDocs: {
    options: {
      type: {
        name: '[]',
        description: `
{\n
  text?: string\n
  value?: string\n
}
        `
      }
    }
  }
})

page
  .createChapter()
  .addTextSection(
    `
Autocomplete supports all the default HTML native props, as Input supports.

### A note about browser autofilling

Standard browser autofilling feature is disabled in this component by default, because it's used pretty rarely.
You can enable it by specifying \`enableAutofill\` property. Keep in mind that to enable browser autofilling
you most likely need to specify \`name\` property as well.

If you're still experiencing browser autofilling and you want to get rid of it, try to wrap
your **Autocomplete** component into \`<Form>\`, you can also specify \`autoComplete='off'\` on that **Form** component
if needed.

\`\`\`jsx
<Form autoComplete='off'>
  <Autocomplete ... />
</Form>
\`\`\`
    `
  )
  .addExample('Autocomplete/story/Default.example.tsx', 'Default')
  .addExample('Autocomplete/story/OtherOption.example.tsx', {
    title: 'Other option',
    description: `By default Autocomplete allows any entered input value to stay after focus is removed from input,
      you can set \`showOtherOption={true}\` prop to allow also this new item to appear in the suggestions list. Also,
      you can decorate this option with the prefix text by using \`otherOptionText\` or fully customize it with \`renderOtherOption\` and handle selection with
      \`onOtherOptionSelect\` event handler.`
  }) // picasso-skip-visuals
  .addExample(
    'Autocomplete/story/InitialSetValue.example.tsx',
    'Initially set value'
  ) // picasso-skip-visuals
  .addExample(
    'Autocomplete/story/Controlled.example.tsx',
    'Controlled selection'
  ) // picasso-skip-visuals
  .addExample('Autocomplete/story/FullWidth.example.tsx', 'Full width') // picasso-skip-visuals
  .addExample('Autocomplete/story/MenuWidth.example.tsx', 'Menu width') // picasso-skip-visuals
  .addExample('Autocomplete/story/Loading.example.tsx', 'Loading') // picasso-skip-visuals
  .addExample('Autocomplete/story/Error.example.tsx', 'Error') // picasso-skip-visuals
  .addExample('Autocomplete/story/WithIcons.example.tsx', 'With Icon') // picasso-skip-visuals
  .addExample(
    'Autocomplete/story/WithDescription.example.tsx',
    'With Description'
  ) // picasso-skip-visuals
  .addExample(
    'Autocomplete/story/CustomOptionRenderer.example.tsx',
    'Custom options rendering'
  ) // picasso-skip-visuals
  .addExample('Autocomplete/story/DynamicOptions.example.tsx', {
    title: 'Dynamic options',
    description: `If you need to obtain the list of options dynamically from a server.
It is good practice to set debouncing and a minimum number of chars to limit the number of requests you send to the server.
Start typing "Mongolia" letter by letter to see this example in action.`
  }) // picasso-skip-visuals
  .addExample('Autocomplete/story/Autofill.example.tsx', {
    title: 'Form auto filling',
    description: `This example shows how to use component inside the form with several fields
when it makes sense to have autofill enabled.
    `
  }) // picasso-skip-visuals
  .addExample('Autocomplete/story/PoweredByGoogle.example.tsx', {
    title: 'Powered By Google label',
    description:
      'There are situations when we use options in the Autocomplete component from the Google API and ' +
      'to meet their requirements https://developers.google.com/places/web-service/policies in such cases ' +
      'we have to show the "Powered By Google" label.'
  }) // picasso-skip-visuals
