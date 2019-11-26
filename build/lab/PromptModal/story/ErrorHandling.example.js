import React from 'react';
import { Button, Input } from '@toptal/picasso';
import { useNotifications } from '@toptal/picasso/utils';
import { useModals } from '@toptal/picasso/lab/utils';
const PromptModalDefaultExample = () => {
    const { showPrompt } = useModals();
    const { showInfo, showError } = useNotifications();
    const handleClick = () => showPrompt({
        title: 'Email',
        message: 'Enter your email:',
        // eslint-disable-next-line react/display-name
        content: ({ setResult, result, error, setError }) => {
            const handleChange = (event) => {
                const { value } = event.target;
                if (!value) {
                    setError(true);
                }
                else {
                    setError(false);
                }
                setResult(value);
            };
            return (React.createElement(Input, { width: 'full', error: error, value: String(result), onChange: handleChange }));
        },
        onSubmit: result => {
            if (!result || result === '') {
                showError('Result cannot be empty');
                throw new Error('Result cannot be empty');
            }
            showInfo(String(result));
        },
        // for purpose of code example
        container: () => document.getElementById('modal-container')
    });
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { id: 'modal-container', style: { width: '400px', height: '50px' } },
            React.createElement(Button, { onClick: handleClick }, "Open prompt"))));
};
export default PromptModalDefaultExample;
//# sourceMappingURL=ErrorHandling.example.js.map