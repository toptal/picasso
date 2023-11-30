import Form from '../Form'
import fieldWrapperStory from '../../FieldWrapper/story'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Picasso Forms').createPage(
  'Form',
  `Form

   ${PicassoBook.createSourceLink(__filename)}

  Confused between Form from Picasso and Picasso Forms?
  Take a look at this
  [page](/?path=/story/tutorials-difference-between-picasso-forms-and-base-form-components--difference-between-picasso-forms-and-base-form-components).
`
)

page
  .createTabChapter('Props')
  .addComponentDocs({
    component: Form,
    name: 'Form',
    additionalDocs: {
      disableScrollOnError: {
        name: 'disableScrollOnError',
        type: {
          name: 'boolean',
        },
        description: `Whether to scroll to the failed field on the form error.`,
        defaultValue: 'false',
      },
      autoComplete: {
        name: 'autoComplete',
        type: {
          name: 'string',
          enums: ['on', 'off'],
        },
        description: `HTML Form autocomplete attribute.\n
The autocomplete attribute specifies whether a form should have autocomplete 'on' or 'off'.
When autocomplete is 'on', the browser automatically complete values based on values that the user has entered before.\n
Tip: It is possible to have autocomplete 'on' for the form, and 'off' for specific input fields, or vice versa.`,
      },
      debug: {
        name: 'debug',
        type: {
          name: 'function',
          description:
            '(state: FormState, fieldStates: { [string]: FieldState }) => void',
        },
        description:
          'A callback for debugging that receives the form state and the states of all the fields',
      },
      decorators: {
        name: 'decorators',
        type: 'Decorator[]',
        description: 'An array of decorators to apply to the form',
      },
      initialValues: {
        name: 'initialValues',
        type: 'FormValues | Object',
        description: 'The initial values of the form',
      },
      initialValuesEqual: {
        name: 'initialValuesEqual',
        type: {
          name: 'function',
          description: '(Object | undefined, Object | undefined) => boolean',
        },
        description:
          'A predicate to determine whether or not the initialValues prop has changed',
      },
      keepDirtyOnReinitialize: {
        name: 'keepDirtyOnReinitialize',
        type: 'boolean',
        description:
          'If true, only pristine values will be overwritten when initialize(newValues) is called',
      },
      mutators: {
        name: 'mutators',
        type: {
          name: 'object',
          description: '{ [string]: Mutator }',
        },
        description: 'Named mutator functions',
      },
      onSubmit: {
        name: 'onSubmit',
        type: {
          name: 'function',
          description:
            '(values: FormValues, form: FormApi, callback: ?(errors: ?Object) => void) => ?Object | Promise<?Object> | void',
        },
        description: 'Function to call when the form is submitted',
        required: true,
      },
      subscription: {
        name: 'subscription',
        type: {
          name: 'object',
          description: '{ [string]: boolean }',
        },
        description:
          'An object of the parts of FormState (final-form) to subscribe to',
      },
      validate: {
        name: 'validate',
        type: {
          name: 'function',
          description: '(values: FormValues) => Object | Promise<Object>',
        },
        description:
          'A whole-record validation function that takes all the values of the form and returns any validation errors',
      },
      validateOnBlur: {
        name: 'validateOnBlur',
        type: 'boolean',
        description:
          'If true, validation will happen on blur. If false, validation will happen on change',
        defaultValue: 'false',
      },
      successSubmitMessage: {
        name: 'successSubmitMessage',
        type: 'ReactNode',
        description:
          'Message to display in a tooltip when form submitted successfully',
      },
      failedSubmitMessage: {
        name: 'failedSubmitMessage',
        type: 'ReactNode',
        description:
          'Message to display in a tooltip when form submission failed',
      },
      scrollOffsetTop: {
        name: 'scrollOffsetTop',
        type: 'number',
        description:
          'Offset from the viewport for inputs to focus on, defaults to the center of the window (deprecated, will not have any effect)',
      },
    },
  })
  .addComponentDocs(fieldWrapperStory.componentDocs)

