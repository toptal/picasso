import React from 'react'

import Container from '../../Container'
import Icon from '../'
import * as iconsImports from '../index'
const { default: IconsLibrary, ...icons } = iconsImports

IconsLibrary.add(...Object.values(icons))

const AvailableExample = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      flex: 1
    }}
  >
    {Object.keys(icons).map((icon, index) => {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <Container bottom={2} key={index} right={2}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Container bottom={2}>
              <Icon name={icon} style={{ height: '2em', width: '2em' }} />
            </Container>
            <span>{icon}</span>
          </div>
        </Container>
      )
    })}
  </div>
)

export default AvailableExample
