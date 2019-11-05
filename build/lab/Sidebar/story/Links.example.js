import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { Sidebar, Logo } from '@toptal/picasso';
import { Jobs16, Overview16, Candidates16, Team16, Participants16, Billing16 } from '@toptal/picasso/Icon';
const SidebarDefaultExample = () => (React.createElement(BrowserRouter, null,
    React.createElement(Sidebar, null,
        React.createElement(Sidebar.Logo, null,
            React.createElement(Logo, null)),
        React.createElement(Sidebar.Menu, null,
            React.createElement(Sidebar.Item, { icon: React.createElement(Overview16, null), as: Link, to: '/#overview', selected: true }, "Overview"),
            React.createElement(Sidebar.Item, { icon: React.createElement(Jobs16, null), as: Link, to: '/#jobs' }, "Jobs"),
            React.createElement(Sidebar.Item, { icon: React.createElement(Candidates16, null), as: Link, to: '/#candidates' }, "Candidates"),
            React.createElement(Sidebar.Item, { icon: React.createElement(Team16, null), as: Link, to: '/#team' }, "Team"),
            React.createElement(Sidebar.Item, { icon: React.createElement(Participants16, null), as: Link, to: '/#users' }, "Users"),
            React.createElement(Sidebar.Item, { icon: React.createElement(Billing16, null), as: Link, to: '/#billing', disabled: true }, "Billing")))));
export default SidebarDefaultExample;
//# sourceMappingURL=Links.example.js.map