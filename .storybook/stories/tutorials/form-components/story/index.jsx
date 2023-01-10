import PicassoBook from '~/.storybook/components/PicassoBook'

const formsPage = PicassoBook.section('Tutorials').createPage(
  'Difference between Picasso-forms and base form components',
  'Learn how to pick the right abstraction for working with inputs and forms in different scenarios.'
)

formsPage.createChapter().addTextSection(
  `
In this document you'll learn all the differences between \`Form\` from Picasso core and Picasso Forms,
learn about what the differences are and how to apply each to a particular task you have.
There are several ways to work with forms and inputs in Picasso and this may look confusing at first, so let's take a deeper look at what are your options and what do they do.
`
)

const basicChapter = formsPage.createChapter('Basic Form and form elements')

basicChapter
  .addTextSection(
    `
Let's take a look at the basic \`Form\` and inputs first.
Basic Form component and all inputs / form elements you can find in Picasso are mostly just pure decorations on top of basic HTML elements you got used to.

They can be directly imported from \`@toptal/picasso\` and found in the "Forms" section in the Storybook sidebar.

There are some more complex components like Autocomplete, but most components accept the same props and have the same properties as pure HTML inputs.
They do not contain any extra styling, spacing or labels you used to see in most big forms.
You can use them in a fully controlled manner by directly manipulating their \`value\` and \`onChange\` props or have them uncontrolled as a part of the form.
  `,
    {
      title: 'Form elements',
    }
  )
  .addExample('tutorials/form-components/story/Components.1.example.tsx', {
    id: 'components-1',
    takeScreenshot: false,
  })

basicChapter
  .addTextSection(
    `
Now, the [Form](/?path=/story/forms-form--form) itself is a very simple wrapper around HTML \`<form>\`
and is both visually and functionally identical to it.

A main purpose of the Form component is to expose field wrappers
as compound components to easily apply form decorations like Labels, Hints, add spacing around form elements and display form errors.

Form component and field wrappers **still** do not provide any abstractions / extra validations outside the ones provided by the DOM.
      `,
    {
      title: 'Form and form field wrappers',
    }
  )
  .addExample('tutorials/form-components/story/Components.2.example.tsx', {
    id: 'components-2',
    takeScreenshot: false,
  })

const advancedChapter = formsPage.createChapter(
  'Advanced forms with Picasso Forms'
)

advancedChapter
  .addTextSection(
    `
Picasso Forms is a powerful wrapper around React Final Form. it comes with a full set of tools to validate, parse, keep and sanitize the form state.

You will find exactly the same set of form inputs as in regular Picasso, but as a part of a compound \`Form\` component imported from \`@toptal/picasso-forms\`.

Please note: most of the time you want to use **either** only pure components from Picasso or only components from Picasso Forms,
almost never both types at the same time (unless you need something very specific-looking).
Form elements provided by Picasso Forms already include a set of UI of basic components, labels and spacing + the all the Final Form abstractions on top of it.
      `,
    {
      title: 'Form and form field wrappers',
    }
  )
  .addExample('tutorials/form-components/story/Components.3.example.tsx', {
    id: 'components-3',
    takeScreenshot: false,
  })

advancedChapter.addTextSection(
  `
If you look for handlers for sanitizing / validating your form component data into form state, you can do so by taking a look at the available props for FieldWrapper.

All the components that are a part of the compound \`Form\` share the common set of props from the [FieldWrapper](/?path=/story/picasso-forms-form--form).
If you need converting your data between plain HTML form values (always string) and internal form state, \`parse\` and \`format\` is a good place to start.

You can also convert your data before submitting if you need it. Field and form level validators are also available in \`Form\` and it's compound components respectively.
`,
  {
    title: 'Sanitizing and validating',
  }
)

const finalChapter = formsPage.createChapter('Summary')
finalChapter.addTextSection(
  `
If you need a single form element with no complex validations - use it as a controlled component (directly set and manipulate state) and import it from \`@toptal/picasso\`.

If you need to quickly build a standard form with sanitizing, validating and complex state - use Form from Picasso Forms and import it from \`@toptal/picasso-forms\`. Do **not** use base components together with Picasso Forms.

If you need to have a standard form with some fields being very different from ones provided by Picasso Forms, use \`FieldWrapper\` with a combination of base Picasso components.
`
)
