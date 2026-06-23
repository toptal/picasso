import figma from '@figma/code-connect'
import React from 'react'
import { DatePicker } from '@toptal/picasso'

const FILE_KEY = '5SCTOPrCDcHuk5We091GBn'

// Date Picker Day — single-date input (closed and open states, 1- and 2-month calendar)
figma.connect(
  DatePicker,
  `https://www.figma.com/design/${FILE_KEY}/Product-Library?node-id=16058-7027`,
  {
    props: {
      numberOfMonths: figma.enum('Variant', {
        '2 Month view': 2,
      }),
    },
    example: ({ numberOfMonths }) => (
      <DatePicker
        value={undefined}
        numberOfMonths={numberOfMonths}
        onChange={() => {}}
      />
    ),
  }
)

// Date Picker / X / Type — calendar popup navigation style:
// Default = separate month/year dropdowns (dropdownNavigation); Variant2 = arrow navigation (default)
figma.connect(
  DatePicker,
  `https://www.figma.com/design/${FILE_KEY}/Product-Library?node-id=18781-1934`,
  {
    props: {
      dropdownNavigation: figma.enum('Variant', {
        Default: true,
      }),
    },
    example: ({ dropdownNavigation }) => (
      <DatePicker
        value={undefined}
        dropdownNavigation={dropdownNavigation}
        onChange={() => {}}
      />
    ),
  }
)

// Date Picker Range — range selection
figma.connect(
  DatePicker,
  `https://www.figma.com/design/${FILE_KEY}/Product-Library?node-id=16059-11495`,
  {
    example: () => <DatePicker range value={undefined} onChange={() => {}} />,
  }
)
