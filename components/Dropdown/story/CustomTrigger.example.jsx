import React from 'react'
import { Dropdown, Icon } from '@toptal/picasso'

const DropdownItems = ({ handleClose }) => (
  <React.Fragment>
    <Dropdown.Item onClick={() => console.log('clicked')}>
      Option 1
    </Dropdown.Item>
    <Dropdown.Item onClick={handleClose}>Option 2</Dropdown.Item>
    <Dropdown.Item onClick={handleClose}>Option 3</Dropdown.Item>
    <Dropdown.Item onClick={handleClose}>Option 4</Dropdown.Item>
    <Dropdown.Item onClick={handleClose}>Option 5</Dropdown.Item>
  </React.Fragment>
)

const DropdownCustomTriggerExample = () => (
  <div>
    <Dropdown content={<DropdownItems />}>
      <Icon name='logoEmblem' style={{ fontSize: '3em' }} />
    </Dropdown>
  </div>
)

export default DropdownCustomTriggerExample
