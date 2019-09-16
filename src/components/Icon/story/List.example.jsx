import React from 'react'
import { Grid, Paper, Container, Input, Button } from '@toptal/picasso'
import * as icons from '@toptal/picasso/Icon'

/** We don't want to render internal icons */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Logo, LogoEmblem, DropdownArrows16, ...listIcons } = icons

const IconListExample = () => {
  const [filter, setFilter] = React.useState('')

  const handleFilter = e => setFilter(e.target.value)

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
          const Icon = listIcons[iconName]

          return (
            <Grid.Item key={iconName}>
              <Paper>
                <Container
                  flex
                  alignItems='center'
                  justifyContent='center'
                  padded='small'
                  style={{
                    paddingBottom: '0.5em',
                    minWidth: '9rem',
                    height: '7rem'
                  }}
                >
                  <Container alignItems='center' flex>
                    <Button icon={<Icon />} circular />
                  </Container>
                </Container>
              </Paper>
            </Grid.Item>
          )
        })}
      </Grid>
    </div>
  )
}

export default IconListExample
