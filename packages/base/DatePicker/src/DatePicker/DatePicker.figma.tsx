import figma from '@figma/code-connect'
import React from 'react'
import { DatePicker } from '@toptal/picasso'

figma.connect(
  DatePicker,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=16058-7027',
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

// Variant=Date Selection maps to dropdownNavigation=true (separate month/year dropdowns)
figma.connect(
  DatePicker,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=18781-1934',
  {
    props: {
      dropdownNavigation: figma.enum('Variant', {
        'Date Selection': true,
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

figma.connect(
  DatePicker,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=16059-11495',
  {
    example: () => <DatePicker range value={undefined} onChange={() => {}} />,
  }
)
