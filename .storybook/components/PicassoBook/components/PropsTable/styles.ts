import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    table: {
      width: '100%'
    },
    name: {
      width: '100px'
    },
    type: {
      width: '1%'
    },
    description: {
      width: '100%'
    },
    defaultValue: {
      width: '1%'
    },
    tooltipTarget: {
      borderBottom: '1px dotted',
      fontWeight: 600,
      cursor: 'help'
    },
    highlight: {
      backgroundColor: 'rgb(236, 236, 236, 0.5)',
      borderRadius: '0.4em',
      padding: '0.3em 0.7em',
      fontWeight: 600
    },
    typeCell: {
      whiteSpace: 'nowrap'
    },
    defaultValueCell: {
      whiteSpace: 'nowrap'
    },
    descriptionCell: {
      paddingTop: '1em',
      paddingBottom: '1em'
    },
    enums: {
      marginTop: '1em',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center'
    },
    enumLabel: {
      marginRight: '0.2em',
      marginBottom: '0.2em'
    },
    enum: {
      fontSize: '0.8rem',
      marginRight: '0.2em',
      marginBottom: '0.2em'
    },
    markdown: {
      '& code': {
        backgroundColor: 'rgb(236, 236, 236, 0.5)',
        borderRadius: '0.4em',
        padding: '0.3em 0.7em',
        fontWeight: 400,
        fontSize: '0.8em',
        fontFamily:
          "'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace"
      },
      '& p:first-child': {
        marginTop: 0
      },
      '& p:last-child': {
        marginBottom: 0
      },
      '& pre': {
        backgroundColor: 'rgb(236, 236, 236, 0.5)',

        '& code': {
          padding: '0em',
          backgroundColor: 'initial'
        }
      }
    }
  })
