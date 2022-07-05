import createStyles from '@mui/styles/createStyles';

export default () =>
  createStyles({
    noWrap: {
      flex: 1,
      minWidth: 0,
    },
    withIcon: {
      marginLeft: '0.875em',
    },
    hiddenContent: {
      visibility: 'hidden',
    },
    iconWrapper: {
      width: '1em',
      height: '1em',
    },
    staticBadge: {
      marginLeft: '0.5em',
    },
  })
