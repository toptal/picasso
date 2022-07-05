import createStyles from '@mui/styles/createStyles';

export default () =>
  createStyles({
    root: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    xxsmallIcon: { fontSize: '1em' },
    xsmallIcon: { fontSize: '1em' },
    smallIcon: { fontSize: '1.5em' },
    mediumIcon: { fontSize: '1.875em' },
    largeIcon: { fontSize: '3em' },
  })
