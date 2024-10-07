import React from 'react'
import {
  Page,
  Section,
  PageHeadBase,
  Typography,
  Container,
  Button,
} from '@toptal/picasso'
import { SPACING_4, SPACING_8 } from '@toptal/picasso-utils'

const BlankExample = () => (
  <div>
    <Page>
      <Page.Content>
        <Container>
          <Page.Article>
            <PageHeadBase noBorder title='Overview' />
          </Page.Article>
          <Page.Article style={{ marginTop: '1rem' }}>
            <Section variant='bordered'>
              <Container bottom={SPACING_4}>
                <Typography variant='heading' size='large'>
                  Next step: Speak with ToptTal representative
                </Typography>
              </Container>
              <Container bottom={SPACING_8}>
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
