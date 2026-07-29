# Difference between Picasso Forms and base form components

Learn how to pick the right abstraction for working with inputs and forms in different scenarios.

In this document you'll learn all the differences between [Form](/?path=/story/forms-form--form) from Picasso core and [Picasso Forms](/?path=/story/picasso-forms-form--form),
learn about what the differences are and how to apply each to a particular task you have.
There are several ways to work with forms and inputs in Picasso and this may look confusing at first, so let's take a deeper look at what are your options and what do they do.

## Basic Form and base form components

### Form elements

Let's take a look at the basic `Form` and inputs first.
Basic Form component and all inputs / form elements you can find in Picasso are mostly just pure decorations on top of basic HTML elements you got used to. They are built on top of the Material UI input components.

They can be directly imported from `@toptal/picasso` and found in the "Forms" section in the Storybook sidebar.

There are some more complex components like Autocomplete, but most components accept the same props and have the same properties as pure HTML inputs.
They do not contain any extra styling, spacing or labels you used to see in most big forms.
Form elements imported directly from Picasso also won't show any field-level errors in the form.
You can use them in a fully controlled manner by directly manipulating their `value` and `onChange` props or have them uncontrolled as a part of the form.

```tsx
import React, { useState } from 'react'
import {
  Container,
  Form,
  Input,
  Select,
  NumberInput,
  PasswordInput,
} from '@toptal/picasso'

type SelectValue = '1' | '2' | undefined

const Example = () => {
  const [selectValue, setSelectValue] = useState<SelectValue>()

  const handleSelectChange = (
    event: React.ChangeEvent<{ value: SelectValue }>
  ) => {
    console.log('Select value:', event.target.value)
    setSelectValue(event.target.value)
  }

  return (
    <Form>
      <Container flex justifyContent='space-between'>
        <Input width='auto' placeholder='Text input' />
        <Select
          onChange={handleSelectChange}
          value={selectValue}
          options={[
            { value: '1', text: 'Option 1' },
            { value: '2', text: 'Option 2' },
          ]}
          placeholder='Select (controlled)'
          width='auto'
        />
        <PasswordInput placeholder='Password input' />
        <NumberInput placeholder='Number input' />
      </Container>
    </Form>
  )
}

export default Example
```

### Form and form field wrappers

Now, the [Form](/?path=/story/forms-form--form) itself is a very simple wrapper around HTML `<form>`
and is both visually and functionally identical to it.

A main purpose of the Form component is to expose field wrappers
as compound components to easily apply form decorations like Labels, Hints, add spacing around form elements and display form errors.

Form component and field wrappers **still** do not provide any abstractions / extra validations outside the ones provided by the DOM.

```tsx
import React from 'react'
import { Form, Grid, Select, Input } from '@toptal/picasso'

const Example = () => (
  <Grid>
    <Grid.Item sm={5}>
      <Form>
        <Form.Field>
          <Form.Label htmlFor='city'>Field label</Form.Label>
          <Input id='city' width='full' />
        </Form.Field>

        <Form.Field>
          <Form.Label requiredDecoration='optional' htmlFor='country'>
            Optional label
          </Form.Label>
          <Input id='country' width='full' />
        </Form.Field>

        <Form.Field error='Error: HTTP 418'>
          <Form.Label htmlFor='district'>Field with error</Form.Label>
          <Input status='error' id='district' width='full' />
        </Form.Field>

        <Form.Field hint='Tip: do not eat the yellow snow'>
          <Form.Label htmlFor='hinted'>Field with a hint</Form.Label>
          <Input id='hinted' width='full' />
        </Form.Field>
      </Form>
    </Grid.Item>
  </Grid>
)

export default Example
```

## Advanced forms with Picasso Forms

### Form and form field wrappers

Picasso Forms is a powerful wrapper around React Final Form. it comes with a full set of tools to validate, parse, keep and sanitize the form state.

You will find exactly the same set of form inputs as in regular Picasso, but exported from `@toptal/picasso-forms`.

Please note: most of the time you want to use **either** only pure components from Picasso or only components from Picasso Forms,
almost never both types at the same time (unless you need something very specific-looking).

Form elements provided by Picasso Forms already include a set of UI of basic components, labels and spacing + the all the Final Form abstractions on top of it.
Picasso Form components are written especially to operate inside a React Final Form and they have error handling, labels and validation working out of the box.

```tsx
import React from 'react'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { SPACING_4 } from '@toptal/picasso/utils'

const Example = () => (
  <Form onSubmit={values => window.alert(JSON.stringify(values, undefined, 2))}>
    <Form.Input
      required
      name='userName'
      label='First name'
      placeholder='e.g. Bruce'
    />
    <Form.NumberInput
      required
      name='userAge'
      label="What's your age?"
      placeholder='e.g. 25'
    />

    <Container top={SPACING_4}>
      <Form.SubmitButton>Submit</Form.SubmitButton>
    </Container>
  </Form>
)

export default Example
```

### Sanitizing and validating

If you look for handlers for sanitizing / validating your form component data into form state, you can do so by taking a look at the available props for FieldWrapper.

All the components exported from `@toptal/picasso-forms` share the common set of props from the [FieldWrapper](/?path=/story/picasso-forms-form--form).
If you need converting your data between plain HTML form values (always string) and internal form state, `parse` and `format` is a good place to start.

You can also convert your data before submitting if you need it. Field and form level validators are also available in `Form` and all Picasso Forms components.

## Summary

If you need a single form element with no complex validations - use it as a controlled component (directly set and manipulate state) and import it from `@toptal/picasso`.

If you need to quickly build a standard form with sanitizing, validating and complex state - use Form from Picasso Forms and import it from `@toptal/picasso-forms`. Do **not** use base components together with Picasso Forms.

If you need to have a standard form with some fields being very different from ones provided by Picasso Forms, use `FieldWrapper` with a combination of base Picasso components.
