import React from 'react'
import styled from 'styled-components'
import { Button, Container, Typography } from '@toptal/picasso'
import { useNotifications, palette, shadows } from '@toptal/picasso/utils'

const StyledCustomNotification = styled(Container)`
  background-color: ${palette.common.white};
  box-shadow: ${shadows[3]};
`

const Example = () => {
  const { showCustomNotification, closeNotification } = useNotifications()

  return (
    <Button
      variant='secondary-blue'
      onClick={() => {
        const notificationId = showCustomNotification(
          <StyledCustomNotification flex direction='row' padded='small'>
            <Typography>
              This website uses cookies in order to offer you the most relevant
              information. Please accept cookies for optimal performance.
            </Typography>
            <Container top='small'>
              <Button onClick={() => closeNotification(notificationId)}>
                Yes, I accept Cookies
              </Button>
            </Container>
          </StyledCustomNotification>,
          {
            vertical: 'bottom',
            horizontal: 'center'
          },
          {
            persist: true
          }
        )
      }}
    >
      Show accept cookies notification
    </Button>
  )
}

export default Example
