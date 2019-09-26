import React from 'react';
import { Link, Container } from '@toptal/picasso';
const UnderlineLinkExample = () => (React.createElement("div", null,
    React.createElement(Container, { inline: true, right: 'large' },
        React.createElement(Link, { href: 'https://toptal.com', underline: 'none' }, "Link with `underline: none`")),
    React.createElement(Container, { inline: true, right: 'large' },
        React.createElement(Link, { href: 'https://toptal.com', underline: 'hover' }, "Link with `underline: hover`")),
    React.createElement(Container, { inline: true },
        React.createElement(Link, { href: 'https://toptal.com', underline: 'always' }, "Link with `underline: always`"))));
export default UnderlineLinkExample;
//# sourceMappingURL=Underline.example.js.map