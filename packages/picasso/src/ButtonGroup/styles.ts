import { createStyles } from '@material-ui/core/styles'

import { COMPONENT_TYPE_DATA_ATTRIBUTE_KEY } from '../utils/constants'

const baseButtonProps = {
  transitionProperty: 'color, background',

  '&:active, &$active, &:hover, &$hovered, &:focus, &$focused': {
    zIndex: 1
  }
}

const firstButtonProps = {
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  marginLeft: '0rem'
}

const middleButtonProps = {
  borderRadius: 0,
  marginLeft: '-1px'
}

const lastButtonProps = {
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  marginLeft: '-1px'
}

const BUTTON_SELECTOR = `[${COMPONENT_TYPE_DATA_ATTRIBUTE_KEY}="button"]`

export default () =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'flex-start',

      [`& ${BUTTON_SELECTOR}`]: {
        ...baseButtonProps,

        '&:first-child:not(:last-child)': firstButtonProps,
        '&:not(:first-child):not(:last-child)': middleButtonProps,
        '&:last-child:not(:first-child)': lastButtonProps
      },

      [`& :first-child:not(:last-child) ${BUTTON_SELECTOR}`]: {
        ...baseButtonProps,
        ...firstButtonProps
      },

      [`& :not(:first-child):not(:last-child) ${BUTTON_SELECTOR}`]: {
        ...baseButtonProps,
        ...middleButtonProps
      },

      [`& :last-child:not(:first-child) ${BUTTON_SELECTOR}`]: {
        ...baseButtonProps,
        ...lastButtonProps
      }
    },
    active: {},
    focused: {},
    hovered: {}
  })
