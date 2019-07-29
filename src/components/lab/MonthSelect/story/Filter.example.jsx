import React, { useState } from 'react'
import { Grid, Form } from '@toptal/picasso'
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
    <div>
      <Form.Field>
        <Form.Label>From</Form.Label>
        <Grid>
          <Grid.Item small={2}>
            <MonthSelect
              width='full'
              onChange={handleStartMonthChange}
              value={startMonth}
              to={
                startYear && endYear && startYear === endYear
                  ? endMonth
                  : undefined
              }
              placeholder='Month'
            />
          </Grid.Item>

          <Grid.Item small={2}>
            <YearSelect
              placeholder='Year'
              width='full'
              value={startYear}
              onChange={handleStartYearChange}
              from={START_YEAR}
              to={endYear || CURRENT_YEAR}
            />
          </Grid.Item>
        </Grid>
      </Form.Field>

      <Form.Field>
        <Form.Label>To</Form.Label>
        <Grid>
          <Grid.Item small={2}>
            <MonthSelect
              value={endMonth}
              onChange={handleEndMonthChange}
              from={
                startYear && endYear && startYear === endYear
                  ? startMonth
                  : undefined
              }
              width='full'
              placeholder='Month'
            />
          </Grid.Item>

          <Grid.Item small={2}>
            <YearSelect
              placeholder='Year'
              value={endYear}
              onChange={handleEndYearChange}
              width='full'
              from={startYear || START_YEAR}
              to={CURRENT_YEAR}
            />
          </Grid.Item>
        </Grid>
      </Form.Field>
    </div>
  )
}

export default FilterExample
