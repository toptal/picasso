/* eslint-disable react/no-multi-comp */
import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'

import Accordion from './index'

const renderAccordion = (props = {}) => {
  return render(<Accordion {...props} />)
}

afterEach(cleanup)

const Summary = () => <div>Fryderyk Chopin</div>

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
  let api

  beforeEach(() => {
    api = renderAccordion({
      Details: <Details />,
      Summary: <Summary />
    })
  })

  test('should render default version', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })

  test('should render expanded version after click on summary', () => {
    const { container, getByTestId } = api
    const summary = getByTestId('panel-summary')

    fireEvent.click(summary)

    expect(container).toMatchSnapshot()
  })
})

describe('controlled version', () => {
  test('should render expanded version', () => {
    const { container } = renderAccordion({
      Details: <Details />,
      expanded: true
    })

    expect(container).toMatchSnapshot()
  })

  test('should render collapsed version', () => {
    const { container } = renderAccordion({
      Details: <Details />,
      expanded: false
    })

    expect(container).toMatchSnapshot()
  })
})
