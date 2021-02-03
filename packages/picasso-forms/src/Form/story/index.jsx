import Form from '../Form'
import formFieldStory from '../../FieldWrapper/story'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Picasso Forms').createPage('Form', 'Form')

page
  .createTabChapter('Props')
  .addComponentDocs({
    component: Form,
    name: 'Form',
    additionalDocs: {
      autoComplete: {
        name: 'autoComplete',
        type: {
          name: 'string',
          enums: ['on', 'off']
        },
        description: `HTML Form autocomplete attribute.\n
The autocomplete attribute specifies whether a form should have autocomplete 'on' or 'off'.
When autocomplete is 'on', the browser automatically complete values based on values that the user has entered before.\n
Tip: It is possible to have autocomplete 'on' for the form, and 'off' for specific input fields, or vice versa.`
      },
      debug: {
        name: 'debug',
        type: {
          name: 'function',
          description:
            '(state: FormState, fieldStates: { [string]: FieldState }) => void'
        },
        description:
          'A callback for debugging that receives the form state and the states of all the fields'
      },
      decorators: {
        name: 'decorators',
        type: 'Decorator[]',
        description: 'An array of decorators to apply to the form'
      },
      initialValues: {
        name: 'initialValues',
        type: 'FormValues | Object',
        description: 'The initial values of the form'
      },
      initialValuesEqual: {
        name: 'initialValuesEqual',
        type: {
          name: 'function',
          description: '(Object | undefined, Object | undefined) => boolean'
        },
        description:
          'A predicate to determine whether or not the initialValues prop has changed'
      },
      keepDirtyOnReinitialize: {
        name: 'keepDirtyOnReinitialize',
        type: 'boolean',
        description:
          'If true, only pristine values will be overwritten when initialize(newValues) is called'
      },
      mutators: {
        name: 'mutators',
        type: {
          name: 'object',
          description: '{ [string]: Mutator }'
        },
        description: 'Named mutator functions'
      },
      onSubmit: {
        name: 'onSubmit',
        type: {
          name: 'function',
          description:
            '(values: FormValues, form: FormApi, callback: ?(errors: ?Object) => void) => ?Object | Promise<?Object> | void'
        },
        description: 'Function to call when the form is submitted',
        required: true
      },
      subscription: {
        name: 'subscription',
        type: {
          name: 'object',
          description: '{ [string]: boolean }'
        },
        description:
          'An object of the parts of FormState (final-form) to subscribe to'
      },
      validate: {
        name: 'validate',
        type: {
          name: 'function',
          description: '(values: FormValues) => Object | Promise<Object>'
        },
        description:
          'A whole-record validation function that takes all the values of the form and returns any validation errors'
      },
      validateOnBlur: {
        name: 'validateOnBlur',
        type: 'boolean',
        description:
          'If true, validation will happen on blur. If false, validation will happen on change',
        defaultValue: false
      },
      successSubmitMessage: {
        name: 'successSubmitMessage',
        type: 'ReactNode',
        description:
          'Message to display in a tooltip when form submitted successfully'
      },
      failedSubmitMessage: {
        name: 'failedSubmitMessage',
        type: 'ReactNode',
        description:
          'Message to display in a tooltip when form submission failed'
      },
      scrollOffsetTop: {
        name: 'scrollOffsetTop',
        type: 'number',
        description:
          'Offset from the viewport for inputs to focus on, defaults to the center of the window (deprecated, will not have any effect)'
      }
    }
  })
  .addComponentDocs(formFieldStory.componentDocs)

page
  .createChapter()
  .addTextSection(
    `
Form is a wrapper for 'react-final-form' Form component. It also
provides inside all the necessary input components types.
    `
  )
  .addExample(
    'Form/story/Default.example.tsx',
    {
      title: 'Default',
      description: `
A general look of the form includes the examples of all the input
types supported by picasso-forms.
`
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
`
    },
    'picasso-form'
  ) // picasso-skip-visuals
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
`
    },
    'picasso-form'
  ) // picasso-skip-visuals
  .addExample(
    'Form/story/BackendCommunication.example.tsx',
    {
      title: 'Backend communication',
      description: `
The form usually need to send data to backend, so we need to have
backend communication and display the process of submission and
the results. The form-level results are represented by notifications.
`
    },
    'picasso-form'
  ) // picasso-skip-visuals
  .addExample(
    'Form/story/CustomFormLevelConfiguration.example.tsx',
    'Form Level Configurations',
    'picasso-form'
  )
  .addExample(
    'Form/story/ValidateOnSubmit.example.tsx',
    {
      title: 'Validate only on submit',
      description: `
All fields should not show any validation error messages until submission is made.
`
    },
    'picasso-form'
  ) // picasso-skip-visuals
  .addExample(
    'Form/story/FormSpy.example.tsx',
    {
      title: 'Form Spy',
      description: `
      Sometimes you might want to perform a conditional action based on the value of another field in the form or its overall state.
      For smaller forms you can just directly work with values, but with a larger form you can avoid prop drilling with FormSpy.`
    },
    'picasso-form'
  ) // picasso-skip-visuals
