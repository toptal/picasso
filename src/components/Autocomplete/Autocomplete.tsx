import React, { FunctionComponent, FormEvent, ChangeEvent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import Downshift from 'downshift'

import { StandardProps } from '../Picasso'
import TextField from '../TextField'
import Menu from '../Menu'
import MenuItem from '../MenuItem'
import styles from './styles'

export interface Props extends StandardProps {
  /** Placeholder for value */
  placeholder?: string
  /** Take the full width of a container */
  fullWidth?: boolean
  /** Initial results (suggestions) */
  results?: {
    label: string
  }[]
}

const isSubstring = (value: string | null, result: { label: string }) => {
  const inputValue = (value || '').trim().toLowerCase()
  const inputLength = inputValue.length
  return result.label.slice(0, inputLength).toLowerCase() === inputValue
}

const getFilteredResults = (
  results: { label: string }[],
  value: string | null
) => {
  let count = 0

  return results.filter(result => {
    const keep = count < 5 && isSubstring(value, result)

    if (keep) {
      count += 1
    }

    return keep
  })
}

export const Autocomplete: FunctionComponent<Props> = ({
  classes,
  className,
  fullWidth = false,
  placeholder,
  results = [],
  style
}) => {
  return (
    <Downshift>
      {({
        clearSelection,
        getInputProps,
        getItemProps,
        getMenuProps,
        highlightedIndex,
        inputValue,
        isOpen,
        openMenu,
        selectItem
      }) => {
        const { onBlur, onFocus, onChange, onKeyDown, value } = getInputProps({
          onFocus: openMenu,
          onBlur: () => {
            if (!inputValue || !inputValue.trim().length) {
              return
            }

            const filteredResults = getFilteredResults(results, inputValue)
            if (
              filteredResults &&
              filteredResults.length &&
              isSubstring(inputValue, filteredResults[0])
            ) {
              selectItem(filteredResults[0].label)
            }
          },
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === '') {
              clearSelection()
            }
          },
          placeholder
        })

        const filteredSuggestions = getFilteredResults(results, inputValue)

        return (
          <div
            className={cx(classes.root, classes.rootFixedWidth, className, {
              [classes.rootFullWidth]: fullWidth
            })}
            style={style}
          >
            <TextField
              inputProps={{
                onBlur,
                onFocus,
                labelWidth: 0
              }}
              onChange={e => {
                if (!e) {
                  return
                }

                onChange(e as FormEvent<HTMLInputElement>)
              }}
              onKeyDown={onKeyDown}
              value={value as string}
              fullWidth={fullWidth}
            />

            <div {...getMenuProps()}>
              {isOpen ? (
                <Menu className={classes.menu}>
                  {filteredSuggestions.map((result, index) => (
                    <MenuItem
                      key={result.label}
                      selected={highlightedIndex === index}
                      component='div'
                      {...getItemProps({ item: result.label })}
                    >
                      {result.label}
                    </MenuItem>
                  ))}
                </Menu>
              ) : null}
            </div>
          </div>
        )
      }}
    </Downshift>
  )
}

Autocomplete.defaultProps = {}

Autocomplete.displayName = 'Autocomplete'

export default withStyles(styles)(Autocomplete)
