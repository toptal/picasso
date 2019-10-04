import React from 'react';
import { DatePicker } from '@toptal/picasso/lab';
const DefaultExample = () => {
    return (React.createElement("div", { style: { height: '50vh' } },
        React.createElement(DatePicker, { onSelect: (date) => {
                /* eslint-disable-next-line no-console */
                console.log('selected date is: ', date);
            } })));
};
export default DefaultExample;
//# sourceMappingURL=Default.example.js.map