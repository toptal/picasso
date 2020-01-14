import React from 'react'
import { Input, Button, Form as PicassoForm } from '@toptal/picasso'
import { Form, Field, FieldRenderProps } from 'react-final-form'

const InputAdapter = (props: FieldRenderProps<string, HTMLInputElement>) => {
  const { input, ...rest } = props

  return <Input {...input} {...rest} />
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const FinalFormExample = () => {
  const onSubmit = async (values: unknown) => {
    await sleep(300)
    window.alert(JSON.stringify(values))
  }

  const validate = () => {
    const errors = {}

    return errors
  }

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
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
            <PicassoForm.Label htmlFor='city'>City</PicassoForm.Label>
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
