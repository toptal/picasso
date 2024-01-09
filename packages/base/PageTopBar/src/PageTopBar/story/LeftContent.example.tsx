import React from 'react'
import type { AutocompleteItem } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'
import { Page, Container, Button, UserBadge, Typography } from '@toptal/picasso'

const options = [
  { text: 'Denis Usanov', value: '1' },
  { text: 'Maria Kustova', value: '2' },
  { text: 'Maxim Visotskiy', value: '3' },
  { text: 'Nikita Luchko', value: '4' },
  { text: 'Nikola Duza', value: '5' },
  { text: 'Pavel Nikitsin', value: '6' },
  { text: 'Tomislav Hrvoic', value: '7' },
]

const renderOption = ({ text }: AutocompleteItem) => (
  <UserBadge name={text || ''}>
    <Typography size='xsmall'>CMS (Eng)</Typography>
  </UserBadge>
)

const Example = () => (
  <div style={{ height: '4.5rem' }}>
    <Page.TopBar
      title='Onboarding'
      actionItems={
        <Container right={SPACING_6}>
          <Button variant='transparent'>Create job</Button>
        </Container>
      }
      leftContent={
        <Page.Autocomplete
          value=''
          placeholder='Users'
          options={options}
          renderOption={renderOption}
        />
      }
    />
  </div>
)

export default Example
