import FieldWrapper from '../FieldWrapper'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(
  FieldWrapper,
  'FieldWrapper',
  undefined,
  {
    name: {
      name: 'name',
      type: 'string',
      description: 'The field name',
      required: true,
    },
    label: {
      name: 'label',
      type: 'ReactNode',
      description: 'The field label text',
    },
    labelEndAdornment: {
      name: 'labelEndAdornment',
      type: 'ReactNode',
      description: "The label's end adornment",
    },
    hint: {
      name: 'hint',
      type: 'string',
      description: 'The hint of the field with some additional information',
    },
    required: {
      name: 'required',
      type: 'boolean',
      description: 'Makes field to be required in the form',
    },
    // FieldProps - https://final-form.org/docs/react-final-form/types/FieldProps
    afterSubmit: {
      name: 'afterSubmit',
      type: {
        name: 'function',
        description: '() => void',
      },
      description:
        'A callback to notify fields after submission has completed successfully',
    },
    allowNull: {
      name: 'allowNull',
      type: 'boolean',
      description: 'By default null value is converted to empty string',
      defaultValue: false,
    },
    beforeSubmit: {
      name: 'beforeSubmit',
      type: {
        name: 'function',
        description: '() => void | false',
      },
      description: 'A function to call just before calling onSubmit',
    },
    data: {
      name: 'data',
      type: 'object',
      description:
        'Initial state for arbitrary values to be placed by mutators',
    },
    defaultValue: {
      name: 'defaultValue',
      type: 'any',
      description: 'Default value of the field upon creation',
    },
    format: {
      name: 'format',
      type: {
        name: 'function',
        description: '(value: any, name: string) => any',
      },
      description:
        'A function that takes the value from the form values and the name of the field and formats the value to give to the input',
    },
    formatOnBlur: {
      name: 'formatOnBlur',
      type: 'boolean',
      description:
        'If true, the format function will only be called when the field is blurred. If false, format will be called on every render',
    },
    initialValue: {
      name: 'initialValue',
      type: 'any',
      description: 'The initial value for the field',
    },
    isEqual: {
      name: 'isEqual',
      type: {
        name: 'function',
        description: '(a: any, b: any) => boolean',
      },
      description: 'A function to determine if two values are equal',
    },
    parse: {
      name: 'parse',
      type: {
        name: 'function',
        description: '(value: any, name: string) => any',
      },
      description:
        "A function that takes the value from the input and name of the field and converts the value into the value you want stored as this field's value in the form",
    },
    status: {
      name: 'status',
      type: {
        name: 'OutlinedFieldStatus',
        description: '"default" | "error" | "success"',
      },
      description:
        'The status of the field to be used by the OutlinedInput component',
    },
    subscription: {
      name: 'subscription',
      type: {
        name: 'object',
        description: '{ [string]: boolean }',
      },
      description:
        'An object of the parts of FieldState (final-form) to subscribe to',
    },
    validate: {
      name: 'validate',
      type: {
        name: 'function',
        description:
          '(value: ?any, allValues: Object, meta: ?FieldState) => ?any',
      },
      description:
        'A function that takes the field value, all the values of the form and the meta data about the field and returns an error if the value is invalid, or undefined if the value is valid',
    },
    validateFields: {
      name: 'validateFields',
      type: 'string[]',
      description:
        'An array of field names to validate when this field changes',
    },
    // //
    allFieldProps: {
      name: '<all field props>',
      type: 'any',
      description:
        'This component also accepts all the native props from the corresponding form component, ex. Form.Input accepts all the Picasso Input props',
    },
    autoSaveIndicator: {
      name: 'autoSaveIndicator',
      type: 'ReactNode',
      description: 'instance of FormAutoSaveIndicator component',
    },
  }
)

export default {
  componentDocs,
}
