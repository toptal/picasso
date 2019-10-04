import React from 'react';
import { DatePicker } from '@toptal/picasso/lab';
const RangeExample = () => {
    return (React.createElement("div", { style: { height: '50vh' } },
        React.createElement(DatePicker, { range: true, onSelect: (dates) => {
                const [start, end] = dates;
                // eslint-disable-next-line no-console
                console.log('start date', start);
                // eslint-disable-next-line no-console
                console.log('end date', end);
            } })));
};
export default RangeExample;
//# sourceMappingURL=Range.example.js.map