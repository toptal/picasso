import React from 'react';
import { Button, Input } from '@toptal/picasso';
import { useNotifications } from '@toptal/picasso/utils';
import { useModals } from '@toptal/picasso/lab/utils';
const PromptModalDefaultExample = () => {
    const { showPrompt } = useModals();
    const { showInfo } = useNotifications();
    const handleClick = () => showPrompt({
        title: 'Email',
        message: 'Enter your email:',
        // eslint-disable-next-line react/display-name
        content: ({ setResult, result }) => (React.createElement(Input, { width: 'full', onChange: event => setResult(event.target.value), value: result })),
        onSubmit: (result) => showInfo(String(result)),
        // for purpose of code example
        container: () => document.getElementById('modal-container')
    });
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { id: 'modal-container', style: { width: '400px', height: '50px' } },
            React.createElement(Button, { onClick: handleClick }, "Open prompt"))));
};
export default PromptModalDefaultExample;
//# sourceMappingURL=WithInput.example.js.map