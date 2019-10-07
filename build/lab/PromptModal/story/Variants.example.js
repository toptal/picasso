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
    const handleDefaultClick = () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, hide } = yield showPrompt('Default variant', 'This is default variant.', {
            // for purpose of code example
            container: () => document.getElementById('modal-container')
        });
        hide();
        showInfo(String(result));
    });
    const handleRedClick = () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, hide } = yield showPrompt('Red variant', 'This is red variant.', {
            variant: 'red',
            // for purpose of code example
            container: () => document.getElementById('modal-container')
        });
        hide();
        showInfo(String(result));
    });
    const handleBlueClick = () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, hide } = yield showPrompt('Blue variant', 'This is blue variant.', {
            variant: 'blue',
            // for purpose of code example
            container: () => document.getElementById('modal-container')
        });
        hide();
        showInfo(String(result));
    });
    const handleGreenClick = () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, hide } = yield showPrompt('Green variant', 'This is green variant.', {
            variant: 'green',
            // for purpose of code example
            container: () => document.getElementById('modal-container')
        });
        hide();
        window.alert(result);
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