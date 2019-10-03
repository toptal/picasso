/// <reference types="react" />
declare const useModals: () => {
    showModal: (modal: import("react").FunctionComponent<any>) => string;
    showPrompt: () => void;
    hideModal: (key: string) => void;
};
export { useModals };
