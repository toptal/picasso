import React from 'react'
import { Input, Button, Form as PicassoForm } from '@toptal/picasso'
import { Form, Field, FieldRenderProps } from 'react-final-form'
import createDecorator from 'final-form-focus'

const focusOnErrors = createDecorator()

const InputAdapter = (props: FieldRenderProps<string, HTMLInputElement>) => {
  const { input, meta, ...rest } = props

  return (
    <React.Fragment>
      <Input {...input} {...rest} error={meta.touched && meta.invalid} />
      {meta.error && meta.touched && (
        <PicassoForm.Error>{meta.error}</PicassoForm.Error>
      )}
    </React.Fragment>
  )
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const FinalFormExample = () => {
  const onSubmit = async (values: unknown) => {
    await sleep(300)
    window.alert(JSON.stringify(values))
  }

  type Vals = { city?: string }

  const validate = (values: Vals) => {
    const errors: Vals = {}

    if (!values.city) {
      errors.city = 'Required'
    }

    return errors
  }

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      decorators={[focusOnErrors]}
      validateOnBlur
      render={({ handleSubmit }) => (
        <PicassoForm onSubmit={handleSubmit}>
          <PicassoForm.Field>
            <PicassoForm.Label required htmlFor='name'>
              Name
            </PicassoForm.Label>
            <Field name='name'>
              {({ input }) => (
                <Input {...input} id='name' width='full' placeholder='Ivan?' />
              )}
            </Field>
          </PicassoForm.Field>
          <PicassoForm.Field>
            <PicassoForm.Label htmlFor='school'>School</PicassoForm.Label>
            <Field
              name='school'
              render={({ input }) => (
                <Input {...input} id='school' width='full' placeholder='MIT?' />
              )}
            />
          </PicassoForm.Field>
          <PicassoForm.Field>
            <PicassoForm.Label htmlFor='city' required>
              City
            </PicassoForm.Label>
            <Field
              name='city'
              component={InputAdapter}
              id='city'
              width='full'
              placeholder='e.g., Barcelona'
            />
            <PicassoForm.Hint>
              Choose city where you would like to live
            </PicassoForm.Hint>
          </PicassoForm.Field>

          <Button type='submit'>Submit</Button>
        </PicassoForm>
      )}
    />
  )
}

export default FinalFormExample
