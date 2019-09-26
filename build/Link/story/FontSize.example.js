import React from 'react';
import { Link, Container, Typography } from '@toptal/picasso';
const FontSizeExample = () => {
    const handleClick = (e) => {
        e.preventDefault();
        window.alert('Click handled just before redirect');
    };
    return (React.createElement("div", null,
        React.createElement(Container, { inline: true, right: 'large' },
            React.createElement(Typography, null,
                "Please",
                ' ',
                React.createElement(Link, { onClick: handleClick, href: 'https://toptal.com' }, "verify"),
                ' ',
                "your email")),
        React.createElement(Container, { inline: true, right: 'large' },
            React.createElement(Typography, { variant: 'heading', size: 'large' },
                "Please",
                ' ',
                React.createElement(Link, { onClick: handleClick, href: 'https://toptal.com' }, "verify"),
                ' ',
                "your email"))));
};
export default FontSizeExample;
//# sourceMappingURL=FontSize.example.js.map