page
  .createChapter()
  .addTextSection(
    `
Form is a wrapper for 'react-final-form' Form component.
The rest of the form components can be imported from \`@toptal/picasso-forms\`
    `
  )
  .addExample(
    'Form/story/Default.example.tsx',
    {
      title: 'Default',
      description: `
A general look of the form includes the examples of all the input
types supported by picasso-forms.
`,
    },
    'picasso-form'
  )
  .addExample(
    'Form/story/Horizontal.example.tsx',
    {
      title: 'Horizontal',
      description:
        'Horizontal form with responsive design. Use "useFieldsLayoutContext()" hook from "@toptal/picasso" to get access to the current layout depending on the screen size.',
      screenshotBreakpoints: true,
    },
    'picasso-form'
  )
  .addExample(
    'Form/story/CustomValidator.example.tsx',
    {
      title: 'Custom validator',
      description: `
We have a 'required' validator included by default to each input type,
however, you may need custom validators for more complex types of fields.
`,
      takeScreenshot: false,
    },
    'picasso-form'
  )
  .addExample(
    'Form/story/ParseInput.example.tsx',
    {
      title: 'Change form input value',
      description: `
      When you use picasso-forms your form input components are no longer
      completely controlled and they are controlled by final-form, which
      gives you the opportunity to rely on it with displaying errors,
      validations, etc.

      However, sometimes you may need to be able to modify the form input
      value.
      `,
      takeScreenshot: false,
    },
    'picasso-form'
  )
  .addExample(
    'Form/story/BackendCommunication.example.tsx',
    {
      title: 'Backend communication',
      description: `
        The form usually need to send data to backend, so we need to have
        backend communication and display the process of submission and
        the results. The form-level results are represented by notifications.
        `,
      takeScreenshot: false,
    },
    'picasso-form'
  )
  .addExample(
    'Form/story/CustomFormLevelConfiguration.example.tsx',
    'Form Level Configurations'
  )
  .addExample(
    'Form/story/ValidateOnSubmit.example.tsx',
    {
      title: 'Validate only on submit',
      description: `
            All fields should not show any validation error messages until submission is made.
            `,
      takeScreenshot: false,
    },
    'picasso-form'
  )
  .addExample('Form/story/FileInput.example.tsx', {
    title: 'File input on a Form',
    description: 'Showcase how to upload files on the form submission',
    takeScreenshot: false,
  })
  .addExample('Form/story/Dropzone.example.tsx', {
    title: 'Dropzone on a Form',
    description:
      'Showcase how to upload files on the form submission using dropzone',
    takeScreenshot: false,
  })
  .addExample('Form/story/TitleCase.example.tsx', {
    title: 'Title case',
    description: "Display the field's label in title case.",
    takeScreenshot: false,
  })
  .addExample('Form/story/NoScrolling.example.tsx', {
    title: 'No scrolling case',
    description: "Showcase Form's behavior on form submission error.",
    takeScreenshot: false,
  })
  .addExample('Form/story/RichTextEditor.example.tsx', {
    title: 'Rich text editor',
    description: 'Showcase how to use RichTextEditor in the form.',
    takeScreenshot: false,
  })
  .addExample('Form/story/FieldRequirements.example.tsx', {
    title: 'Field requirements',
    description: 'Showcase how to display field requirements.',
    takeScreenshot: false,
  })
  .addExample('Form/story/Status.example.tsx', {
    title: 'Form Level Status Configuration',
    description:
      'Showcase how to enable success status via form configuration.',
    takeScreenshot: false,
  })
  .addExample('Form/story/AvatarUpload.example.tsx', {
    title: 'AvatarUpload',
    description:
      'Showcase how to handle avatar upload with external upload service.',
    takeScreenshot: false,
  })
  .addExample('Form/story/AutoSave.example.tsx', {
    title: 'Auto-save',
    description: 'Showcase how to use auto-save functionality.',
    takeScreenshot: false,
  })
  .addExample('Form/story/HighlightAutofill.example.tsx', {
    title: 'Highlight fields with default value',
  })
