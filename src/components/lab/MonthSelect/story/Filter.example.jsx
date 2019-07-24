import React, { useState } from 'react'
import { Grid, Form, Container } from '@toptal/picasso'
import { MonthSelect, YearSelect } from '@toptal/picasso/lab'

const FilterExample = () => {
  const [startMonth, setStartMonth] = useState()
  const [endMonth, setEndMonth] = useState()
  const [startYear, setStartYear] = useState()
  const [endYear, setEndYear] = useState()

  const CURRENT_YEAR = new Date().getFullYear()
  const START_YEAR = CURRENT_YEAR - 5

  const handleStartMonthChange = e => {
    setStartMonth(e.target.value)
  }
  const handleEndMonthChange = e => {
    setEndMonth(e.target.value)
  }

  const handleStartYearChange = e => {
    setStartYear(e.target.value)
  }

  const handleEndYearChange = e => {
    setEndYear(e.target.value)
  }

  return (
    <Grid direction='row'>
      <Grid.Item small={4}>
        <Form.Field>
          <Form.Label>Start date</Form.Label>
          <Container bottom='small'>
            <MonthSelect
              width='auto'
              onChange={handleStartMonthChange}
              value={startMonth}
              to={
                startYear && endYear && startYear === endYear
                  ? endMonth
                  : undefined
              }
              placeholder='Month'
            />
          </Container>

          <YearSelect
            placeholder='Year'
            width='auto'
            value={startYear}
            onChange={handleStartYearChange}
            from={START_YEAR}
            to={endYear || CURRENT_YEAR}
          />
        </Form.Field>
      </Grid.Item>
      <Grid.Item small={4}>
        <Form.Field>
          <Form.Label>End date</Form.Label>
          <Container bottom='small'>
            <MonthSelect
              value={endMonth}
              onChange={handleEndMonthChange}
              from={
                startYear && endYear && startYear === endYear
                  ? startMonth
                  : undefined
              }
              width='auto'
              placeholder='Month'
            />
          </Container>
          <YearSelect
            placeholder='Year'
            value={endYear}
            onChange={handleEndYearChange}
            width='auto'
            from={startYear || START_YEAR}
            to={CURRENT_YEAR}
          />
        </Form.Field>
      </Grid.Item>
    </Grid>
  )
}

export default FilterExample
