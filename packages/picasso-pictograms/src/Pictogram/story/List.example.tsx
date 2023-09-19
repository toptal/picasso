import React from 'react'
import {
  Grid,
  Paper,
  Typography,
  Container,
  Input,
  Search16,
} from '@toptal/picasso'
import { SPACING_4, SPACING_6 } from '@toptal/picasso/utils'
import * as pictograms from '@toptal/picasso-pictograms/Pictogram'

const Example = () => {
  const [filter, setFilter] = React.useState('')

  const handleFilter = (
    e: React.ChangeEvent<{
      name?: string
      value: string
    }>
  ) => setFilter(e.target.value)

  const pictogramsList = Object.keys(pictograms).filter(name =>
    name.toLocaleLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <Grid spacing={16}>
        <Grid.Item sm={12}>
          <Container flex>
            <Input
              icon={<Search16 />}
              width='full'
              placeholder='Filter pictograms...'
              onChange={handleFilter}
            />
          </Container>
        </Grid.Item>
        {pictogramsList.map(pictogramName => {
          const Pictogram = pictograms[pictogramName as keyof typeof pictograms]

          return (
            <Grid.Item key={pictogramName}>
              <Paper>
                <Container
                  flex
                  alignItems='center'
                  justifyContent='center'
                  padded={SPACING_4}
                  style={{
                    paddingBottom: '0.5rem',
                    minWidth: '9rem',
                  }}
                >
                  <Grid alignItems='center' direction='column' spacing={8}>
                    <Grid.Item>
                      <Container padded={SPACING_6} variant='grey'>
                        <Pictogram />
                      </Container>
                    </Grid.Item>
                    <Grid.Item>
                      <Typography size='xsmall'>{pictogramName}</Typography>
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
