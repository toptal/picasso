import React from 'react';
import { Tooltip, Button, Container } from '@toptal/picasso';
const TooltipControlListenersExample = () => {
    return (React.createElement("div", { style: { textAlign: 'center' } },
        React.createElement(Container, { top: 'large', bottom: 'large', left: 'large', right: 'large', inline: true },
            React.createElement(Tooltip, { content: 'Some content...', placement: 'top' },
                React.createElement("span", null,
                    React.createElement(Button, { disabled: true }, "Hover"))))));
};
export default TooltipControlListenersExample;
//# sourceMappingURL=DisabledElement.example.js.map