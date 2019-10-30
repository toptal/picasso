import React, { useState } from 'react';
import { Tooltip, Button, Container } from '@toptal/picasso';
const TooltipControlListenersExample = () => {
    const [listenersEnabled, setListenersEnabled] = useState(true);
    const enableListeners = () => setListenersEnabled(true);
    const disableListeners = () => setListenersEnabled(false);
    const toggleListeners = () => {
        if (listenersEnabled) {
            disableListeners();
        }
        else {
            enableListeners();
        }
    };
    return (React.createElement("div", { style: { textAlign: 'center' } },
        React.createElement(Button, { variant: 'flat', onClick: toggleListeners },
            listenersEnabled ? 'Disable' : 'Enable',
            " listeners"),
        React.createElement(Container, { top: 'large', bottom: 'large', left: 'large', right: 'large', inline: true },
            React.createElement(Tooltip, { disableListeners: !listenersEnabled, content: 'Some content...', placement: 'top' },
                React.createElement(Button, null, "Hover")))));
};
export default TooltipControlListenersExample;
//# sourceMappingURL=ControlListeners.example.js.map