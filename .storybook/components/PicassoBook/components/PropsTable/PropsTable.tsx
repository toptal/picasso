import { withStyles } from '@material-ui/core/styles'

import React from 'react'

import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import Table from '@material-ui/core/Table'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import cx from 'classnames'

import styles from './styles'

export interface PropDocumentation {
  name: string
  type: string
  defaultValue?: string
  description: string
  enums?: Array<string>
}

export type Documentation = Array<PropDocumentation>

interface Props {
  documentation: Documentation
  classes: Partial<ClassNameMap<string>>
}

const PropsTable: React.FunctionComponent<Props> = props => {
  const { documentation, classes } = props

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
        <TableBody>
          {documentation.map(
            ({ name, type, defaultValue, description, enums }) => (
              <TableRow key={name}>
                <TableCell>
                  <span className={classes.propName}>{name}</span>
                </TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>
                  {defaultValue && (
                    <span className={classes.highlight}>{defaultValue}</span>
                  )}
                </TableCell>
                <TableCell className={classes.descriptionCell}>
                  <div dangerouslySetInnerHTML={{ __html: description }} />

                  {enums && (
                    <div className={classes.enums}>
                      <strong>Enums:</strong>

                      {enums.map(enumValue => (
                        <span
                          key={enumValue}
                          className={cx(classes.highlight, classes.enum)}>
                          {enumValue}
                        </span>
                      ))}
                    </div>
                  )}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default withStyles(styles)(PropsTable)
