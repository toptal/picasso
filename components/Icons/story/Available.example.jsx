import React from 'react'

import Spacer from '../../Spacer'
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
        <Spacer bottom={2} key={index} right={2}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Icon name={icon} style={{ height: '2em', width: '2em' }} />
            <Spacer bottom={2} />
            <span>{icon}</span>
          </div>
        </Spacer>
      )
    })}
  </div>
)

export default AvailableExample
