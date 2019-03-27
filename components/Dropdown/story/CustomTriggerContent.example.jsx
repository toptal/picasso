import React from 'react'
import { Dropdown, Icon, Logo } from '@toptal/picasso'

const DropdownItems = ({ handleClose }) => (
  <React.Fragment>
    <Dropdown.Item onClick={handleClose}>
      <Logo /> Default blue logo
    </Dropdown.Item>
    <Dropdown.Item onClick={handleClose}>
      <Logo variant='black' /> Black logo
    </Dropdown.Item>
    <Dropdown.Item onClick={handleClose}>
      <Logo emblem /> Emblem blue logo
    </Dropdown.Item>
    <Dropdown.Item onClick={handleClose}>
      <Logo emblem variant='black' /> Emblem black logo
    </Dropdown.Item>
  </React.Fragment>
)

const DropdownCustomTriggerContentExample = () => (
  <div>
    <Dropdown content={<DropdownItems />}>
      <Dropdown.Placeholder>
        <Icon name='logoEmblem' style={{ fontSize: '1.5em' }} />
        <span>Show Toptal logos</span>
      </Dropdown.Placeholder>
    </Dropdown>
  </div>
)

export default DropdownCustomTriggerContentExample
