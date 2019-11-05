import React, { Fragment, FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'

import { Table } from '@components'
import cx from 'classnames'

import { Classes } from '@components/styles/types'
import {
  PropDocumentation,
  PropTypeDocumentation
} from '~/.storybook/utils/documentation-generator'
import PropTypeTableCell from './PropTypeTableCell'
import EnumsList from './EnumsList'
import Description from './Description'
import styles from './styles'

interface Props {
  documentation: PropDocumentation[]
  classes: Classes
}

function renderRows({ documentation, classes }: Props): JSX.Element {
  const isEnum = (type: string | PropTypeDocumentation) =>
    type === 'enum' || (type as PropTypeDocumentation).name === 'enum'

  return (
    <Fragment>
      {documentation.map(
        ({ name, type, defaultValue, description, enums, required }) => (
          <Table.Row key={name}>
            <Table.Cell>
              <span className={classes.propName}>{name}</span>
              {required && <span className={classes.requiredTag}>*</span>}
            </Table.Cell>
            <PropTypeTableCell className={classes.typeCell} type={type} />
            <Table.Cell className={classes.defaultValueCell}>
              {defaultValue && (
                <span className={classes.highlight}>{defaultValue}</span>
              )}
            </Table.Cell>
            <Table.Cell className={classes.descriptionCell}>
              <Description description={description} propName={name} />
              {isEnum(type) && <EnumsList type={type} enums={enums} />}
            </Table.Cell>
          </Table.Row>
        )
      )}
    </Fragment>
  )
}

const PropsTable: FunctionComponent<Props> = props => {
  const { classes } = props

  return (
    <div className={classes.root}>
      <Table className={classes.table}>
        <Table.Head>
          <Table.Row>
            <Table.Cell className={cx(classes.name)}>Name</Table.Cell>
            <Table.Cell className={cx(classes.type)}>Type</Table.Cell>
            <Table.Cell className={cx(classes.defaultValue)}>
              Default
            </Table.Cell>
            <Table.Cell className={cx(classes.description)}>
              Description
            </Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>{renderRows(props)}</Table.Body>
      </Table>
    </div>
  )
}

export default withStyles(styles)(PropsTable)
