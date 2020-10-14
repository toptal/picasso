import React from 'react'
import { UserBadge, Grid, Typography, Link } from '@toptal/picasso'
import { TypographyOverflow } from '@toptal/picasso-lab'

const Example = () => (
  <div>
    <Grid direction='column'>
      <Grid.Item>
        <Typography>Standard Title</Typography>
        <UserBadge
          name='Jacqueline Roque'
          title='UI specialist'
          avatar='./jacqueline-with-flowers-1954-square.jpg'
        >
          <Typography size='small'>
            <Link href='#'>Send me an email</Link>
          </Typography>
        </UserBadge>
      </Grid.Item>
      <Grid.Item>
        <Typography>Custom Title with ellipsis</Typography>
        <div style={{ width: '220px' }}>
          <UserBadge
            name='Jacqueline Roque'
            title='UI specialist'
            avatar='./jacqueline-with-flowers-1954-square.jpg'
            renderName={(name: string, invert?: boolean) => (
              <Typography
                inline
                variant='heading'
                size='small'
                invert={invert}
                style={{ whiteSpace: 'nowrap' }}
              >
                {name}
              </Typography>
            )}
            renderTitle={(title: string, invert?: boolean) => (
              <TypographyOverflow
                color='red'
                inline
                size='small'
                invert={invert}
                style={{
                  marginLeft: '0.5em'
                }}
              >
                {title}
              </TypographyOverflow>
            )}
          >
            <Typography size='small'>
              <Link href='#'>Send me an email</Link>
            </Typography>
          </UserBadge>
        </div>
      </Grid.Item>
    </Grid>
  </div>
)

export default Example
