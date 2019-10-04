import React from 'react';
import { DatePicker } from '@toptal/picasso/lab';
const ControlledExample = () => {
    return (React.createElement("div", { style: { height: '50vh' } },
        React.createElement(DatePicker, { value: new Date(2019, 10, 10), onSelect: (date) => {
                /* eslint-disable-next-line no-console */
                console.log('selected date is: ', date);
            } })));
};
export default ControlledExample;
//# sourceMappingURL=InitialValue.example.js.map