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
  describe('when highlightAutofill prop is true', () => {
    it('renders inputs with correct background color', () => {
      cy.mount(
        <Container padded='small' gap='small' flex direction='column'>
          <Container>
            <FormLabel>Autocomplete</FormLabel>
            <Autocomplete value='' highlightAutofill />
          </Container>
          <Container>
            <FormLabel>DatePicker</FormLabel>
            <DatePicker onChange={() => {}} highlightAutofill />
          </Container>
          <Container>
            <FormLabel>MonthSelect</FormLabel>
            <MonthSelect highlightAutofill />
          </Container>
          <Container>
            <FormLabel>NumberInput</FormLabel>
            <NumberInput highlightAutofill />
          </Container>
          <Container>
            <FormLabel>PasswordInput</FormLabel>
            <PasswordInput highlightAutofill />
          </Container>
          <Container>
            <FormLabel>RichTextEditor</FormLabel>
            <RichTextEditor id='foo' highlightAutofill />
          </Container>
          <Container>
            <FormLabel>Select</FormLabel>
            <Select
              options={[{ text: 'foo', value: 'bar' }]}
              highlightAutofill
            />
          </Container>
          <Container>
            <FormLabel>TagSelector</FormLabel>
            <TagSelector highlightAutofill />
          </Container>
          <Container>
            <FormLabel>TimePicker</FormLabel>
            <TimePicker highlightAutofill />
          </Container>
          <Container>
            <FormLabel>YearSelect</FormLabel>
            <YearSelect from={2000} to={2010} highlightAutofill />
          </Container>
          <Container>
            <FormLabel>Input</FormLabel>
            <Input highlightAutofill />
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
