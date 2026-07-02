# How to layout forms

Learn how to create form layouts using Picasso Form components.

In this tutorial you will learn how to create forms layouts from scratch using components from Picasso.
We will focus on using `Form`, `Form.Field`, input components `Input`, `Select`, `Radio` and
`Checkbox` to create imaginary form for creating new candidate.

### Goals
 * Explain `Form` component and it's child component `Form.Field`
 * Show how to use `Grid` and `Grid.Item` to create form layouts
 * Creating inline fields

### End result

```tsx
import React from 'react'
import { Grid, Checkbox, Select, Input, Radio, Form } from '@toptal/picasso'

const Example = () => (
  <div>
    <Grid justifyContent='center' alignItems='center'>
      <Grid.Item sm={12} md={8} lg={6}>
        <Form>
          <Form.Field>
            <Form.Label>Select talent</Form.Label>
            <Select options={OPTIONS} />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor='job-title-final'>Job title</Form.Label>
            <Input id='job-title-final' width='full' />
          </Form.Field>

          <Form.Field>
            <Grid direction='row'>
              <Grid.Item sm={6}>
                <Form.Field>
                  <Form.Label>Current country</Form.Label>
                  <Select options={OPTIONS} />
                </Form.Field>
              </Grid.Item>
              <Grid.Item sm={6}>
                <Form.Field>
                  <Form.Label htmlFor='city-final'>
                    City of residence
                  </Form.Label>
                  <Input id='city-final' width='full' />
                </Form.Field>
              </Grid.Item>
            </Grid>
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor='description-final'>
              Full description
            </Form.Label>
            <Input id='description-final' width='full' />
          </Form.Field>

          <Form.Field>
            <Form.Label>Desired Commitment</Form.Label>
            <Select options={OPTIONS} />
          </Form.Field>

          <Form.Field>
            <Form.Label>Estimated length:</Form.Label>
            <Radio.Group horizontal name='variableName' value='radio1'>
              <Radio label='1-2 months' value='radio1' />
              <Radio label='2-4 months' value='radio2' />
              <Radio label='4-12 months' value='radio3' />
            </Radio.Group>
          </Form.Field>

          <Form.Field hint='A Toptal Director of Engineering ewill work with you to understand you needs and fins you the right talent for you project.'>
            <Checkbox label='We match you to talent' />
          </Form.Field>
        </Form>
      </Grid.Item>
    </Grid>
  </div>
)

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' },
]

export default Example
```

## Tutorial

Step-by-step guide to create form layout

### First step: Define basic form container

For this example we will use `Grid` component to make form responsive and adequate size for different
screen sizes. It can easily be centered using `justifyContent` prop. Each form should have
[`Form`](..?path=/story/forms-folder--form) component as root element to handle form interaction like
`onSubmit` events.

Let's add one form text field just to be able to test responsivness of our form.

```tsx
import React from 'react'
import { Grid, Form, Input } from '@toptal/picasso'

const Example = () => (
  <div>
    <Grid justifyContent='center' alignItems='center'>
      <Grid.Item sm={12} md={8} lg={6}>
        <Form>
          <Form.Field>
            <Input width='full' placeholder='Job title' />
          </Form.Field>
        </Form>
      </Grid.Item>
    </Grid>
  </div>
)

export default Example
```

### Second step: Add form controls

As you probably saw from the last step when we added `Input` we wrapped it with `Form.Field`. It is
important because `Form.Field` keeps correct spacings in form, allows the addition of hints and in future, it will
provide new features regarding validation and integration with data.

When you are adding new form controls like `Checkbox`, `Select`, etc. keep in mind to wrap it as we did in this
tutorial step. Each control has some specific interface to be used and please refer to Picasso documentation for
additional details.

```tsx
import React from 'react'
import { Grid, Checkbox, Select, Input, Form } from '@toptal/picasso'

const Example = () => (
  <div>
    <Grid justifyContent='center' alignItems='center'>
      <Grid.Item sm={12} md={8} lg={6}>
        <Form>
          <Form.Field>
            <Select placeholder='Select talent' options={OPTIONS} />
          </Form.Field>

          <Form.Field>
            <Input width='full' placeholder='Job title' />
          </Form.Field>

          <Form.Field>
            <Input width='full' placeholder='Full description' />
          </Form.Field>

          <Form.Field>
            <Select placeholder='Desired Commitment' options={OPTIONS} />
          </Form.Field>

          <Form.Field hint='A Toptal Director of Engineering ewill work with you to understand you needs and fins you the right talent for you project.'>
            <Checkbox placeholder='We match you to talent' />
          </Form.Field>
        </Form>
      </Grid.Item>
    </Grid>
  </div>
)

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' },
]

export default Example
```

### Third step: Inline form controls

In this step, we will show how to add horizontal or inline form controls by using `Grid` to
define flexbox in the horizontal direction and define ratios for each control. 

The concept stays the same, we wrap each control with `Form.Field` and define a grid layout with
spacings and grid columns.

