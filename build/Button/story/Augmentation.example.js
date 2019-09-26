import React from 'react';
import { Button, Link } from '@toptal/picasso';
import { Settings16 } from '@toptal/picasso/Icon';
const ButtonAugmentationExample = () => (React.createElement("div", null,
    React.createElement(Button, { as: Link, href: '/#home' }, "Link"),
    React.createElement(Button, { as: Link, href: '/#home', icon: React.createElement(Settings16, null) }, "Link"),
    React.createElement(Button, { as: Link, href: '/#home', variant: 'secondary-red' }, "Link"),
    React.createElement(Button, { as: Link, href: '/#home', disabled: true }, "Link"),
    React.createElement(Button, { as: Link, href: '/#home', loading: true }, "Link")));
export default ButtonAugmentationExample;
//# sourceMappingURL=Augmentation.example.js.map