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
import { Button, Container } from '@toptal/picasso';
import { useNotifications } from '@toptal/picasso/utils';
import { useModals } from '@toptal/picasso/lab/utils';
const PromptModalDefaultExample = () => {
    const { showPrompt } = useModals();
    const { showInfo } = useNotifications();
    const handleDefaultClick = () => showPrompt({
        title: 'Default variant',
        message: 'This is default variant.',
        onSubmit: () => __awaiter(void 0, void 0, void 0, function* () { return showInfo('Submitted'); }),
        // for purpose of code example
        container: () => document.getElementById('modal-container')
    });
    const handleRedClick = () => showPrompt({
        title: 'Red variant',
        message: 'This is red variant.',
        variant: 'red',
        onSubmit: () => __awaiter(void 0, void 0, void 0, function* () { return showInfo('Submitted'); }),
        // for purpose of code example
        container: () => document.getElementById('modal-container')
    });
    const handleBlueClick = () => showPrompt({
        title: 'Blue variant',
        message: 'This is blue variant.',
        variant: 'blue',
        onSubmit: () => __awaiter(void 0, void 0, void 0, function* () { return showInfo('Submitted'); }),
        // for purpose of code example
        container: () => document.getElementById('modal-container')
    });
    const handleGreenClick = () => showPrompt({
        title: 'Green variant',
        message: 'This is green variant.',
        variant: 'green',
        onSubmit: () => showInfo('Submitted'),
        // for purpose of code example
        container: () => document.getElementById('modal-container')
    });
    return (React.createElement("div", { id: 'modal-container', style: { width: '400px', height: '50px' } },
        React.createElement(Container, { flex: true },
            React.createElement(Button, { onClick: () => handleDefaultClick() }, "Open default prompt"),
            React.createElement(Button, { onClick: () => handleRedClick() }, "Open red prompt"),
            React.createElement(Button, { onClick: () => handleBlueClick() }, "Open blue prompt"),
            React.createElement(Button, { onClick: () => handleGreenClick() }, "Open green prompt"))));
};
export default PromptModalDefaultExample;
//# sourceMappingURL=Variants.example.js.map