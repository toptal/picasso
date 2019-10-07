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
    const showPrompt = (title, message, options = {}) => {
        const { children } = options;
        const hasChildren = Boolean(children);
        return new Promise(resolve => {
            const handleSubmit = (result, setLoading) => {
                const resultOptions = {
                    setLoading,
                    hide: () => hideModal(modalId)
                };
                resolve(hasChildren
                    ? Object.assign({ result }, resultOptions) : Object.assign({ result: true }, resultOptions));
            };
            const handleClose = () => {
                resolve({ result: false, hide: () => hideModal(modalId) });
            };
            const modalId = showModal(() => (React.createElement(PromptModal, Object.assign({ open: true, title: title, message: message, onSubmit: handleSubmit, onCancel: handleClose, onClose: handleClose }, options), children)));
        });
    };
    return {
        showModal,
        showPrompt,
        hideModal
    };
};
export { useModals };
//# sourceMappingURL=use-modals.js.map