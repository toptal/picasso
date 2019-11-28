import React, { InputHTMLAttributes, KeyboardEvent, ReactNode, ComponentType } from 'react';
import { StandardProps } from '../../Picasso';
import { Props as InputProps } from '../../Input';
import { Item } from './types';
export interface Props extends StandardProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'value' | 'onChange' | 'onSelect' | 'onKeyDown'> {
    /**  Callback invoked when `input` element value is changed */
    onChange?: (value: string) => void;
    /** The value of the selected option, required for a controlled component. */
    value: string;
    /**  Callback invoked when selection changes */
    onSelect?: (item: Item) => void;
    /**  Callback invoked when other option selected */
    onOtherOptionSelect?: (item: Item) => void;
    /** Placeholder for value */
    placeholder?: string;
    /** Text prefix for other option */
    otherOptionText?: string;
    /** Width of the component */
    width?: 'full' | 'shrink' | 'auto';
    /** Shows the loading icon when options are loading */
    loading?: boolean;
    /** Allow to show the other option in the list of options */
    showOtherOption?: boolean;
    /** Label to show when no options were found */
    noOptionsText?: string;
    /** List of options */
    options?: Item[];
    /** A function that takes a display value from the option item */
    getDisplayValue?: (item: Item | null) => string;
    /**  Callback invoked when key is pressed */
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>, inputValue: string) => void;
    /** ReactNode for labels that will be used as start InputAdornment - */
    startAdornment?: ReactNode;
    /** ReactNode for labels that will be used as end InputAdornment - */
    endAdornment?: ReactNode;
    /** Indicate whether `Input` is in error state */
    error?: boolean;
    /** Specify icon which should be rendered inside Input */
    icon?: ReactNode;
    /** Custom input component */
    inputComponent?: ComponentType<InputProps>;
    /** Callback responsible for rendering the option given the option and its index in the list of options */
    renderOption?: (option: Item, index?: number) => ReactNode;
    /** Specifies whether the autofill enabled or not, disabled by default */
    enableAutofill?: boolean;
}
export declare const Autocomplete: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLInputElement>>;
declare const _default: React.ComponentType<Pick<Props & React.RefAttributes<HTMLInputElement>, "color" | "height" | "translate" | "width" | "hidden" | "size" | "style" | "icon" | "multiple" | "disabled" | "children" | "form" | "title" | "pattern" | "ref" | "error" | "dir" | "slot" | "checked" | "required" | "value" | "defaultChecked" | "suppressContentEditableWarning" | "suppressHydrationWarning" | "accessKey" | "className" | "contentEditable" | "contextMenu" | "draggable" | "id" | "lang" | "placeholder" | "spellCheck" | "tabIndex" | "radioGroup" | "role" | "about" | "datatype" | "inlist" | "prefix" | "property" | "resource" | "typeof" | "vocab" | "autoCapitalize" | "autoCorrect" | "autoSave" | "itemProp" | "itemScope" | "itemType" | "itemID" | "itemRef" | "results" | "security" | "unselectable" | "inputMode" | "is" | "aria-activedescendant" | "aria-atomic" | "aria-autocomplete" | "aria-busy" | "aria-checked" | "aria-colcount" | "aria-colindex" | "aria-colspan" | "aria-controls" | "aria-current" | "aria-describedby" | "aria-details" | "aria-disabled" | "aria-dropeffect" | "aria-errormessage" | "aria-expanded" | "aria-flowto" | "aria-grabbed" | "aria-haspopup" | "aria-hidden" | "aria-invalid" | "aria-keyshortcuts" | "aria-label" | "aria-labelledby" | "aria-level" | "aria-live" | "aria-modal" | "aria-multiline" | "aria-multiselectable" | "aria-orientation" | "aria-owns" | "aria-placeholder" | "aria-posinset" | "aria-pressed" | "aria-readonly" | "aria-relevant" | "aria-required" | "aria-roledescription" | "aria-rowcount" | "aria-rowindex" | "aria-rowspan" | "aria-selected" | "aria-setsize" | "aria-sort" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "dangerouslySetInnerHTML" | "onCopy" | "onCopyCapture" | "onCut" | "onCutCapture" | "onPaste" | "onPasteCapture" | "onCompositionEnd" | "onCompositionEndCapture" | "onCompositionStart" | "onCompositionStartCapture" | "onCompositionUpdate" | "onCompositionUpdateCapture" | "onFocus" | "onFocusCapture" | "onBlur" | "onBlurCapture" | "onChange" | "onChangeCapture" | "onBeforeInput" | "onBeforeInputCapture" | "onInput" | "onInputCapture" | "onReset" | "onResetCapture" | "onSubmit" | "onSubmitCapture" | "onInvalid" | "onInvalidCapture" | "onLoad" | "onLoadCapture" | "onError" | "onErrorCapture" | "onKeyDown" | "onKeyDownCapture" | "onKeyPress" | "onKeyPressCapture" | "onKeyUp" | "onKeyUpCapture" | "onAbort" | "onAbortCapture" | "onCanPlay" | "onCanPlayCapture" | "onCanPlayThrough" | "onCanPlayThroughCapture" | "onDurationChange" | "onDurationChangeCapture" | "onEmptied" | "onEmptiedCapture" | "onEncrypted" | "onEncryptedCapture" | "onEnded" | "onEndedCapture" | "onLoadedData" | "onLoadedDataCapture" | "onLoadedMetadata" | "onLoadedMetadataCapture" | "onLoadStart" | "onLoadStartCapture" | "onPause" | "onPauseCapture" | "onPlay" | "onPlayCapture" | "onPlaying" | "onPlayingCapture" | "onProgress" | "onProgressCapture" | "onRateChange" | "onRateChangeCapture" | "onSeeked" | "onSeekedCapture" | "onSeeking" | "onSeekingCapture" | "onStalled" | "onStalledCapture" | "onSuspend" | "onSuspendCapture" | "onTimeUpdate" | "onTimeUpdateCapture" | "onVolumeChange" | "onVolumeChangeCapture" | "onWaiting" | "onWaitingCapture" | "onAuxClick" | "onAuxClickCapture" | "onClick" | "onClickCapture" | "onContextMenu" | "onContextMenuCapture" | "onDoubleClick" | "onDoubleClickCapture" | "onDrag" | "onDragCapture" | "onDragEnd" | "onDragEndCapture" | "onDragEnter" | "onDragEnterCapture" | "onDragExit" | "onDragExitCapture" | "onDragLeave" | "onDragLeaveCapture" | "onDragOver" | "onDragOverCapture" | "onDragStart" | "onDragStartCapture" | "onDrop" | "onDropCapture" | "onMouseDown" | "onMouseDownCapture" | "onMouseEnter" | "onMouseLeave" | "onMouseMove" | "onMouseMoveCapture" | "onMouseOut" | "onMouseOutCapture" | "onMouseOver" | "onMouseOverCapture" | "onMouseUp" | "onMouseUpCapture" | "onSelect" | "onSelectCapture" | "onTouchCancel" | "onTouchCancelCapture" | "onTouchEnd" | "onTouchEndCapture" | "onTouchMove" | "onTouchMoveCapture" | "onTouchStart" | "onTouchStartCapture" | "onPointerDown" | "onPointerDownCapture" | "onPointerMove" | "onPointerMoveCapture" | "onPointerUp" | "onPointerUpCapture" | "onPointerCancel" | "onPointerCancelCapture" | "onPointerEnter" | "onPointerEnterCapture" | "onPointerLeave" | "onPointerLeaveCapture" | "onPointerOver" | "onPointerOverCapture" | "onPointerOut" | "onPointerOutCapture" | "onGotPointerCapture" | "onGotPointerCaptureCapture" | "onLostPointerCapture" | "onLostPointerCaptureCapture" | "onScroll" | "onScrollCapture" | "onWheel" | "onWheelCapture" | "onAnimationStart" | "onAnimationStartCapture" | "onAnimationEnd" | "onAnimationEndCapture" | "onAnimationIteration" | "onAnimationIterationCapture" | "onTransitionEnd" | "onTransitionEndCapture" | "list" | "step" | "key" | "alt" | "src" | "type" | "autoFocus" | "formAction" | "formEncType" | "formMethod" | "formNoValidate" | "formTarget" | "name" | "autoComplete" | "endAdornment" | "inputComponent" | "readOnly" | "startAdornment" | "crossOrigin" | "max" | "min" | "maxLength" | "minLength" | "accept" | "capture" | "loading" | "noOptionsText" | "options" | "enableAutofill" | "getDisplayValue" | "onOtherOptionSelect" | "otherOptionText" | "showOtherOption" | "renderOption"> & import("@material-ui/core/styles").StyledComponentProps<"root" | "popper" | "stringContent" | "rootFull" | "rootShrink" | "rootAuto" | "otherOption">>;
export default _default;
