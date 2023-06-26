import React from 'react'
import {
  Autocomplete,
  Container,
  DatePicker,
  FormLabel,
  Input,
  MonthSelect,
  NumberInput,
  PasswordInput,
  RichTextEditor,
  Select,
  TagSelector,
  TimePicker,
  YearSelect,
} from '@toptal/picasso'

const component = 'HiglightAutofill'

describe('Highlight Autofill', () => {
  describe('when highlight prop is true', () => {
    it('renders inputs with correct background color', () => {
      cy.mount(
        <Container padded='small' gap='small' flex direction='column'>
          <Container>
            <FormLabel>Autocomplete</FormLabel>
            <Autocomplete value='' highlight='autofill' />
          </Container>
          <Container>
            <FormLabel>DatePicker</FormLabel>
            <DatePicker onChange={() => {}} highlight='autofill' />
          </Container>
          <Container>
            <FormLabel>MonthSelect</FormLabel>
            <MonthSelect highlight='autofill' />
          </Container>
          <Container>
            <FormLabel>NumberInput</FormLabel>
            <NumberInput highlight='autofill' />
          </Container>
          <Container>
            <FormLabel>PasswordInput</FormLabel>
            <PasswordInput highlight='autofill' />
          </Container>
          <Container>
            <FormLabel>RichTextEditor</FormLabel>
            <RichTextEditor id='foo' highlight='autofill' />
          </Container>
          <Container>
            <FormLabel>Select</FormLabel>
            <Select
              options={[{ text: 'foo', value: 'bar' }]}
              highlight='autofill'
            />
          </Container>
          <Container>
            <FormLabel>TagSelector</FormLabel>
            <TagSelector highlight='autofill' />
          </Container>
          <Container>
            <FormLabel>TimePicker</FormLabel>
            <TimePicker highlight='autofill' />
          </Container>
          <Container>
            <FormLabel>YearSelect</FormLabel>
            <YearSelect from={2000} to={2010} highlight='autofill' />
          </Container>
          <Container>
            <FormLabel>Input</FormLabel>
            <Input highlight='autofill' />
          </Container>
        </Container>
      )

      cy.get('body').happoScreenshot({
        component,
        variant: 'default',
      })
    })
  })
})
