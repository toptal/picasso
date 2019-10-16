import React from 'react';
import { Form, Grid, Input, Typography } from '@toptal/picasso';
import { Autocomplete } from '@toptal/picasso/lab';
const options = [
    { text: 'Belarus', value: 'BY' },
    { text: 'Croatia', value: 'HR' },
    { text: 'Lithuania', value: 'LU' },
    { text: 'Slovakia', value: 'SK' },
    { text: 'Ukraine', value: 'UA' }
];
const AutofillExample = () => (React.createElement(Grid, null,
    React.createElement(Grid.Item, { small: 5 },
        React.createElement(Typography, { variant: 'heading' }, "Autofill enabled for country"),
        React.createElement(Form, null,
            React.createElement(Form.Field, null,
                React.createElement(Form.Label, null, "Address"),
                React.createElement(Input, { name: 'ship-address', width: 'full', autoComplete: 'shipping street-address', placeholder: '123 Any Street' })),
            React.createElement(Form.Field, null,
                React.createElement(Form.Label, null, "City"),
                React.createElement(Input, { placeholder: 'New York', name: 'ship-city', autoComplete: 'shipping locality', width: 'full' })),
            React.createElement(Form.Field, null,
                React.createElement(Form.Label, null, "Zip"),
                React.createElement(Input, { name: 'ship-zip', autoComplete: 'shipping postal-code', width: 'full', placeholder: '10011' })),
            React.createElement(Form.Field, null,
                React.createElement(Form.Label, null, "Country"),
                React.createElement(Autocomplete, { options: options, width: 'full', name: 'country', autoComplete: 'shipping country-name', placeholder: 'USA', enableAutofill: true })))),
    React.createElement(Grid.Item, { small: 5 },
        React.createElement(Typography, { variant: 'heading' }, "Autofill disabled for country"),
        React.createElement(Form, null,
            React.createElement(Form.Field, null,
                React.createElement(Form.Label, null, "Address"),
                React.createElement(Input, { name: 'ship-address', width: 'full', autoComplete: 'shipping street-address', placeholder: '123 Any Street' })),
            React.createElement(Form.Field, null,
                React.createElement(Form.Label, null, "City"),
                React.createElement(Input, { placeholder: 'New York', name: 'ship-city', autoComplete: 'shipping locality', width: 'full' })),
            React.createElement(Form.Field, null,
                React.createElement(Form.Label, null, "Zip"),
                React.createElement(Input, { name: 'ship-zip', autoComplete: 'shipping postal-code', width: 'full', placeholder: '10011' })),
            React.createElement(Form.Field, null,
                React.createElement(Form.Label, null, "Country"),
                React.createElement(Autocomplete, { options: options, width: 'full', name: 'country', autoComplete: 'shipping country-name', placeholder: 'USA' }))))));
export default AutofillExample;
//# sourceMappingURL=Autofill.example.js.map