import React, { useState } from 'react'
import { Container, Typography, Page } from '@toptal/picasso'
import { DarkThemeSwitcher } from '@toptal/picasso-lab'
import { isDarkMode } from '@toptal/picasso/utils'

const Example = () => {
  const [darkMode, setDarkMode] = useState(isDarkMode())
  const variant = darkMode ? 'dark' : 'light'
  const Switcher = (
    <DarkThemeSwitcher
      onChange={() => {
        setDarkMode(!darkMode)
      }}
      checked={darkMode}
    />
  )

  return (
    <>
      <Container>
        <Typography variant='heading' size='small'>
          Enabled:
        </Typography>
      </Container>
      <Container top='small'>
        <Page>
          <Page.TopBar
            variant={variant}
            rightContent={Switcher}
            title='Default example'
          />
        </Page>
      </Container>
    </>
  )
}

export default Example
