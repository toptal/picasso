import { Container, DatePicker, Drawer } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import React, { useCallback, useState } from 'react'

const DefaultExample = () => {
  const [opened, setOpened] = useState(false)
  const [val, setVal] = useState<Date>()

  const toggleOpened = useCallback(
    () => setOpened(prevOpened => !prevOpened),
    [setOpened]
  )

  return (
    <>
      <button onClick={toggleOpened}>Open Drawer</button>
      <Drawer open={opened} onClose={() => setOpened(false)}>
        <Container padded={SPACING_4}>
          <DatePicker
            value={val}
            onChange={date => {
              if (date instanceof Date) {
                setVal(date)
              }
            }}
          />
        </Container>
      </Drawer>
    </>
  )
}

export default DefaultExample
