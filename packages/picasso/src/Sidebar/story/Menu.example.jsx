import React from 'react'
import { Sidebar, Grid, Typography } from '@toptal/picasso'
import { Referrals16 } from '@toptal/picasso/Icon'

const Example = () => (
  <Grid spacing={32}>
    <Grid.Item style={{ height: '30rem' }}>
      <Typography variant='heading' size='small'>
        Collapsible:
      </Typography>
      <Sidebar>
        <Sidebar.Menu>
          <Sidebar.Item
            test-id='Referrals'
            collapsible
            icon={<Referrals16 />}
            menu={
              <Sidebar.Menu>
                <Sidebar.Item>Share Online</Sidebar.Item>
                <Sidebar.Item>Referred Users</Sidebar.Item>
                <Sidebar.Item>Commisions</Sidebar.Item>
                <Sidebar.Item>Payment Options</Sidebar.Item>
                <Sidebar.Item>Expected Commisions</Sidebar.Item>
              </Sidebar.Menu>
            }
          >
            Referrals
          </Sidebar.Item>
          <Sidebar.Item
            collapsible
            menu={
              <Sidebar.Menu>
                <Sidebar.Item selected>Community Leader</Sidebar.Item>
                <Sidebar.Item>Speakers Network</Sidebar.Item>
              </Sidebar.Menu>
            }
          >
            Get Involved
          </Sidebar.Item>
        </Sidebar.Menu>
      </Sidebar>
    </Grid.Item>

    <Grid.Item style={{ height: '30rem' }}>
      <Typography variant='heading' size='small'>
        Collapsible (disabled):
      </Typography>
      <Sidebar>
        <Sidebar.Menu>
          <Sidebar.Item
            collapsible
            disabled
            icon={<Referrals16 />}
            menu={
              <Sidebar.Menu>
                <Sidebar.Item>Share Online</Sidebar.Item>
                <Sidebar.Item>Referred Users</Sidebar.Item>
                <Sidebar.Item>Commisions</Sidebar.Item>
                <Sidebar.Item>Payment Options</Sidebar.Item>
                <Sidebar.Item>Expected Commisions</Sidebar.Item>
              </Sidebar.Menu>
            }
          >
            Referrals
          </Sidebar.Item>
        </Sidebar.Menu>
      </Sidebar>
    </Grid.Item>

    <Grid.Item style={{ height: '30rem' }}>
      <Typography variant='heading' size='small'>
        Non-collapsible:
      </Typography>
      <Sidebar>
        <Sidebar.Menu>
          <Sidebar.Item
            icon={<Referrals16 />}
            menu={
              <Sidebar.Menu>
                <Sidebar.Item>Share Online</Sidebar.Item>
                <Sidebar.Item>Referred Users</Sidebar.Item>
                <Sidebar.Item>Commisions</Sidebar.Item>
                <Sidebar.Item>Payment Options</Sidebar.Item>
                <Sidebar.Item>Expected Commisions</Sidebar.Item>
              </Sidebar.Menu>
            }
          >
            Referrals
          </Sidebar.Item>
        </Sidebar.Menu>
      </Sidebar>
    </Grid.Item>

    <Grid.Item style={{ height: '30rem' }}>
      <Typography variant='heading' size='small'>
        Non-collapsible (disabled):
      </Typography>
      <Sidebar>
        <Sidebar.Menu>
          <Sidebar.Item
            disabled
            icon={<Referrals16 />}
            menu={
              <Sidebar.Menu>
                <Sidebar.Item disabled>Share Online</Sidebar.Item>
                <Sidebar.Item disabled>Referred Users</Sidebar.Item>
                <Sidebar.Item disabled>Commisions</Sidebar.Item>
                <Sidebar.Item disabled>Payment Options</Sidebar.Item>
                <Sidebar.Item disabled>Expected Commisions</Sidebar.Item>
              </Sidebar.Menu>
            }
          >
            Referrals
          </Sidebar.Item>
        </Sidebar.Menu>
      </Sidebar>
    </Grid.Item>
  </Grid>
)

export default Example
