import type { ReactNode } from 'react'
import React from 'react'
import {
  PicassoLight,
  Favicon,
  NotificationsProvider,
} from '@toptal/picasso-provider'
import { Page, Container, Button } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'

const App = ({ children }: { children?: ReactNode }) => {
  const { showInfo } = useNotifications()

  return (
    <PicassoLight>
      <Favicon />
      <NotificationsProvider>
        <Page>
          <Page.TopBar title='Picasso with notifications provider and favicon' />
          <Page.Content>
            <Page.Article>
              <Container top={7} bottom={7} flex justifyContent='center'>
                <Button
                  data-testid='trigger'
                  variant='secondary'
                  onClick={() =>
                    showInfo(
                      "That's one small step for a man, one giant leap for mankind."
                    )
                  }
                >
                  Show general notification
                </Button>
                {children}
              </Container>
            </Page.Article>
          </Page.Content>
          <Page.Footer />
        </Page>
      </NotificationsProvider>
    </PicassoLight>
  )
}

const Index = () => (
  <div id='root'>
    <App></App>
  </div>
)

export default Index
