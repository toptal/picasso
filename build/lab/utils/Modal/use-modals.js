var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useContext } from 'react';
import { ModalContext } from 'react-modal-hook';
import PromptModal from '../../PromptModal';
const isFunctionalComponent = (Component) => {
    const prototype = Component.prototype;
    return !prototype || !prototype.isReactComponent;
};
const generateModalKey = (() => {
    let count = 0;
    return () => `${++count}`;
})();
const useModals = () => {
    const context = useContext(ModalContext);
    const hideModal = (key) => {
        context.hideModal(key);
    };
    const showModal = (modal) => {
        if (!isFunctionalComponent(modal)) {
            throw new Error('Only stateless components can be used as an argument to useModal. You have probably passed a class component where a function was expected.');
        }
        const key = generateModalKey();
        context.showModal(key, modal);
        return key;
    };
    const showPrompt = (options) => {
        const { content, onSubmit, onCancel, onClose } = options, restOptions = __rest(options, ["content", "onSubmit", "onCancel", "onClose"]);
        const handleSubmit = (result) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield onSubmit(result);
                hideModal(modalId);
            }
            catch (err) {
                throw err;
            }
        });
        const handleCancel = () => {
            if (onCancel) {
                onCancel();
            }
            hideModal(modalId);
        };
        const handleClose = () => {
            if (onClose) {
                onClose();
            }
            hideModal(modalId);
        };
        const modalId = showModal(() => (React.createElement(PromptModal, Object.assign({ open: true, onSubmit: handleSubmit, onCancel: handleCancel, onClose: handleClose }, restOptions), content)));
    };
    return {
        showModal,
        showPrompt,
        hideModal
    };
};
export { useModals };
//# sourceMappingURL=use-modals.js.map