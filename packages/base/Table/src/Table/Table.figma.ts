// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=15437-2754
// source=https://github.com/toptal/picasso/blob/master/packages/base/Table/src/TableCompound/index.ts
// component=Table.Cell

import figma from 'figma'

export default {
  id: 'Table.Cell',
  imports: ["import { Table } from '@toptal/picasso'"],
  example: figma.code`<Table variant='bordered'>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell>Role</Table.Cell>
            <Table.Cell>Country</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Delia Floyd</Table.Cell>
            <Table.Cell>UX Lead</Table.Cell>
            <Table.Cell>United States</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>`,
} satisfies CodeConnectTemplate
