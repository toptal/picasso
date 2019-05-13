/* eslint-disable react/no-multi-comp */
import React, { ReactNode } from 'react'
import { render, fireEvent, cleanup, RenderResult } from 'react-testing-library'

import { UserDefinedProps } from '../Picasso'
import Accordion, { Props } from './Accordion'

const renderAccordion = (
  props: UserDefinedProps<Props>,
  children: ReactNode
) => {
  const { content, expanded } = props

  return render(
    <Accordion content={content} expanded={expanded}>
      {children}
    </Accordion>
  )
}

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
  let api: RenderResult

  beforeEach(() => {
    api = renderAccordion({ content: <Details /> }, <Summary />)
  })

  test('should render default version', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })

  test('should render expanded version after click on summary', () => {
    const { container, getByText } = api
    const summary = getByText(summaryHeaderText)

    fireEvent.click(summary)

    expect(container).toMatchSnapshot()
  })
})

describe('controlled version', () => {
  test('should render expanded version', () => {
    const { container } = renderAccordion(
      {
        content: <Details />,
        expanded: true
      },
      null
    )

    expect(container).toMatchSnapshot()
  })

  test('should render collapsed version', () => {
    const { container } = renderAccordion(
      {
        content: <Details />,
        expanded: false
      },
      null
    )

    expect(container).toMatchSnapshot()
  })
})
