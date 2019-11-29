/* eslint-disable react/no-multi-comp */
import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import Picasso from '@toptal/picasso-shared'

import Accordion from './Accordion'

afterEach(cleanup)

const summaryHeaderText = 'Fryderyk Chopin'
const Summary = () => <div>{summaryHeaderText}</div>

const Details = () => (
  <div>
    Fryderyk Chopin was born in Żelazowa Wola, 46 kilometres west of Warsaw, in
    what was then the Duchy of Warsaw, a Polish state established by Napoleon.
    The parish baptismal record gives his birthday as 22 February 1810, and
    cites his given names in the Latin form Fridericus Franciscus (in Polish, he
    was Fryderyk Franciszek). However, the composer and his family used the
    birthdate 1 March, which is now generally accepted as the correct date.
  </div>
)

describe('default version for sections', () => {
  test('should render default version', () => {
    const { container } = render(
      <Picasso loadFonts={false}>
        <Accordion content={<Details />}>
          <Summary />
        </Accordion>
      </Picasso>
    )

    expect(container).toMatchSnapshot()
  })

  test('should render expanded version after click on summary', () => {
    const { container, getByText } = render(
      <Picasso loadFonts={false}>
        <Accordion content={<Details />}>
          <Summary />
        </Accordion>
      </Picasso>
    )
    const summary = getByText(summaryHeaderText)

    fireEvent.click(summary)

    expect(container).toMatchSnapshot()
  })
})

describe('controlled version', () => {
  test('should render expanded version', () => {
    const { container } = render(
      <Picasso loadFonts={false}>
        <Accordion content={<Details />} expanded>
          <Summary />
        </Accordion>
      </Picasso>
    )

    expect(container).toMatchSnapshot()
  })

  test('should render collapsed version', () => {
    const { container } = render(
      <Picasso loadFonts={false}>
        <Accordion content={<Details />} expanded={false}>
          <Summary />
        </Accordion>
      </Picasso>
    )

    expect(container).toMatchSnapshot()
  })
})
