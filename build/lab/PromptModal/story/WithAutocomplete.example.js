var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState } from 'react';
import { Button } from '@toptal/picasso';
import { Autocomplete } from '@toptal/picasso/lab';
import { useNotifications, isSubstring } from '@toptal/picasso/utils';
import { useModals } from '@toptal/picasso/lab/utils';
const allOptions = [
    { text: 'Belarus', value: 'BY' },
    { text: 'Croatia', value: 'HR' },
    { text: 'Lithuania', value: 'LU' },
    { text: 'Slovakia', value: 'SK' },
    { text: 'Ukraine', value: 'UA' }
];
const EMPTY_INPUT_VALUE = '';
const getDisplayValue = (item) => (item ? item.text : EMPTY_INPUT_VALUE);
const filterOptions = (str) => str !== ''
    ? allOptions.filter(option => isSubstring(str, getDisplayValue(option)))
    : allOptions;
const PromptModalDefaultExample = () => {
    const { showPrompt } = useModals();
    const { showInfo } = useNotifications();
    const handleClick = () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, hide } = yield showPrompt('Country', 'Select country:', {
            // eslint-disable-next-line react/display-name
            children: ({ setResult }) => {
                const [value, setValue] = useState(EMPTY_INPUT_VALUE);
                const [options, setOptions] = useState(allOptions);
                return (React.createElement(Autocomplete, { value: value, width: 'full', getDisplayValue: getDisplayValue, placeholder: 'Start typing country...', options: options, onChange: value => {
                        setOptions(filterOptions(value));
                        setValue(value);
                    }, onSelect: item => setResult(item.value) }));
            },
            // for purpose of code example
            container: () => document.getElementById('modal-container')
        });
        showInfo(String(result));
        hide();
    });
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { id: 'modal-container', style: { width: '400px', height: '50px' } },
            React.createElement(Button, { onClick: handleClick }, "Open prompt"))));
};
export default PromptModalDefaultExample;
//# sourceMappingURL=WithAutocomplete.example.js.map