import { createStyles } from '@material-ui/core/styles'

const baseButtonProps = {}

const firstButtonProps = {
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  marginLeft: '0rem'
}

const middleButtonProps = {
  borderRadius: 0,
  // prevents border between 2 buttons to be wider then specified
  marginLeft: '-1px'
}

const lastButtonProps = {
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  // prevents border between 2 buttons to be wider then specified
  marginLeft: '-1px'
}

export default () =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'flex-start',

      // default case
      '& [data-component-type="button"]': {
        ...baseButtonProps,

        // first item
        '&:first-child:not(:last-child)': firstButtonProps,
        // middle item
        '&:not(:first-child):not(:last-child)': middleButtonProps,
        // last item
        '&:last-child:not(:first-child)': lastButtonProps
      },

      // nested case when button is nested in first item in ButtonGroup
      '& :first-child:not(:last-child) [data-component-type="button"]': {
        ...baseButtonProps,
        ...firstButtonProps
      },

      // nested case when button is nested in middle item in ButtonGroup
      '& :not(:first-child):not(:last-child) [data-component-type="button"]': {
        ...baseButtonProps,
        ...middleButtonProps
      },

      // nested case when button is nested in last item in ButtonGroup
      '& :last-child:not(:first-child) [data-component-type="button"]': {
        ...baseButtonProps,
        ...lastButtonProps
      }
    }
  })