```tsx
import React from 'react'
import { Grid, Checkbox, Select, Input, Form } from '@toptal/picasso'

const Example = () => (
  <div>
    <Grid justifyContent='center' alignItems='center'>
      <Grid.Item sm={12} md={8} lg={6}>
        <Form>
          <Form.Field>
            <Select placeholder='Select talent' options={OPTIONS} />
          </Form.Field>

          <Form.Field>
            <Input width='full' placeholder='Job title' />
          </Form.Field>

          <Form.Field>
            <Grid direction='row'>
              <Grid.Item sm={6}>
                <Form.Field>
                  <Select placeholder='Current Country' options={OPTIONS} />
                </Form.Field>
              </Grid.Item>
              <Grid.Item sm={6}>
                <Form.Field>
                  <Input width='full' placeholder='City of Residence' />
                </Form.Field>
              </Grid.Item>
            </Grid>
          </Form.Field>

          <Form.Field>
            <Input width='full' placeholder='Full description' />
          </Form.Field>

          <Form.Field>
            <Select placeholder='Desired Commitment' options={OPTIONS} />
          </Form.Field>

          <Form.Field hint='A Toptal Director of Engineering ewill work with you to understand you needs and fins you the right talent for you project.'>
            <Checkbox label='We match you to talent' />
          </Form.Field>
        </Form>
      </Grid.Item>
    </Grid>
  </div>
)

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' },
]

export default Example
```

### Fourth step: Use labels instead of placeholders

In this step we used the same form as in previous example, but replaced placeholders with labels.

The concept stays the same, we wrap each control with `Form.Field` , but also add `Form.Label` for every input.
If you'd like to focus `Input` by click on label, you need to specify `id` and `htmlFor`

```tsx
import React from 'react'
import { Grid, Checkbox, Select, Input, Form } from '@toptal/picasso'

const Example = () => (
  <div>
    <Grid justifyContent='center' alignItems='center'>
      <Grid.Item sm={12} md={8} lg={6}>
        <Form>
          <Form.Field>
            <Form.Label>Select talent</Form.Label>
            <Select options={OPTIONS} />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor='job-title-4'>Job title</Form.Label>
            <Input id='job-title-4' width='full' />
          </Form.Field>

          <Form.Field>
            <Grid direction='row'>
              <Grid.Item sm={6}>
                <Form.Field>
                  <Form.Label>Current country</Form.Label>
                  <Select options={OPTIONS} />
                </Form.Field>
              </Grid.Item>
              <Grid.Item sm={6}>
                <Form.Field>
                  <Form.Label htmlFor='city-4'>City of residence</Form.Label>
                  <Input id='city-4' width='full' />
                </Form.Field>
              </Grid.Item>
            </Grid>
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor='description'>Full description</Form.Label>
            <Input id='description' width='full' />
          </Form.Field>

          <Form.Field>
            <Form.Label>Desired Commitment</Form.Label>
            <Select options={OPTIONS} />
          </Form.Field>

          <Form.Field>
            <Checkbox label='We match you to talent' />
            <Form.Hint>
              A Toptal Director of Engineering ewill work with you to understand
              you needs and fins you the right talent for you project.
            </Form.Hint>
          </Form.Field>
        </Form>
      </Grid.Item>
    </Grid>
  </div>
)

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' },
]

export default Example
```

### Final step: Radio group

In the final step, we will focus on `Radio.Group` that is used to group radio form
controls. Basically, all you need is to define `Radio` items and wrap them
with `Radio.Group` to set correct value and get events on select.

And that's it, we have implemented simple form layout.

```tsx
import React from 'react'
import { Grid, Checkbox, Select, Input, Radio, Form } from '@toptal/picasso'

const Example = () => (
  <div>
    <Grid justifyContent='center' alignItems='center'>
      <Grid.Item sm={12} md={8} lg={6}>
        <Form>
          <Form.Field>
            <Form.Label>Select talent</Form.Label>
            <Select options={OPTIONS} />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor='job-title-final'>Job title</Form.Label>
            <Input id='job-title-final' width='full' />
          </Form.Field>

          <Form.Field>
            <Grid direction='row'>
              <Grid.Item sm={6}>
                <Form.Field>
                  <Form.Label>Current country</Form.Label>
                  <Select options={OPTIONS} />
                </Form.Field>
              </Grid.Item>
              <Grid.Item sm={6}>
                <Form.Field>
                  <Form.Label htmlFor='city-final'>
                    City of residence
                  </Form.Label>
                  <Input id='city-final' width='full' />
                </Form.Field>
              </Grid.Item>
            </Grid>
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor='description-final'>
              Full description
            </Form.Label>
            <Input id='description-final' width='full' />
          </Form.Field>

          <Form.Field>
            <Form.Label>Desired Commitment</Form.Label>
            <Select options={OPTIONS} />
          </Form.Field>

          <Form.Field>
            <Form.Label>Estimated length:</Form.Label>
            <Radio.Group horizontal name='variableName' value='radio1'>
              <Radio label='1-2 months' value='radio1' />
              <Radio label='2-4 months' value='radio2' />
              <Radio label='4-12 months' value='radio3' />
            </Radio.Group>
          </Form.Field>

          <Form.Field hint='A Toptal Director of Engineering ewill work with you to understand you needs and fins you the right talent for you project.'>
            <Checkbox label='We match you to talent' />
          </Form.Field>
        </Form>
      </Grid.Item>
    </Grid>
  </div>
)

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' },
]

export default Example
```
