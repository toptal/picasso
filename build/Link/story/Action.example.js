import React from 'react';
import { Link } from '@toptal/picasso';
const ActionLinkExample = () => {
    const handleClick = () => {
        window.alert('Action is invoked!');
    };
    return (React.createElement("div", null,
        React.createElement(Link, { variant: 'action', onClick: handleClick }, "This is an action link!")));
};
export default ActionLinkExample;
//# sourceMappingURL=Action.example.js.map