import React, { Fragment } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Table, Typography, Tooltip } from '@toptal/picasso'
import { BaseProps } from '@toptal/picasso-shared'

import {
  PropDocumentation,
  PropTypeDocumentation,
  sortBy
} from '~/.storybook/utils'
import PropTypeTableCell from './PropTypeTableCell'
import EnumsList from './EnumsList'
import Description from './Description'
import styles from './styles'

interface Props extends BaseProps {
  documentation: PropDocumentation[]
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoPropsTable'
})

function useRows(props: Props): JSX.Element {
  const { documentation } = props
  const classes = useStyles()

  const isEnum = (type: string | PropTypeDocumentation) =>
    type === 'enum' || (type as PropTypeDocumentation).name === 'enum'

  const sortedProps = sortBy(documentation, document =>
    document.name.toLowerCase()
  )

  return (
    <Fragment>
      {sortedProps.map(
        ({
          name,
          type,
          defaultValue,
          description,
          enums,
          required,
          deprecated
        }) => {
          const propNameTypography = (
            <Typography weight='semibold' inline lineThrough={deprecated}>
              {name}
            </Typography>
          )
          const propName = deprecated ? (
            <Tooltip content={`${name} is deprecated`}>
              {propNameTypography}
            </Tooltip>
          ) : (
            propNameTypography
          )

          return (
            <Table.Row key={name}>
              <Table.Cell>
                {propName}
                {required && (
                  <Typography color='red' inline>
                    {' '}
                    *
                  </Typography>
                )}
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
        }
      )}
    </Fragment>
  )
}

const PropsTable = (props: Props) => {
  const classes = useStyles()

  const rows = useRows(props)

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
        <Table.Body>{rows}</Table.Body>
      </Table>
    </div>
  )
}

PropsTable.displayName = 'PropsTable'

export default PropsTable
