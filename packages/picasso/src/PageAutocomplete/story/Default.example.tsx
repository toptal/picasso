import React from 'react'
import { Page, UserBadge, Typography, Container } from '@toptal/picasso'
import { Item } from '@toptal/picasso/Autocomplete'

const options = [
  { text: 'Denis Usanov', value: '1' },
  { text: 'Maria Kustova', value: '2' },
  { text: 'Maxim Visotskiy', value: '3' },
  { text: 'Nikita Luchko', value: '4' },
  { text: 'Nikola Duza', value: '5' },
  { text: 'Pavel Nikitsin', value: '6' },
  { text: 'Tomislav Hrvoic', value: '7' }
]

const renderOption = ({ text }: Item) => (
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  <UserBadge name={text!}>
    <Typography size='small'>CMS (Eng)</Typography>
  </UserBadge>
)

const Example = () => (
  <>
    <div style={{ height: '4.5rem' }}>
      <Page.TopBar
        title='Dark variant'
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
  </>
)

export default Example
