import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { List } from '@toptal/picasso-lab'

const Codemod = ({ children }) => (
  <strong
    style={{
      // display: 'block',
      backgroundColor: 'rgb(236, 236, 236, 0.5)',
      borderRadius: '0.4em',
      padding: '0.3em 0.7em',
      // marginBottom: '0.3em',
      fontWeight: 600
    }}
  >
    {children}
  </strong>
)

const MigrationDoc = ({ changes, componentName, codemods }) => (
  <div>
    <Container bottom='small'>
      <Typography variant='heading'>{componentName}</Typography>
    </Container>
    <List variant='unordered'>
      {changes.map(change => (
        <List.Item>{change}</List.Item>
      ))}
    </List>

    {codemods && (
      <>
        <Container top='small' bottom='xsmall'>
          <Typography>Codemods</Typography>
        </Container>
        <List variant='unordered'>
          {codemods.map(codemod => (
            <List.Item>
              <Codemod>{codemod}</Codemod>
            </List.Item>
          ))}
        </List>
      </>
    )}
  </div>
)

const Example = () => (
  <MigrationDoc
    componentName='Subheader'
    changes={[
      'Height reduced to 54px',
      'Changed color of the divider',
      'Renamed to PageHead'
    ]}
    codemods={[
      'toptal/picasso/codemods/subheader1',
      'toptal/picasso/codemods/subheader2'
    ]}
  />
)

export default Example
