import React from 'react'

import { Props } from '../Select'
import { ItemProps } from '../useSelect'
import { Option } from '../types'

export type NativeOptionsListProps = Pick<Props, 'options' | 'renderOption'> & {
  getItemProps: (index: number, option: Option) => ItemProps
}

const NativeOptionsList = ({
  options,
  renderOption,
  getItemProps
}: NativeOptionsListProps) => (
  <React.Fragment>
    {options.map((option, index) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { close: _, ...rest } = getItemProps(index, option)

      return (
        <option
          key={option.key || option.value}
          value={option.value}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
        >
          {renderOption!(option)}
        </option>
      )
    })}
  </React.Fragment>
)

export default NativeOptionsList
