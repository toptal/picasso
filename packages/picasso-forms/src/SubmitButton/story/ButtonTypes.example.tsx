import React from 'react'
import { Check16, Container, Typography } from '@toptal/picasso'
import { SPACING_4, SPACING_8 } from '@toptal/picasso/utils'
import { FormNonCompound, SubmitButton } from '@toptal/picasso-forms'

const onSubmit = () => new Promise(resolve => setTimeout(resolve, 1000))

const Example = () => (
  <>
    <Typography variant='heading' size='small'>
      Rectangular (Default)
    </Typography>
    <Container top={SPACING_4} bottom={SPACING_8}>
      <FormNonCompound onSubmit={onSubmit}>
        <Container top={SPACING_4}>
          <SubmitButton buttonType='rectangular'>Rectangular</SubmitButton>
        </Container>
      </FormNonCompound>
    </Container>

    <Typography variant='heading' size='small'>
      Circular
    </Typography>
    <Container top={SPACING_4} bottom={SPACING_8}>
      <FormNonCompound onSubmit={onSubmit}>
        <Container top={SPACING_4}>
          <SubmitButton buttonType='circular' icon={<Check16 />} />
        </Container>
      </FormNonCompound>
    </Container>

    <Typography variant='heading' size='small'>
      Action
    </Typography>
    <Container top={SPACING_4} bottom={SPACING_8}>
      <FormNonCompound onSubmit={onSubmit}>
        <Container top={SPACING_4}>
          <SubmitButton buttonType='action'>Action</SubmitButton>
        </Container>
      </FormNonCompound>
    </Container>
  </>
)

export default Example
