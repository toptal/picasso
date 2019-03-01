import { withStyles } from '@material-ui/core/styles'

import React, { Fragment } from 'react'
import _ from 'lodash'

import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import Table from '@material-ui/core/Table'
import Tooltip from '@material-ui/core/Tooltip'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import cx from 'classnames'

import { PropDocumentation } from '../../../../utils/documentationGenerator'
import PropTypeTableCell from './PropTypeTableCell'
import EnumsList from './EnumsList'
import styles from './styles'

interface Props {
  documentation: PropDocumentation[]
  classes: Partial<ClassNameMap<string>>
}

function renderRows({ documentation, classes }: Props): JSX.Element {
  return (
    <Fragment>
      {documentation.map(
        ({ name, type, defaultValue, description, enums, required }) => (
          <TableRow key={name}>
            <TableCell>
              <span className={classes.propName}>{name}</span>
              <span className={classes.requiredTag}>{required ? '*' : ''}</span>
            </TableCell>
            <PropTypeTableCell type={type} />
            <TableCell>
              {defaultValue && (
                <span className={classes.highlight}>{defaultValue}</span>
              )}
            </TableCell>
            <TableCell className={classes.descriptionCell}>
              <div dangerouslySetInnerHTML={{ __html: description }} />
              {enums && <EnumsList enums={enums} />}
            </TableCell>
          </TableRow>
        )
      )}
    </Fragment>
  )
}

const PropsTable: React.FunctionComponent<Props> = props => {
  const { classes } = props

  return (
    <div className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.header}>Name</TableCell>
            <TableCell className={cx(classes.header, classes.type)}>
              Type
            </TableCell>
            <TableCell className={classes.header}>Default</TableCell>
            <TableCell
              className={cx(classes.header, classes.descriptionHeader)}>
              Description
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderRows(props)}</TableBody>
      </Table>
    </div>
  )
}

export default withStyles(styles)(PropsTable)
