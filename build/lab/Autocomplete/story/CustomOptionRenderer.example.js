import React from 'react';
import { Autocomplete } from '@toptal/picasso/lab';
import { Typography, Container } from '@toptal/picasso';
const options = [
    { text: 'Belarus', value: 'BY', capital: 'Minsk' },
    { text: 'Croatia', value: 'HR', capital: 'Zagreb' },
    { text: 'Lithuania', value: 'LU', capital: 'Vilnius' },
    { text: 'Slovakia', value: 'SK', capital: 'Bratislava' },
    { text: 'Ukraine', value: 'UA', capital: 'Kyiv' }
];
const CustomOptionRenderer = () => (React.createElement("div", null,
    React.createElement(Autocomplete, { placeholder: 'Start typing country...', options: options, renderOption: (option, index) => (React.createElement(Container, null,
            React.createElement(Typography, { size: 'medium', weight: 'semibold' }, option.text),
            React.createElement(Typography, { size: 'inherit', style: { fontSize: '12px' } },
                option.capital,
                " (",
                index,
                ")"))) })));
export default CustomOptionRenderer;
//# sourceMappingURL=CustomOptionRenderer.example.js.map