import React, { ReactNode } from 'react';
import { Props as PromptModalProps, PromptOptions } from '../../PromptModal/PromptModal';
export interface ShowPromptOptions extends Pick<PromptModalProps, 'onSubmit' | 'title' | 'message'>, Partial<Omit<PromptModalProps, 'children' | 'onSubmit' | 'title' | 'message'>> {
    content?: (promptOptions: PromptOptions) => ReactNode;
}
declare const useModals: () => {
    showModal: (modal: React.FunctionComponent<any>) => string;
    showPrompt: (options: ShowPromptOptions) => void;
    hideModal: (key: string) => void;
};
export { useModals };
