import React, { Fragment, FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Table } from '@toptal/picasso'
import { Classes } from '@toptal/picasso-shared'

import {
  PropDocumentation,
  PropTypeDocumentation
} from '~/.storybook/utils/documentation-generator'
import PropTypeTableCell from './PropTypeTableCell'
import EnumsList from './EnumsList'
import Description from './Description'
import styles from './styles'
import { sortBy } from './utils'

interface Props {
  documentation: PropDocumentation[]
  classes: Classes
}

function renderRows({ documentation, classes }: Props): JSX.Element {
  const isEnum = (type: string | PropTypeDocumentation) =>
    type === 'enum' || (type as PropTypeDocumentation).name === 'enum'

  const sortedProps = sortBy(documentation, document =>
    document.name.toLowerCase()
  )

  return (
    <Fragment>
      {sortedProps.map(
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
            <Table.Cell className={classes.name}>Name</Table.Cell>
            <Table.Cell className={classes.type}>Type</Table.Cell>
            <Table.Cell className={classes.defaultValue}>Default</Table.Cell>
            <Table.Cell className={classes.description}>Description</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>{renderRows(props)}</Table.Body>
      </Table>
    </div>
  )
}

PropsTable.displayName = 'PropsTable'

export default withStyles(styles)(PropsTable)
