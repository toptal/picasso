import { createStyles } from '@material-ui/core/styles'

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

export default () =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'flex-start',

      '& [data-component-type="button"]': {
        ...baseButtonProps,

        '&:first-child:not(:last-child)': firstButtonProps,
        '&:not(:first-child):not(:last-child)': middleButtonProps,
        '&:last-child:not(:first-child)': lastButtonProps
      },

      '& :first-child:not(:last-child) [data-component-type="button"]': {
        ...baseButtonProps,
        ...firstButtonProps
      },

      '& :not(:first-child):not(:last-child) [data-component-type="button"]': {
        ...baseButtonProps,
        ...middleButtonProps
      },

      '& :last-child:not(:first-child) [data-component-type="button"]': {
        ...baseButtonProps,
        ...lastButtonProps
      }
    },
    active: {},
    focused: {},
    hovered: {}
  })
