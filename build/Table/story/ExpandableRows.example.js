import React, { useState } from 'react';
import styled from 'styled-components';
import { Table, Checkbox, Button, Tabs, UserBadge, Typography, Label, Container } from '@toptal/picasso';
import { Star16, ArrowDownMinor16, More16 } from '@toptal/picasso/Icon';
const StyledArrowDownMinor16 = styled(ArrowDownMinor16) `
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transform: rotate(
    ${(props) => props.expanded ? '180deg' : '0deg'}
  );
`;
const ExpandableContent = () => (React.createElement(React.Fragment, null,
    React.createElement(Tabs, { value: 1 },
        React.createElement(Tabs.Tab, { label: 'Job' }),
        React.createElement(Tabs.Tab, { label: 'Company' }),
        React.createElement(Tabs.Tab, { label: 'Task Details' })),
    React.createElement(Container, { flex: true, direction: 'row', alignItems: 'center', justifyContent: 'space-between', top: 'medium', bottom: 'medium' },
        React.createElement(UserBadge, { name: 'Jacqueline Roque', avatar: './jacqueline-with-flowers-1954-square.jpg' },
            React.createElement(Typography, { size: 'small' }, "UI specialist")),
        React.createElement(Container, null,
            React.createElement(Button, { variant: 'secondary-blue', size: 'small' }, "Q & A"),
            React.createElement(Button, { variant: 'secondary-blue', size: 'small' }, "Timeline"),
            React.createElement(Button, { size: 'small' }, "Contact Company"),
            React.createElement(Button, { circular: true, variant: 'flat', size: 'small', icon: React.createElement(More16, null) }))),
    React.createElement(Container, { top: 'small' },
        React.createElement(Label, null, "$2k Design Credit"))));
const TableExpandableRowsExample = () => {
    const [expandedData, setExpandedData] = useState({});
    const handleExpandClick = (id) => {
        const expanded = expandedData[id];
        setExpandedData(Object.assign(Object.assign({}, expandedData), { [id]: !expanded }));
    };
    return (React.createElement(Table, null,
        React.createElement(Table.Head, null,
            React.createElement(Table.Row, null,
                React.createElement(Table.Cell, null),
                React.createElement(Table.Cell, null, "Tasks"),
                React.createElement(Table.Cell, null, "Related to"),
                React.createElement(Table.Cell, null, "Time"),
                React.createElement(Table.Cell, { align: 'center' }, "Assignee"),
                React.createElement(Table.Cell, { align: 'center' }, "Actions"))),
        React.createElement(Table.Body, null, data.map(({ id, task, relatedTo, time, assignee }) => (React.createElement(Table.ExpandableRow, { key: id, content: React.createElement(ExpandableContent, null), expanded: expandedData[id] },
            React.createElement(Table.Cell, null,
                React.createElement(Checkbox, null)),
            React.createElement(Table.Cell, null, task),
            React.createElement(Table.Cell, null, relatedTo),
            React.createElement(Table.Cell, null, time),
            React.createElement(Table.Cell, { align: 'center' }, assignee),
            React.createElement(Table.Cell, { align: 'center' },
                React.createElement(Button, { circular: true, variant: 'flat', size: 'small', icon: React.createElement(Star16, null) }),
                React.createElement(Button, { circular: true, variant: 'flat', size: 'small', icon: React.createElement(StyledArrowDownMinor16, { expanded: expandedData[id] }), "data-testid": `expand-button-${id}`, onClick: () => handleExpandClick(id) }))))))));
};
const data = [
    {
        id: 0,
        task: "Invoice the client for half of Sanin's time...",
        relatedTo: 'Passionate PHP Dev...',
        time: '2:19 PM',
        assignee: 'AD',
        expanded: false
    },
    {
        id: 1,
        task: 'BUG: try to edit skills in profile',
        relatedTo: 'Ardelia Conn',
        time: '3:27 PM',
        assignee: 'AD',
        expanded: false
    },
    {
        id: 2,
        task: 'Assign attendee to scheduled meeting',
        relatedTo: 'Mariel Ankunding',
        time: '1:27 PM',
        assignee: 'AD',
        expanded: false
    },
    {
        id: 3,
        task: 'Conquer The World',
        relatedTo: 'Hye Schmeler',
        time: '7:46 PM',
        assignee: 'AD',
        expanded: false
    }
];
export default TableExpandableRowsExample;
//# sourceMappingURL=ExpandableRows.example.js.map