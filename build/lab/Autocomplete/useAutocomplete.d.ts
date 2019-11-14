import { KeyboardEvent, ChangeEvent } from 'react';
import { Item } from './types';
export declare const FIRST_ITEM_INDEX = 0;
export declare const EMPTY_INPUT_VALUE = "";
export declare const getAutocompletePropValue: (enableAutofill: boolean | undefined, autoComplete: string | undefined) => string | undefined;
interface Props {
    value: string;
    options?: Item[];
    enableAutofill?: boolean;
    autoComplete?: string;
    onSelect?: (item: Item) => void;
    onChange?: (value: string) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>, inputValue: string) => void;
    getDisplayValue: (item: Item | null) => string;
}
declare const useAutocomplete: ({ value, options, enableAutofill, autoComplete, onChange, onKeyDown, onSelect, getDisplayValue }: Props) => {
    getItemProps: (index: number, item: Item) => {
        role: string;
        'aria-selected': boolean;
        selected: boolean;
        onMouseMove: () => void;
        onMouseDown: (event: import("react").MouseEvent<Element, MouseEvent>) => void;
        onClick: () => void;
    };
    getInputProps: () => {
        'aria-autocomplete': "both" | "none" | "inline" | "list" | undefined;
        autoComplete: string | undefined;
        onFocus: () => void;
        onClick: () => void;
        onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
        onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
        onBlur: () => void;
    };
    isOpen: boolean;
    highlightedIndex: number | null;
};
export default useAutocomplete;
