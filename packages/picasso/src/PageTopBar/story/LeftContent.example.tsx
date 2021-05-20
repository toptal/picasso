import React from 'react'
import {
  Page,
  Container,
  Button,
  UserBadge,
  Typography,
  AutocompleteItem
} from '@toptal/picasso'

const options = [
  { text: 'Denis Usanov', value: '1' },
  { text: 'Maria Kustova', value: '2' },
  { text: 'Maxim Visotskiy', value: '3' },
  { text: 'Nikita Luchko', value: '4' },
  { text: 'Nikola Duza', value: '5' },
  { text: 'Pavel Nikitsin', value: '6' },
  { text: 'Tomislav Hrvoic', value: '7' }
]

const renderOption = ({ text }: AutocompleteItem) => (
  <UserBadge name={text || ''}>
    <Typography size='small'>CMS (Eng)</Typography>
  </UserBadge>
)

const Example = () => (
  <div style={{ height: '4.5rem' }}>
    <Page.TopBar
      title='Onboarding'
      actionItems={
        <Container right='medium'>
          <Button variant='transparent'>Create job</Button>
        </Container>
      }
      leftContent={
        <Container left='large'>
          <Page.Autocomplete
            value=''
            placeholder='Users'
            options={options}
            renderOption={renderOption}
          />
        </Container>
      }
    />
  </div>
)

export default Example
