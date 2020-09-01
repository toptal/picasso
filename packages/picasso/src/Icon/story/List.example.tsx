import React from 'react'
import { Grid, Paper, Typography, Container, Input } from '@toptal/picasso'
import * as icons from '@toptal/picasso/Icon'

/** We don't want to render internal icons */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Logo, LogoEmblem, DropdownArrows16, ...listIcons } = icons

const Example = () => {
  const [filter, setFilter] = React.useState('')

  const handleFilter = (
    e: React.ChangeEvent<{
      name?: string
      value: string
    }>
  ) => setFilter(e.target.value)

  const iconList = Object.keys(listIcons).filter(iconName =>
    iconName.toLocaleLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <Grid spacing={16}>
        <Grid.Item small={12}>
          <Container flex>
            <Input
              icon={<listIcons.Search16 />}
              width='full'
              placeholder='Filter icons...'
              onChange={handleFilter}
            />
          </Container>
        </Grid.Item>
        {iconList.map(iconName => {
          const Icon = listIcons[iconName as keyof typeof listIcons]

          return (
            <Grid.Item key={iconName}>
              <Paper>
                <Container
                  flex
                  alignItems='center'
                  justifyContent='center'
                  padded='small'
                  style={{
                    paddingBottom: '0.5rem',
                    minWidth: '9rem',
                    height: '7rem'
                  }}
                >
                  <Grid alignItems='center' direction='column' spacing={8}>
                    <Grid.Item>
                      <Icon />
                    </Grid.Item>
                    <Grid.Item>
                      <Typography size='small'>{iconName}</Typography>
                    </Grid.Item>
                  </Grid>
                </Container>
              </Paper>
            </Grid.Item>
          )
        })}
      </Grid>
    </div>
  )
}

export default Example
