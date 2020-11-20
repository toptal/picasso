import React from 'react'
import { Check16, Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

const onSubmit = () => new Promise(resolve => setTimeout(resolve, 1000))

const Example = () => (
  <>
    <Typography variant='heading' size='small'>
      Rectangular (Default)
    </Typography>
    <Container top='small' bottom='large'>
      <Form onSubmit={onSubmit}>
        <Container top='small'>
          <Form.SubmitButton buttonType='rectangular'>
            Rectangular
          </Form.SubmitButton>
        </Container>
      </Form>
    </Container>

    <Typography variant='heading' size='small'>
      Circular
    </Typography>
    <Container top='small' bottom='large'>
      <Form onSubmit={onSubmit}>
        <Container top='small'>
          <Form.SubmitButton buttonType='circular' icon={<Check16 />} />
        </Container>
      </Form>
    </Container>

    <Typography variant='heading' size='small'>
      Action
    </Typography>
    <Container top='small' bottom='large'>
      <Form onSubmit={onSubmit}>
        <Container top='small'>
          <Form.SubmitButton buttonType='action'>Action</Form.SubmitButton>
        </Container>
      </Form>
    </Container>
  </>
)

export default Example
