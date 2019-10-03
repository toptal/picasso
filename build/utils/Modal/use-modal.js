import { useEffect } from 'react';
import { useModal as useReactModalHook } from 'react-modal-hook';
const useModal = (component, inputs = []) => {
    useEffect(() => {
        window.console.warn('useModal hook is going to be deprecated in Picasso v4. Please, use useModals hook instead.');
    }, []);
    return useReactModalHook(component, inputs);
};
export { useModal };
//# sourceMappingURL=use-modal.js.map