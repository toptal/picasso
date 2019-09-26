import React from 'react';
import { Link } from '@toptal/picasso';
import { BrowserRouter as Router, Link as RouterLink, Route, Switch } from 'react-router-dom';
const Index = () => {
    return React.createElement("h2", null, "Home");
};
const About = () => {
    return React.createElement("h2", null, "About");
};
const Users = () => {
    return React.createElement("h2", null, "Users");
};
const RoutingExample = () => (React.createElement(Router, null,
    React.createElement("div", null,
        React.createElement("nav", null,
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement(Link, { as: RouterLink, to: '/' }, "Home")),
                React.createElement("li", null,
                    React.createElement(Link, { as: RouterLink, to: '/about/' }, "About")),
                React.createElement("li", null,
                    React.createElement(Link, { as: RouterLink, to: '/users/' }, "Users")))),
        React.createElement(Switch, null,
            React.createElement(Route, { path: '/', exact: true, component: Index }),
            React.createElement(Route, { path: '/about/', component: About }),
            React.createElement(Route, { path: '/users/', component: Users }),
            React.createElement(Route, { component: Index })))));
export default RoutingExample;
//# sourceMappingURL=Routing.example.js.map