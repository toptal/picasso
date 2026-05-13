"use strict";
(globalThis["webpackChunk_toptal_picasso_root"] = globalThis["webpackChunk_toptal_picasso_root"] || []).push([[395],{

/***/ "./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/LexicalEditor/LexicalEditor.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ LexicalEditor_LexicalEditor)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("./node_modules/react/index.js");
// EXTERNAL MODULE: ./node_modules/@lexical/html/LexicalHtml.js
var LexicalHtml = __webpack_require__("./node_modules/@lexical/html/LexicalHtml.js");
// EXTERNAL MODULE: ./node_modules/@lexical/list/LexicalList.js
var LexicalList = __webpack_require__("./node_modules/@lexical/list/LexicalList.js");
// EXTERNAL MODULE: ./node_modules/@lexical/react/LexicalAutoFocusPlugin.js
var LexicalAutoFocusPlugin = __webpack_require__("./node_modules/@lexical/react/LexicalAutoFocusPlugin.js");
// EXTERNAL MODULE: ./node_modules/@lexical/react/LexicalComposer.js
var LexicalComposer = __webpack_require__("./node_modules/@lexical/react/LexicalComposer.js");
// EXTERNAL MODULE: ./node_modules/@lexical/react/LexicalContentEditable.js
var LexicalContentEditable = __webpack_require__("./node_modules/@lexical/react/LexicalContentEditable.js");
// EXTERNAL MODULE: ./node_modules/@lexical/react/LexicalErrorBoundary.js
var LexicalErrorBoundary = __webpack_require__("./node_modules/@lexical/react/LexicalErrorBoundary.js");
var LexicalErrorBoundary_default = /*#__PURE__*/__webpack_require__.n(LexicalErrorBoundary);
// EXTERNAL MODULE: ./node_modules/@lexical/react/LexicalHistoryPlugin.js
var LexicalHistoryPlugin = __webpack_require__("./node_modules/@lexical/react/LexicalHistoryPlugin.js");
// EXTERNAL MODULE: ./node_modules/@lexical/react/LexicalOnChangePlugin.js
var LexicalOnChangePlugin = __webpack_require__("./node_modules/@lexical/react/LexicalOnChangePlugin.js");
// EXTERNAL MODULE: ./node_modules/@lexical/react/LexicalRichTextPlugin.js
var LexicalRichTextPlugin = __webpack_require__("./node_modules/@lexical/react/LexicalRichTextPlugin.js");
// EXTERNAL MODULE: ./node_modules/@lexical/rich-text/LexicalRichText.js
var LexicalRichText = __webpack_require__("./node_modules/@lexical/rich-text/LexicalRichText.js");
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/makeStyles.js
var makeStyles = __webpack_require__("./node_modules/@material-ui/core/esm/styles/makeStyles.js");
// EXTERNAL MODULE: ./node_modules/@toptal/picasso-container/dist-package/src/Container/Container.js + 2 modules
var Container = __webpack_require__("./node_modules/@toptal/picasso-container/dist-package/src/Container/Container.js");
// EXTERNAL MODULE: ./node_modules/@toptal/picasso-typography/dist-package/src/Typography/Typography.js + 1 modules
var Typography = __webpack_require__("./node_modules/@toptal/picasso-typography/dist-package/src/Typography/Typography.js");
// EXTERNAL MODULE: ./node_modules/@toptal/picasso-utils/dist-package/src/utils/noop.js
var noop = __webpack_require__("./node_modules/@toptal/picasso-utils/dist-package/src/utils/noop.js");
// EXTERNAL MODULE: ./node_modules/lexical/Lexical.js
var Lexical = __webpack_require__("./node_modules/lexical/Lexical.js");
// EXTERNAL MODULE: ./node_modules/@lexical/react/LexicalComposerContext.js
var LexicalComposerContext = __webpack_require__("./node_modules/@lexical/react/LexicalComposerContext.js");
// EXTERNAL MODULE: ./node_modules/@lexical/selection/LexicalSelection.js
var LexicalSelection = __webpack_require__("./node_modules/@lexical/selection/LexicalSelection.js");
;// ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/LexicalEditor/utils/toolbar-state.js
var ToolbarActions;
(function (ToolbarActions) {
    ToolbarActions[ToolbarActions["UPDATE_VISUAL_STATE"] = 0] = "UPDATE_VISUAL_STATE";
})(ToolbarActions || (ToolbarActions = {}));
const toolbarStateReducer = (state, action) => {
    switch (action.type) {
        // Update the visual state of the toolbar all at once (bold, italic, etc.)
        // Since this is called when updating toolbar state on selection change, we can do all updates in one action
        case ToolbarActions.UPDATE_VISUAL_STATE:
            return Object.assign(Object.assign({}, state), { bold: action.value.bold, italic: action.value.italic, list: action.value.list, header: action.value.header });
        default:
            return state;
    }
};
//# sourceMappingURL=toolbar-state.js.map
// EXTERNAL MODULE: ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/LexicalEditor/utils/register-lexical-events.js
var register_lexical_events = __webpack_require__("./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/LexicalEditor/utils/register-lexical-events.js");
// EXTERNAL MODULE: ./node_modules/@lexical/utils/LexicalUtils.js
var LexicalUtils = __webpack_require__("./node_modules/@lexical/utils/LexicalUtils.js");
;// ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/LexicalEditor/utils/get-lexical-node.js


// Get a LexicalNode and related nodes from a RangeSelection (what is currently selected in the editor)
const getLexicalNode = (selection, editor) => {
    const anchorNode = selection.anchor.getNode();
    let node = anchorNode.getKey() === 'root'
        ? anchorNode
        : (0,LexicalUtils.$findMatchingParent)(anchorNode, foundNode => {
            const parent = foundNode.getParent();
            return parent !== null && (0,Lexical.$isRootOrShadowRoot)(parent);
        });
    if (node === null) {
        node = anchorNode.getTopLevelElementOrThrow();
    }
    const elementKey = node.getKey();
    const elementDOM = editor.getElementByKey(elementKey);
    return {
        // The LexicalNode itself
        node,
        // Text or Element node
        anchorNode,
        // HTMLElement rendered by the LexicalNode
        elementDOM,
    };
};
//# sourceMappingURL=get-lexical-node.js.map
// EXTERNAL MODULE: ./node_modules/@material-ui/core/index.js
var core = __webpack_require__("./node_modules/@material-ui/core/index.js");
// EXTERNAL MODULE: ./node_modules/@toptal/picasso-icons/dist-package/src/Icon/Bold16.js
var Bold16 = __webpack_require__("./node_modules/@toptal/picasso-icons/dist-package/src/Icon/Bold16.js");
// EXTERNAL MODULE: ./node_modules/@toptal/picasso-icons/dist-package/src/Icon/Italic16.js
var Italic16 = __webpack_require__("./node_modules/@toptal/picasso-icons/dist-package/src/Icon/Italic16.js");
// EXTERNAL MODULE: ./node_modules/@toptal/picasso-icons/dist-package/src/Icon/ListUnordered16.js
var ListUnordered16 = __webpack_require__("./node_modules/@toptal/picasso-icons/dist-package/src/Icon/ListUnordered16.js");
// EXTERNAL MODULE: ./node_modules/@toptal/picasso-icons/dist-package/src/Icon/ListOrdered16.js
var ListOrdered16 = __webpack_require__("./node_modules/@toptal/picasso-icons/dist-package/src/Icon/ListOrdered16.js");
// EXTERNAL MODULE: ./node_modules/@toptal/picasso-select/dist-package/src/Select/Select.js + 4 modules
var Select = __webpack_require__("./node_modules/@toptal/picasso-select/dist-package/src/Select/Select.js");
// EXTERNAL MODULE: ./node_modules/@toptal/picasso-utils/dist-package/src/utils/use-multiple-forward-refs.js
var use_multiple_forward_refs = __webpack_require__("./node_modules/@toptal/picasso-utils/dist-package/src/utils/use-multiple-forward-refs.js");
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__("./node_modules/classnames/index.js");
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/plugins/Toolbar/Toolbar.js + 1 modules
var Toolbar = __webpack_require__("./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/plugins/Toolbar/Toolbar.js");
// EXTERNAL MODULE: ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/plugins/api.js
var api = __webpack_require__("./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/plugins/api.js");
// EXTERNAL MODULE: ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/RichTextEditorButton/RichTextEditorButton.js
var RichTextEditorButton = __webpack_require__("./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/RichTextEditorButton/RichTextEditorButton.js");
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/createStyles.js
var createStyles = __webpack_require__("./node_modules/@material-ui/core/esm/styles/createStyles.js");
;// ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/RichTextEditorToolbar/styles.js

/* harmony default export */ const styles = (({ palette }) => (0,createStyles/* default */.A)({
    toolbar: {
        display: 'flex',
        borderBottom: `1px solid ${palette.grey.light2}`,
        paddingBottom: '0.5em',
    },
    group: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        pointerEvents: 'unset',
        '&:not(:last-child):not(:empty)::after': {
            content: '""',
            height: '1em',
            width: '1px',
            position: 'relative',
            marginLeft: '0.5em',
            marginRight: '0.5em',
            backgroundColor: palette.grey.lighter2,
        },
    },
    select: {
        // XXX: Using important to override Tailwind styles, remove when migrating RTE to Tailwind
        width: '7.125em !important',
    },
    groupDisabled: {
        pointerEvents: 'none',
    },
}));
//# sourceMappingURL=styles.js.map
;// ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/RichTextEditorToolbar/RichTextEditorToolbar.js










const useStyles = (0,core.makeStyles)(styles, {
    name: 'RichTextEditorToolbar',
});
const ALLOWED_HEADER_TYPE = '3';
const RichTextEditorToolbar = (0,react.forwardRef)(function RichTextEditorToolbar({ format = {
    bold: false,
    italic: false,
    list: false,
    header: '',
}, onBoldClick = () => { }, onItalicClick = () => { }, onHeaderChange = () => { }, onUnorderedClick = () => { }, onOrderedClick = () => { }, testIds, id, }, ref) {
    const { setToolbarPortalEl } = (0,Toolbar/* useToolbarPortalRegister */.QD)();
    const { disabledFormatting, disabled, focused } = (0,api/* useRTEPluginContext */.ts)();
    const toolbarRef = (0,use_multiple_forward_refs/* default */.A)([ref, setToolbarPortalEl]);
    const classes = useStyles({
        format,
        onBoldClick,
        onItalicClick,
        onHeaderChange,
        onUnorderedClick,
        onOrderedClick,
        testIds,
        id,
    });
    const isInlineFormattingDisabled = disabled || disabledFormatting || !focused;
    const isBlockFormattingDisabled = disabled || !focused;
    return (react.createElement(Container/* default */.A, { ref: toolbarRef, id: `${id}toolbar`, className: classes.toolbar },
        react.createElement(Container/* default */.A, { className: classnames_default()(classes.group, {
                groupDisabled: isBlockFormattingDisabled,
            }) },
            react.createElement(Select/* Select */.l, { onChange: onHeaderChange, value: disabled ? '' : format.header, options: [
                    { value: '3', text: 'heading' },
                    { value: '', text: 'normal' },
                ], size: 'small', menuWidth: 'auto', className: classes.select, disabled: isBlockFormattingDisabled, "data-testid": testIds === null || testIds === void 0 ? void 0 : testIds.headerSelect })),
        react.createElement(Container/* default */.A, { className: classes.group },
            react.createElement(RichTextEditorButton/* default */.A, { icon: react.createElement(Bold16/* default */.A, null), onClick: onBoldClick, active: isInlineFormattingDisabled ? false : format.bold, disabled: isInlineFormattingDisabled, "data-testid": testIds === null || testIds === void 0 ? void 0 : testIds.boldButton }),
            react.createElement(RichTextEditorButton/* default */.A, { icon: react.createElement(Italic16/* default */.A, null), onClick: onItalicClick, active: isInlineFormattingDisabled ? false : format.italic, disabled: isInlineFormattingDisabled, "data-testid": testIds === null || testIds === void 0 ? void 0 : testIds.italicButton })),
        react.createElement(Container/* default */.A, { className: classes.group },
            react.createElement(RichTextEditorButton/* default */.A, { icon: react.createElement(ListUnordered16/* default */.A, null), onClick: onUnorderedClick, active: format.list === 'bullet', disabled: isBlockFormattingDisabled, "data-testid": testIds === null || testIds === void 0 ? void 0 : testIds.unorderedListButton }),
            react.createElement(RichTextEditorButton/* default */.A, { icon: react.createElement(ListOrdered16/* default */.A, null), onClick: onOrderedClick, active: format.list === 'ordered', disabled: isBlockFormattingDisabled, "data-testid": testIds === null || testIds === void 0 ? void 0 : testIds.orderedListButton }))));
});
RichTextEditorToolbar.displayName = 'RichTextEditorToolbar';
/* harmony default export */ const RichTextEditorToolbar_RichTextEditorToolbar = (RichTextEditorToolbar);
//# sourceMappingURL=RichTextEditorToolbar.js.map
;// ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/LexicalEditor/utils/synchronize-toolbar-state.js







// Transfers updated Lexical selection state to the toolbar state
// This takes care of highlighting the necessary buttons depending on the selection contents
const synchronizeToolbarState = (dispatch, editor) => {
    const selection = (0,Lexical.$getSelection)();
    let currentListType = false;
    let isHeading = false;
    if ((0,Lexical.$isRangeSelection)(selection)) {
        const { node, anchorNode, elementDOM } = getLexicalNode(selection, editor);
        if (elementDOM !== null) {
            if ((0,LexicalList.$isListNode)(node)) {
                const parentList = (0,LexicalUtils.$getNearestNodeOfType)(anchorNode, LexicalList.ListNode);
                const type = parentList ? parentList.getListType() : node.getListType();
                // Our existing toolbar state stores ordered lists as 'ordered' and unordered lists as 'bullet'
                // while Lexical stores them as 'number' and 'bullet'
                currentListType = type === 'number' ? 'ordered' : 'bullet';
            }
            isHeading = (0,LexicalRichText.$isHeadingNode)(node);
        }
        dispatch({
            type: ToolbarActions.UPDATE_VISUAL_STATE,
            value: {
                bold: selection.hasFormat('bold'),
                italic: selection.hasFormat('italic'),
                list: currentListType,
                header: isHeading ? ALLOWED_HEADER_TYPE : '',
            },
        });
    }
};
//# sourceMappingURL=synchronize-toolbar-state.js.map
// EXTERNAL MODULE: ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/LexicalEditor/utils/get-selected-node.js
var get_selected_node = __webpack_require__("./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/LexicalEditor/utils/get-selected-node.js");
// EXTERNAL MODULE: ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/plugins/CodeBlockPlugin/nodes/index.js
var nodes = __webpack_require__("./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/plugins/CodeBlockPlugin/nodes/index.js");
;// ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/LexicalEditorToolbarPlugin/LexicalEditorToolbarPlugin.js










const LexicalEditorToolbarPlugin = ({ toolbarRef, testIds, id }) => {
    const [editor] = (0,LexicalComposerContext.useLexicalComposerContext)();
    const { setDisabledFormatting } = (0,api/* useRTEPluginContext */.ts)();
    const [{ bold, italic, list, header }, dispatch] = (0,react.useReducer)(toolbarStateReducer, {
        bold: false,
        italic: false,
        list: false,
        header: '',
    });
    (0,react.useEffect)(() => {
        return (0,register_lexical_events/* registerLexicalEvents */.f)({
            editor,
            updateToolbar: () => synchronizeToolbarState(dispatch, editor),
        });
    }, [dispatch, editor]);
    (0,api/* useRTEUpdate */.i_)(() => {
        const selection = (0,Lexical.$getSelection)();
        if ((0,Lexical.$isRangeSelection)(selection)) {
            const node = (0,get_selected_node/* getSelectedNode */.O)(selection);
            const parent = node.getParent();
            const isCodeBlockSelected = (0,nodes/* $isCodeBlockNode */.zW)(parent) || (0,nodes/* $isCodeBlockNode */.zW)(node);
            const isHeadingSelected = (0,LexicalRichText.$isHeadingNode)(node) || (0,LexicalRichText.$isHeadingNode)(parent);
            // prevent formatting inside
            setDisabledFormatting(isCodeBlockSelected || isHeadingSelected);
        }
    });
    const handleBoldClick = () => {
        editor.dispatchCommand(Lexical.FORMAT_TEXT_COMMAND, 'bold');
    };
    const handleItalicClick = () => {
        editor.dispatchCommand(Lexical.FORMAT_TEXT_COMMAND, 'italic');
    };
    const handleUnorderedClick = () => {
        editor.dispatchCommand(list === 'bullet' ? LexicalList.REMOVE_LIST_COMMAND : LexicalList.INSERT_UNORDERED_LIST_COMMAND, undefined);
    };
    const handleOrderedClick = () => {
        editor.dispatchCommand(list === 'ordered' ? LexicalList.REMOVE_LIST_COMMAND : LexicalList.INSERT_ORDERED_LIST_COMMAND, undefined);
    };
    const handleHeaderClick = ({ target: { value }, }) => {
        editor.update(() => {
            const selection = (0,Lexical.$getSelection)();
            if ((0,Lexical.$isRangeSelection)(selection)) {
                if (value === ALLOWED_HEADER_TYPE) {
                    (0,LexicalSelection.$setBlocksType)(selection, () => (0,LexicalRichText.$createHeadingNode)('h3'));
                }
                else {
                    (0,LexicalSelection.$setBlocksType)(selection, () => (0,Lexical.$createParagraphNode)());
                }
            }
        });
    };
    return (react.createElement(RichTextEditorToolbar_RichTextEditorToolbar, { format: {
            bold,
            italic,
            list,
            header,
        }, onUnorderedClick: handleUnorderedClick, onOrderedClick: handleOrderedClick, onBoldClick: handleBoldClick, onItalicClick: handleItalicClick, onHeaderChange: handleHeaderClick, ref: toolbarRef, testIds: testIds, id: id }));
};
/* harmony default export */ const LexicalEditorToolbarPlugin_LexicalEditorToolbarPlugin = (LexicalEditorToolbarPlugin);
//# sourceMappingURL=LexicalEditorToolbarPlugin.js.map
;// ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/plugins/TriggerInitialOnChangePlugin/TriggerInitialOnChangePlugin.js

const TriggerInitialOnChangePlugin = ({ onChange, }) => {
    const [editor] = (0,LexicalComposerContext.useLexicalComposerContext)();
    editor.registerUpdateListener(({ editorState, prevEditorState, tags }) => {
        if (prevEditorState.isEmpty()) {
            onChange(editorState, editor, tags);
        }
    });
    return null;
};
/* harmony default export */ const TriggerInitialOnChangePlugin_TriggerInitialOnChangePlugin = (TriggerInitialOnChangePlugin);
//# sourceMappingURL=TriggerInitialOnChangePlugin.js.map
;// ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/plugins/HeadingsReplacementPlugin/utils/replace-heading-nodes.js

const replaceHeadingNodes = (node) => {
    if (node.getTag() === 'h3') {
        node.getChildren().forEach((node) => {
            if ((0,Lexical.$isTextNode)(node)) {
                node.setFormat(0);
            }
        });
    }
    if (node.getTag() !== 'h3') {
        const textNode = (0,Lexical.$createTextNode)(node.getTextContent());
        textNode.setFormat('bold');
        const paragraphNode = (0,Lexical.$createParagraphNode)();
        paragraphNode.append(textNode);
        node.replace(paragraphNode);
        paragraphNode.select();
    }
};
//# sourceMappingURL=replace-heading-nodes.js.map
;// ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/plugins/HeadingsReplacementPlugin/HeadingsReplacementPlugin.js




const HeadingsReplacementPlugin = () => {
    const [editor] = (0,LexicalComposerContext.useLexicalComposerContext)();
    (0,react.useEffect)(() => {
        return editor.registerNodeTransform(LexicalRichText.HeadingNode, replaceHeadingNodes);
    }, [editor]);
    return null;
};
/* harmony default export */ const HeadingsReplacementPlugin_HeadingsReplacementPlugin = (HeadingsReplacementPlugin);
//# sourceMappingURL=HeadingsReplacementPlugin.js.map
;// ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/plugins/TextLengthPlugin/TextLengthPlugin.js




const TextLengthPlugin = ({ onTextLengthChange = noop/* default */.A }) => {
    const [editor] = (0,LexicalComposerContext.useLexicalComposerContext)();
    (0,react.useEffect)(() => {
        // Set initial text length on mount
        editor.getEditorState().read(() => {
            const rootNode = (0,Lexical.$getRoot)();
            const initialTextContentSize = rootNode.getTextContentSize();
            onTextLengthChange(initialTextContentSize);
        });
        return editor.registerNodeTransform(Lexical.RootNode, (rootNode) => {
            const prevTextContentSize = editor
                .getEditorState()
                .read(() => rootNode.getTextContentSize());
            const textContentSize = rootNode.getTextContentSize();
            if (prevTextContentSize !== textContentSize) {
                onTextLengthChange(textContentSize);
            }
        });
    }, [editor, onTextLengthChange]);
    return null;
};
TextLengthPlugin.displayName = 'LexicalTextLengthPlugin';
/* harmony default export */ const TextLengthPlugin_TextLengthPlugin = (TextLengthPlugin);
//# sourceMappingURL=TextLengthPlugin.js.map
// EXTERNAL MODULE: ./node_modules/@lexical/react/LexicalListPlugin.js
var LexicalListPlugin = __webpack_require__("./node_modules/@lexical/react/LexicalListPlugin.js");
// EXTERNAL MODULE: ./node_modules/@lexical/react/LexicalTabIndentationPlugin.js
var LexicalTabIndentationPlugin = __webpack_require__("./node_modules/@lexical/react/LexicalTabIndentationPlugin.js");
;// ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/plugins/EditorMaxIndentLevelPlugin/EditorMaxIndentLevelPlugin.js




const defaultMaxDepth = 7;
const getElementNodesInSelection = (selection) => {
    const nodesInSelection = selection.getNodes();
    if (nodesInSelection.length === 0) {
        return new Set([
            selection.anchor.getNode().getParentOrThrow(),
            selection.focus.getNode().getParentOrThrow(),
        ]);
    }
    return new Set(nodesInSelection.map(node => (0,Lexical.$isElementNode)(node) ? node : node.getParentOrThrow()));
};
const isIndentPermitted = (maxDepth) => {
    const selection = (0,Lexical.$getSelection)();
    if (!(0,Lexical.$isRangeSelection)(selection)) {
        return false;
    }
    const elementNodesInSelection = getElementNodesInSelection(selection);
    let totalDepth = 0;
    for (const elementNode of elementNodesInSelection) {
        if ((0,LexicalList.$isListNode)(elementNode)) {
            totalDepth = Math.max((0,LexicalList.$getListDepth)(elementNode) + 1, totalDepth);
        }
        else if ((0,LexicalList.$isListItemNode)(elementNode)) {
            const parent = elementNode.getParent();
            if (!(0,LexicalList.$isListNode)(parent)) {
                console.error('ListMaxIndentLevelPlugin: A ListItemNode must have a ListNode for a parent.');
                return false;
            }
            totalDepth = Math.max((0,LexicalList.$getListDepth)(parent) + 1, totalDepth);
        }
    }
    return totalDepth <= maxDepth;
};
const EditorMaxIndentLevelPlugin = ({ maxDepth }) => {
    const [editor] = (0,LexicalComposerContext.useLexicalComposerContext)();
    (0,react.useEffect)(() => {
        return editor.registerCommand(Lexical.INDENT_CONTENT_COMMAND, () => !isIndentPermitted(maxDepth !== null && maxDepth !== void 0 ? maxDepth : defaultMaxDepth), Lexical.COMMAND_PRIORITY_CRITICAL);
    }, [editor, maxDepth]);
    return null;
};
/* harmony default export */ const EditorMaxIndentLevelPlugin_EditorMaxIndentLevelPlugin = (EditorMaxIndentLevelPlugin);
//# sourceMappingURL=EditorMaxIndentLevelPlugin.js.map
;// ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/plugins/ListPlugin/ListPlugin.js




const ListPlugin = () => (react.createElement(react.Fragment, null,
    react.createElement(LexicalListPlugin.ListPlugin, null),
    react.createElement(LexicalTabIndentationPlugin.TabIndentationPlugin, null),
    react.createElement(EditorMaxIndentLevelPlugin_EditorMaxIndentLevelPlugin, { maxDepth: 5 })));
/* harmony default export */ const ListPlugin_ListPlugin = (ListPlugin);
//# sourceMappingURL=ListPlugin.js.map
;// ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/plugins/FocusOnLabelClickPlugin/styles.js

/* harmony default export */ const FocusOnLabelClickPlugin_styles = (() => {
    return (0,createStyles/* default */.A)({
        hiddenInput: {
            position: 'absolute',
            opacity: 0,
            zIndex: -1,
        },
    });
});
//# sourceMappingURL=styles.js.map
;// ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/plugins/FocusOnLabelClickPlugin/FocusOnLabelClickPlugin.js




const FocusOnLabelClickPlugin_useStyles = (0,makeStyles/* default */.A)(FocusOnLabelClickPlugin_styles, {
    name: 'HiddenInput',
});
const FocusOnLabelClickPlugin = ({ hiddenInputId }) => {
    const classes = FocusOnLabelClickPlugin_useStyles();
    const [editor] = (0,LexicalComposerContext.useLexicalComposerContext)();
    const handleFocus = (0,react.useCallback)(() => {
        editor.focus();
    }, [editor]);
    const handleBlur = (0,react.useCallback)((event) => {
        event.stopPropagation();
    }, []);
    return (react.createElement("input", { type: 'text', id: hiddenInputId, onFocus: handleFocus, onBlur: handleBlur, className: classes.hiddenInput }));
};
/* harmony default export */ const FocusOnLabelClickPlugin_FocusOnLabelClickPlugin = (FocusOnLabelClickPlugin);
//# sourceMappingURL=FocusOnLabelClickPlugin.js.map
// EXTERNAL MODULE: ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/utils/typography/typographyStyles.js
var typographyStyles = __webpack_require__("./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/utils/typography/typographyStyles.js");
// EXTERNAL MODULE: ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/utils/typography/get-typography-classnames.js
var get_typography_classnames = __webpack_require__("./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/utils/typography/get-typography-classnames.js");
;// ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/LexicalEditor/hooks/useTypographyClasses/use-typography-classes.js


const useCreateTypographyClasses = (0,makeStyles/* default */.A)(typographyStyles/* typographyStyles */.g, {
    name: 'TextEditorTypography',
});
const useTypographyClasses = (options) => {
    const classes = useCreateTypographyClasses();
    return (0,get_typography_classnames/* getTypographyClassName */.X)(classes, options);
};
/* harmony default export */ const use_typography_classes = (useTypographyClasses);
//# sourceMappingURL=use-typography-classes.js.map
;// ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/LexicalEditor/hooks/useOnFocus/use-on-focus.js


const useOnFocus = ({ onFocus = noop/* default */.A, onBlur = noop/* default */.A, internalRefs = [], }) => {
    const [focused, setFocused] = (0,react.useState)(false);
    const handleFocus = (0,react.useCallback)(() => {
        setFocused(true);
        onFocus();
    }, [onFocus]);
    const handleBlur = (0,react.useCallback)((e) => {
        const focusElement = e.relatedTarget;
        const isInternalElement = internalRefs.some(ref => ref.current && ref.current.contains(focusElement));
        if (isInternalElement) {
            return;
        }
        setFocused(false);
        onBlur();
    }, [onBlur]);
    return {
        focused,
        handleFocus,
        handleBlur,
    };
};
/* harmony default export */ const use_on_focus = (useOnFocus);
//# sourceMappingURL=use-on-focus.js.map
// EXTERNAL MODULE: ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/plugins/LinkPlugin/LinkPlugin.js + 2 modules
var LinkPlugin = __webpack_require__("./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/plugins/LinkPlugin/LinkPlugin.js");
// EXTERNAL MODULE: ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/plugins/EmojiPlugin/EmojiPlugin.js + 3 modules
var EmojiPlugin = __webpack_require__("./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/plugins/EmojiPlugin/EmojiPlugin.js");
;// ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/LexicalEditor/hooks/useComponentPlugins/useComponentPlugins.js



const uniquePlugins = () => {
    const plugins = new Set();
    return ({ type }) => {
        if (plugins.has(type)) {
            return false;
        }
        plugins.add(type);
        return true;
    };
};
const useComponentPlugins = (plugins, customEmojis) => {
    const mappedPlugins = plugins
        .map(plugin => {
        switch (plugin) {
            case 'link':
                return react.createElement(LinkPlugin/* default */.A, null);
            case 'emoji':
                return react.createElement(EmojiPlugin/* default */.A, { customEmojis: customEmojis });
            default:
                return plugin;
        }
    })
        .filter(uniquePlugins());
    const componentPlugins = mappedPlugins.filter(api/* isRTEPluginElement */.hr);
    const lexicalNodes = componentPlugins.flatMap(plugin => { var _a, _b, _c; return (_c = (_b = (_a = plugin.type[api/* RTEPluginMeta */.mw]) === null || _a === void 0 ? void 0 : _a.lexical) === null || _b === void 0 ? void 0 : _b.nodes) !== null && _c !== void 0 ? _c : []; });
    return {
        lexicalNodes,
        componentPlugins: componentPlugins.map(el => { var _a; return (0,react.cloneElement)(el, { key: (_a = el.type[api/* RTEPluginMeta */.mw]) === null || _a === void 0 ? void 0 : _a.name }); }),
    };
};
//# sourceMappingURL=useComponentPlugins.js.map
// EXTERNAL MODULE: ./node_modules/@toptal/picasso-shared/dist-package/src/styles/index.js
var src_styles = __webpack_require__("./node_modules/@toptal/picasso-shared/dist-package/src/styles/index.js");
// EXTERNAL MODULE: ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/RichText/components/styles.js
var components_styles = __webpack_require__("./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/RichText/components/styles.js");
;// ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/LexicalEditor/styles.js



const margins = {
    '& p, & code[dir]': {
        margin: '0.5rem 0',
    },
    '& h3': {
        margin: '1rem 0 0.5rem',
    },
    '& p:first-child, & h3:first-child, & code[dir]:first-child': {
        margin: '0 0 0.5rem',
    },
    '& li:not(:last-child)': {
        margin: '0 0 0.5rem',
    },
    '& ol, & ul': {
        padding: 0,
        margin: '0.5rem 0',
    },
};
const outlinedBullet = `url("data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 9c.55228 0 1-.44772 1-1s-.44772-1-1-1-1 .44772-1 1 .44772 1 1 1Zm0 1c1.10457 0 2-.89543 2-2s-.89543-2-2-2-2 .89543-2 2 .89543 2 2 2Z' fill='%23455065'/%3E%3C/svg%3E")`;
const bullet = `url("data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Ccircle cx='8' cy='8' r='2' fill='%23455065'/%3E%3C/svg%3E");`;
var IndentLevels;
(function (IndentLevels) {
    IndentLevels[IndentLevels["Decimal"] = 4] = "Decimal";
    IndentLevels[IndentLevels["LowerRoman"] = 3] = "LowerRoman";
    IndentLevels[IndentLevels["LowerAlpha2"] = 2] = "LowerAlpha2";
    IndentLevels[IndentLevels["LowerAlpha5"] = 5] = "LowerAlpha5";
})(IndentLevels || (IndentLevels = {}));
const orderedContent = (indent) => {
    switch (indent) {
        case IndentLevels.Decimal:
            return `counter(list-${indent}, decimal) "."`;
        case IndentLevels.LowerRoman:
            return `counter(list-${indent}, lower-roman) "."`;
        case IndentLevels.LowerAlpha2:
        case IndentLevels.LowerAlpha5:
            return `counter(list-${indent}, lower-alpha) "."`;
        default:
            return '';
    }
};
const indentStyles = [2, 3, 4, 5].reduce((acc, indent) => {
    const olItem = `& ol.indent-level-${indent} > li:not(.nested-list-item)`;
    const olItemBefore = `${olItem}:before`;
    const ulItemBefore = `& ul.indent-level-${indent} > li:not(.nested-list-item):before`;
    acc[olItem] = {
        counterIncrement: `list-${indent}`,
    };
    acc[olItemBefore] = {
        content: orderedContent(indent),
    };
    if (indent % 2 === 0) {
        acc[ulItemBefore] = {
            backgroundImage: outlinedBullet,
        };
    }
    return acc;
}, {});
const listStyles = Object.assign({ '& p,& ol,& ul,& pre,& blockquote,& h1,& h2,& h3,& h4,& h5,& h6': {
        counterReset: 'list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9',
    }, '& *:not(li)': {
        counterReset: 'list-0',
    } }, indentStyles);
/* harmony default export */ const LexicalEditor_styles = ((theme) => {
    const { typography } = theme;
    return (0,createStyles/* default */.A)({
        editorContainer: Object.assign(Object.assign({ height: '12.5em', overflowY: 'hidden', resize: 'vertical', position: 'relative', fontSize: '14px' }, listStyles), margins),
        contentEditable: {
            outline: 'none',
            height: '100%',
            padding: '1em 0.5em',
            tabSize: 4,
            overflowY: 'auto',
        },
        placeholder: {
            overflow: 'hidden',
            position: 'absolute',
            textOverflow: 'ellipsis',
            top: '0px',
            left: '0px',
            userSelect: 'none',
            whiteSpace: 'normal',
            display: 'inline-block',
            pointerEvents: 'none',
        },
        paragraph: {
            margin: '0 0 0.5rem',
        },
        listItem: {
            listStyleType: 'none',
            paddingLeft: '1.5rem',
            position: 'relative',
            '&:before': {
                display: 'inline-block',
                position: 'absolute',
                left: 0,
                whiteSpace: 'nowrap',
                width: '1rem',
            },
        },
        ol: {
            '& > li:not(.nested-list-item)': {
                counterIncrement: 'list-0',
                '&:before': {
                    content: 'counter(list-0, decimal) "."',
                },
            },
        },
        ul: {
            '& > li:not(.nested-list-item)': {
                '&:before': {
                    content: '""',
                    backgroundImage: bullet,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    height: (0,src_styles/* rem */.D0)('22px'),
                    width: '1rem',
                },
            },
        },
        bold: {
            fontWeight: typography.fontWeights.semibold,
        },
        italic: {
            fontStyle: 'italic',
        },
        customEmoji: {
            '& > img': {
                verticalAlign: 'bottom',
                width: '22px',
                height: '22px',
            },
        },
        code: (0,components_styles/* codeStyles */.uX)(theme),
        codeBlock: {
            '&': (0,components_styles/* codeBlockStyles */.PY)(theme),
            '& *': {
                fontFamily: 'monospace',
            },
        },
        codeBlockText: {
            fontFamily: 'inherit',
            fontSize: 'inherit',
            lineHeight: 'inherit',
            color: 'inherit',
        },
    });
});
//# sourceMappingURL=styles.js.map
;// ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/LexicalEditor/utils/create-lexical-theme.js
const createLexicalTheme = ({ typographyClassNames, classes, }) => {
    const indentLevels = Array.from({ length: 5 }, (_, index) => `indent-level-${index + 1}`);
    const theme = {
        root: typographyClassNames.root,
        paragraph: classes.paragraph,
        text: {
            italic: classes.italic,
            bold: classes.bold,
            code: classes.code,
        },
        heading: {
            h3: typographyClassNames.heading,
        },
        list: {
            listitem: classes.listItem,
            nested: {
                listitem: 'nested-list-item',
            },
            olDepth: indentLevels,
            ulDepth: indentLevels,
            ul: classes.ul,
            ol: classes.ol,
        },
        customEmoji: classes.customEmoji,
        codeBlock: classes.codeBlock,
        codeBlockText: classes.codeBlockText,
    };
    return theme;
};
//# sourceMappingURL=create-lexical-theme.js.map
// EXTERNAL MODULE: ./node_modules/hast-util-to-html/index.js
var hast_util_to_html = __webpack_require__("./node_modules/hast-util-to-html/index.js");
var hast_util_to_html_default = /*#__PURE__*/__webpack_require__.n(hast_util_to_html);
;// ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/LexicalEditor/utils/get-dom-value.js

const getDomValue = (value) => {
    const parser = new DOMParser();
    return parser.parseFromString(hast_util_to_html_default()(value), 'text/html');
};
//# sourceMappingURL=get-dom-value.js.map
;// ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/LexicalEditor/utils/set-editor-value.js



const setEditorValue = (editor, value) => {
    var _a;
    const root = (0,Lexical.$getRoot)();
    const isEmptyRootValue = ((_a = value === null || value === void 0 ? void 0 : value.children) === null || _a === void 0 ? void 0 : _a.length) === 0;
    if (value && Object.keys(value).length > 0 && !isEmptyRootValue) {
        const domValue = getDomValue(value);
        const lexicalValueNodes = (0,LexicalHtml.$generateNodesFromDOM)(editor, domValue);
        lexicalValueNodes.forEach(node => {
            const nodeToAppend = (0,Lexical.$isElementNode)(node) || (0,Lexical.$isDecoratorNode)(node)
                ? node
                : (0,Lexical.$createParagraphNode)().append(node);
            root.append(nodeToAppend);
        });
    }
    else {
        if (isEmptyRootValue || root.isEmpty()) {
            root.append((0,Lexical.$createParagraphNode)());
        }
    }
};
//# sourceMappingURL=set-editor-value.js.map
;// ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/LexicalEditor/utils/cleanup-html-output.js
var NodeTypes;
(function (NodeTypes) {
    NodeTypes["Parent"] = "parent";
    NodeTypes["Child"] = "child";
})(NodeTypes || (NodeTypes = {}));
const replacementMap = [
    { parentTag: 'i', childTag: 'em', nodeToRemove: NodeTypes.Parent },
    { parentTag: 'b', childTag: 'strong', nodeToRemove: NodeTypes.Parent },
    { parentTag: 'p', childTag: 'span', nodeToRemove: NodeTypes.Child },
    { parentTag: 'pre', childTag: 'span', nodeToRemove: NodeTypes.Child },
    { parentTag: 'code', childTag: 'span', nodeToRemove: NodeTypes.Child },
    { parentTag: 'h3', childTag: 'span', nodeToRemove: NodeTypes.Child },
    { parentTag: 'li', childTag: 'span', nodeToRemove: NodeTypes.Child },
];
const removeParent = (element) => {
    const parent = element.parentNode;
    if (parent) {
        parent.parentNode.insertBefore(element, parent);
        parent.parentNode.removeChild(parent);
    }
};
const removeChild = (element) => {
    while (element.firstChild) {
        if (element.parentNode) {
            element.parentNode.insertBefore(element.firstChild, element);
        }
    }
    element.parentNode.removeChild(element);
};
const removeExtraTags = (htmlDoc) => {
    replacementMap.forEach(replacementRule => {
        const { parentTag, childTag, nodeToRemove } = replacementRule;
        handleElements(htmlDoc, childTag, element => {
            var _a;
            const elementParentTag = (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.tagName.toLocaleLowerCase();
            if (element.tagName.toLowerCase() === childTag &&
                elementParentTag === parentTag) {
                if (nodeToRemove === NodeTypes.Parent) {
                    removeParent(element);
                }
                if (nodeToRemove === NodeTypes.Child) {
                    removeChild(element);
                }
            }
        });
    });
    return htmlDoc;
};
const handleElements = (htmlDoc, tag, callback) => {
    const elements = Array.from(htmlDoc.getElementsByTagName(tag));
    elements.forEach(callback);
    return htmlDoc;
};
const replaceItalicTag = (htmlDoc) => {
    const newTag = 'em';
    handleElements(htmlDoc, 'i', oldElement => {
        const newElement = htmlDoc.createElement(newTag);
        while (oldElement.firstChild) {
            newElement.appendChild(oldElement.firstChild);
        }
        if (oldElement.parentNode) {
            oldElement.parentNode.replaceChild(newElement, oldElement);
        }
    });
    return htmlDoc;
};
const hoistNestedLists = (htmlDoc) => {
    htmlDoc.querySelectorAll('li>ul,li>ol').forEach(list => {
        var _a;
        const currentLi = list.parentNode;
        if ((currentLi === null || currentLi === void 0 ? void 0 : currentLi.children.length) === 1) {
            const previousLi = currentLi.previousElementSibling;
            if (previousLi) {
                currentLi.removeChild(list);
                previousLi.appendChild(list);
                (_a = currentLi === null || currentLi === void 0 ? void 0 : currentLi.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(currentLi);
            }
        }
    });
    return htmlDoc;
};
const cleanupHtmlOutput = (html) => {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(html, 'text/html');
    const [newHtml] = [htmlDoc]
        .map(removeExtraTags)
        .map(replaceItalicTag)
        .map(hoistNestedLists);
    const result = newHtml.body.innerHTML;
    return result;
};
//# sourceMappingURL=cleanup-html-output.js.map
;// ./node_modules/@toptal/picasso-rich-text-editor/dist-package/src/LexicalEditor/LexicalEditor.js























const LexicalEditor_useStyles = (0,makeStyles/* default */.A)(LexicalEditor_styles, {
    name: 'LexicalEditor',
});
const removeAttributesFromString = (htmlString) => {
    return htmlString.replace(/\s(class|dir|value)="[^"]*"/g, '');
};
const useLexicalTheme = (classes) => {
    const bodyTypographyClassName = use_typography_classes({
        variant: 'body',
        size: 'medium',
    });
    const headingTypographyClassName = use_typography_classes({
        variant: 'heading',
        size: 'medium',
    });
    const theme = (0,react.useMemo)(() => createLexicalTheme({
        typographyClassNames: {
            root: bodyTypographyClassName,
            heading: headingTypographyClassName,
        },
        classes,
    }), [bodyTypographyClassName, headingTypographyClassName, classes]);
    return theme;
};
const LexicalEditor = (0,react.forwardRef)(function LexicalEditor(props, ref) {
    const { plugins = [], autoFocus = false, defaultValue, disabled = false, id, onChange = noop/* default */.A, onTextLengthChange = noop/* default */.A, onFocus = noop/* default */.A, onBlur = noop/* default */.A, placeholder, testIds, customEmojis, hiddenInputId, } = props;
    const classes = LexicalEditor_useStyles();
    const toolbarRef = (0,react.useRef)(null);
    const theme = useLexicalTheme(classes);
    const { componentPlugins, lexicalNodes } = useComponentPlugins(plugins, customEmojis);
    const editorConfig = (0,react.useMemo)(() => ({
        editorState: (editor) => setEditorValue(editor, defaultValue),
        theme,
        onError(error) {
            throw error;
        },
        namespace: 'editor',
        nodes: [LexicalList.ListNode, LexicalList.ListItemNode, LexicalRichText.HeadingNode, ...lexicalNodes],
        editable: !disabled,
    }), [defaultValue, theme, disabled, lexicalNodes]);
    const handleChange = (0,react.useCallback)((editorState, editor) => {
        editorState.read(() => {
            const root = (0,Lexical.$getRoot)();
            const topLevelChildren = root.getChildren();
            const hasNoChildren = topLevelChildren.length === 0;
            const hasOneEmptyChild = topLevelChildren.length === 1 && topLevelChildren[0].isEmpty();
            if (hasNoChildren || hasOneEmptyChild) {
                onChange('');
                return;
            }
            const htmlValue = (0,LexicalHtml.$generateHtmlFromNodes)(editor, null);
            const [cleanedValue] = [htmlValue]
                .map(removeAttributesFromString)
                .map(cleanupHtmlOutput);
            onChange(cleanedValue);
        });
    }, [onChange]);
    const { focused, handleFocus, handleBlur } = use_on_focus({
        onFocus,
        onBlur,
        internalRefs: [toolbarRef],
    });
    return (react.createElement(LexicalComposer.LexicalComposer, { initialConfig: editorConfig },
        react.createElement("div", { onFocus: handleFocus, onBlur: handleBlur, tabIndex: -1 },
            react.createElement(api/* RTEPluginContextProvider */.po, { disabled: disabled, focused: focused },
                react.createElement(LexicalEditorToolbarPlugin_LexicalEditorToolbarPlugin, { toolbarRef: toolbarRef, 
                    // remount Toolbar when disabled
                    key: `${disabled || !focused}`, testIds: testIds, id: id }),
                defaultValue ? (react.createElement(TriggerInitialOnChangePlugin_TriggerInitialOnChangePlugin, { onChange: handleChange })) : null,
                react.createElement(LexicalOnChangePlugin.OnChangePlugin, { ignoreSelectionChange: true, onChange: handleChange }),
                autoFocus && react.createElement(LexicalAutoFocusPlugin.AutoFocusPlugin, null),
                react.createElement(HeadingsReplacementPlugin_HeadingsReplacementPlugin, null),
                react.createElement(TextLengthPlugin_TextLengthPlugin, { onTextLengthChange: onTextLengthChange }),
                react.createElement(ListPlugin_ListPlugin, null),
                react.createElement(LexicalHistoryPlugin.HistoryPlugin, null),
                hiddenInputId && (react.createElement(FocusOnLabelClickPlugin_FocusOnLabelClickPlugin, { hiddenInputId: hiddenInputId })),
                componentPlugins,
                react.createElement("div", { className: classes.editorContainer, id: id, ref: ref },
                    react.createElement(LexicalRichTextPlugin.RichTextPlugin, { contentEditable: react.createElement(LexicalContentEditable.ContentEditable, { className: classes.contentEditable, "data-testid": testIds === null || testIds === void 0 ? void 0 : testIds.editor }), placeholder: react.createElement(Container/* default */.A, { left: 'xsmall', top: 'small', className: classes.placeholder },
                            react.createElement(Typography/* default */.A, { size: 'medium', color: 'grey-main-2' }, placeholder)), ErrorBoundary: (LexicalErrorBoundary_default()) }))))));
});
LexicalEditor.displayName = 'LexicalEditor';
/* harmony default export */ const LexicalEditor_LexicalEditor = (LexicalEditor);
//# sourceMappingURL=LexicalEditor.js.map

/***/ })

}]);
//# sourceMappingURL=395.6df9f541.iframe.bundle.js.map