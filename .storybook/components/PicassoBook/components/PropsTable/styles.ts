import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    header: {
      fontWeight: 600,
      fontSize: '1.2rem'
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
    propName: {
      fontWeight: 600
    },
    tooltipTarget: {
      borderBottom: '1px dotted',
      fontWeight: 600,
      cursor: 'help'
    },
    requiredTag: {
      fontWeight: 600,
      color: palette.error.main,
      paddingLeft: '0.25em'
    },
    highlight: {
      backgroundColor: 'rgb(236, 236, 236, 0.5)',
      borderRadius: '0.4em',
      padding: '0.3em 0.7em',
      fontWeight: 600
    },
    sourceCode: {
      fontWeight: 400,
      fontSize: '0.8em',
      fontFamily:
        "'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace"
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
      marginTop: '1em'
    },
    enum: {
      fontSize: '0.8rem',
      margin: '0 0.2em'
    },
    tooltip: {
      backgroundColor: palette.common.black,
      fontWeight: 600,
      fontSize: '0.9em',
      maxWidth: 'none'
    }
  })
