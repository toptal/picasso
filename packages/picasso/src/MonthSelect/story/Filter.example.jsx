import React, { useState } from 'react'
import { Grid, Form, MonthSelect, YearSelect } from '@toptal/picasso'

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
    const newStartYear = e.target.value

    setStartYear(newStartYear)

    if (newStartYear && endYear && newStartYear === endYear) {
      if (startMonth && endMonth && endMonth < startMonth) {
        setEndMonth(startMonth)
      }
    }
  }

  const handleEndYearChange = e => {
    const newEndYear = e.target.value

    setEndYear(newEndYear)

    if (startYear && newEndYear && startYear === newEndYear) {
      if (startMonth && endMonth && endMonth < startMonth) {
        setEndMonth(startMonth)
      }
    }
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
