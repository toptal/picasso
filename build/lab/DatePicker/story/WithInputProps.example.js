import React from 'react';
import { DatePicker } from '@toptal/picasso/lab';
import { Search16 } from '@toptal/picasso';
const WithInputPropsExample = () => {
    return (React.createElement("div", { style: { height: '50vh', width: '100%' } },
        React.createElement(DatePicker, { icon: React.createElement(Search16, null), iconPosition: 'end', width: 'full', placeholder: 'Please select date...', onSelect: (date) => {
                /* eslint-disable-next-line no-console */
                console.log('selected date is: ', date);
            } })));
};
export default WithInputPropsExample;
//# sourceMappingURL=WithInputProps.example.js.map