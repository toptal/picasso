import { withStyles } from '@material-ui/core/styles'

import React, { Fragment } from 'react'
import _ from 'lodash'

import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import Table from '@material-ui/core/Table'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import cx from 'classnames'

import { PropDocumentation } from '../../../../utils/documentationGenerator'
import PropTypeTableCell from './PropTypeTableCell'
import EnumsList from './EnumsList'
import Description from './Description'
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
            <PropTypeTableCell className={classes.typeCell} type={type} />
            <TableCell className={classes.defaultValueCell}>
              {defaultValue && (
                <span className={classes.highlight}>{defaultValue}</span>
              )}
            </TableCell>
            <TableCell className={classes.descriptionCell}>
              <Description
                description={description}
                classes={classes}
                propName={name}
              />
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
            <TableCell className={cx(classes.header, classes.name)}>
              Name
            </TableCell>
            <TableCell className={cx(classes.header, classes.type)}>
              Type
            </TableCell>
            <TableCell className={cx(classes.header, classes.defaultValue)}>
              Default
            </TableCell>
            <TableCell className={cx(classes.header, classes.description)}>
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
