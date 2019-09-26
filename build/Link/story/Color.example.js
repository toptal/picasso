import React from 'react';
import { Container, Link } from '@toptal/picasso';
import { palette } from '@toptal/picasso/utils';
const ColorLinkExample = () => (React.createElement("div", null,
    React.createElement(Container, { inline: true, right: 'large' },
        React.createElement(Link, { href: window.parent.location.href + '#' }, "Blue Link")),
    React.createElement(Container, { inline: true, right: 'large' },
        React.createElement(Link, { color: 'black', href: window.parent.location.href + '#' }, "Black Link")),
    React.createElement(Container, { inline: true, style: { backgroundColor: palette.grey.darker }, padded: 'medium' },
        React.createElement(Link, { color: 'white', href: window.parent.location.href + '#' }, "White Link"))));
export default ColorLinkExample;
//# sourceMappingURL=Color.example.js.map