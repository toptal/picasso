import React from 'react'
import {
  Page,
  Section,
  PageHead,
  Typography,
  Container,
  Button,
} from '@toptal/picasso'

const BlankExample = () => (
  <div>
    <Page>
      <Page.Content>
        <Container>
          <Page.Article>
            <PageHead noBorder>
              <PageHead.Main>
                <PageHead.Title>Overview</PageHead.Title>
              </PageHead.Main>
            </PageHead>
          </Page.Article>
          <Page.Article style={{ marginTop: '1rem' }}>
            <Section variant='bordered'>
              <Container bottom='small'>
                <Typography variant='heading' size='large'>
                  Next step: Speak with ToptTal representative
                </Typography>
              </Container>
              <Container bottom='large'>
                <Typography>
                  On this call, we will discuss the scope of the project and go
                  over how Toptal works to se if we can be a good fir to for
                  your project. This only takes approximately 15 minutes.
                </Typography>
              </Container>
              <Button onClick={() => {}}>Request a Call</Button>
            </Section>
          </Page.Article>
        </Container>
      </Page.Content>
    </Page>
  </div>
)

export default BlankExample
