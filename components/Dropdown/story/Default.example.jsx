import React from 'react'
import { Dropdown } from '@toptal/picasso'

const DropdownItems = ({ handleClose }) => (
  <React.Fragment>
    <Dropdown.Item onClick={handleClose}>Option 1</Dropdown.Item>
    <Dropdown.Item onClick={handleClose}>Option 2</Dropdown.Item>
    <Dropdown.Item onClick={handleClose}>Option 3</Dropdown.Item>
    <Dropdown.Item onClick={handleClose}>Option 4</Dropdown.Item>
    <Dropdown.Item onClick={handleClose}>Option 5</Dropdown.Item>
  </React.Fragment>
)

const DropdownDefaultExample = () => (
  <div>
    <Dropdown content={<DropdownItems />}>Open dropdown</Dropdown>
  </div>
)

export default DropdownDefaultExample
