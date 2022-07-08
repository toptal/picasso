import React, { Fragment, FunctionComponent } from 'react'
import { styled } from '@mui/material/styles'
import { Table, Typography, Tooltip } from '@toptal/picasso'
import { BaseProps } from '@toptal/picasso-shared'

import {
  PropDocumentation,
  PropTypeDocumentation,
  sortBy,
} from '~/.storybook/utils'
import PropTypeTableCell from './PropTypeTableCell'
import EnumsList from './EnumsList'
import Description from './Description'

const StyledPropTypeTableCell = styled(PropTypeTableCell)(() => ({
  whiteSpace: 'nowrap',
}))

const DefaultValueCell = styled(Table.Cell)(() => ({
  whiteSpace: 'nowrap',
}))

const Highlight = styled('span')(() => ({
  backgroundColor: 'rgb(236, 236, 236, 0.5)',
  borderRadius: '0.4em',
  padding: '0.3em 0.7em',
  fontWeight: 600,
}))

const DescriptionCell = styled(Table.Cell)(() => ({
  paddingTop: '1em',
  paddingBottom: '1em',
}))

const Root = styled('div')(() => ({
  width: '100%',
}))

const StyledTable = styled(Table)(() => ({
  width: '100%',
}))

const StyledName = styled(Table.Cell)(() => ({
  width: '100px',
}))

const StyledType = styled(Table.Cell)(() => ({
  width: '1%',
}))

const StyledDefaultValue = styled(Table.Cell)(() => ({
  width: '1%',
}))

const StyledDescription = styled(Table.Cell)(() => ({
  width: '100%',
}))

interface Props extends BaseProps {
  documentation: PropDocumentation[]
}

function useRows(props: Props): JSX.Element {
  const { documentation } = props

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
          deprecated,
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
              <StyledPropTypeTableCell type={type} />
              <DefaultValueCell>
                {defaultValue && <Highlight>{defaultValue}</Highlight>}
              </DefaultValueCell>
              <DescriptionCell>
                <Description description={description} propName={name} />
                {isEnum(type) && <EnumsList type={type} enums={enums} />}
              </DescriptionCell>
            </Table.Row>
          )
        }
      )}
    </Fragment>
  )
}

const PropsTable: FunctionComponent<Props> = props => {
  const rows = useRows(props)

  return (
    <Root>
      <StyledTable>
        <Table.Head>
          <Table.Row>
            <StyledName>Name</StyledName>
            <StyledType>Type</StyledType>
            <StyledDefaultValue>Default</StyledDefaultValue>
            <StyledDescription>Description</StyledDescription>
          </Table.Row>
        </Table.Head>
        <Table.Body>{rows}</Table.Body>
      </StyledTable>
    </Root>
  )
}

PropsTable.displayName = 'PropsTable'

export default PropsTable
