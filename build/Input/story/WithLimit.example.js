import React, { useState } from 'react';
import { Input, Container } from '@toptal/picasso';
const InputWithLimitExample = () => {
    const [value, setValue] = useState('Text');
    const [textAreaValue, setTextAreaValue] = useState('Text');
    const handleChange = event => {
        setValue(event.target.value);
    };
    const handleTextareaChange = event => {
        setTextAreaValue(event.target.value);
    };
    return (React.createElement(Container, { flex: true, direction: 'column' },
        React.createElement(Container, { bottom: 'small' },
            React.createElement(Input, { limit: 10, value: value, onChange: handleChange })),
        React.createElement(Container, null,
            React.createElement(Input, { limit: 10, multiline: true, rows: 4, value: textAreaValue, onChange: handleTextareaChange }))));
};
export default InputWithLimitExample;
//# sourceMappingURL=WithLimit.example.js.map