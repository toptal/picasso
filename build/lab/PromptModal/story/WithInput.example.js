var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'react';
import { Button, Input } from '@toptal/picasso';
import { useNotifications } from '@toptal/picasso/utils';
import { useModals } from '@toptal/picasso/lab/utils';
const PromptModalDefaultExample = () => {
    const { showPrompt } = useModals();
    const { showInfo } = useNotifications();
    const handleClick = () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, hide } = yield showPrompt('Email', 'Enter your email:', {
            // eslint-disable-next-line react/display-name
            children: ({ setResult, result }) => (React.createElement(Input, { width: 'full', onChange: event => setResult(event.target.value), value: result })),
            // for purpose of code example
            container: () => document.getElementById('modal-container')
        });
        hide();
        showInfo(String(result));
    });
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { id: 'modal-container', style: { width: '400px', height: '50px' } },
            React.createElement(Button, { onClick: handleClick }, "Open prompt"))));
};
export default PromptModalDefaultExample;
//# sourceMappingURL=WithInput.example.js.map