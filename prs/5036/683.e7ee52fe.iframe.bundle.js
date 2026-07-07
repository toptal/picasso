"use strict";
(globalThis["webpackChunk_toptal_picasso_root"] = globalThis["webpackChunk_toptal_picasso_root"] || []).push([[683],{

/***/ "./packages/picasso-rich-text-editor/dist-package/src/LexicalEditor/LexicalEditor.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ LexicalEditor_LexicalEditor)
});

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("./node_modules/core-js/modules/es.string.replace.js");
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("./node_modules/core-js/modules/es.regexp.exec.js");
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("./node_modules/core-js/modules/web.dom-collections.iterator.js");
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
// EXTERNAL MODULE: ./packages/base/Container/dist-package/src/Container/Container.js + 2 modules
var Container = __webpack_require__("./packages/base/Container/dist-package/src/Container/Container.js");
// EXTERNAL MODULE: ./packages/base/Typography/dist-package/src/Typography/Typography.js + 1 modules
var Typography = __webpack_require__("./packages/base/Typography/dist-package/src/Typography/Typography.js");
// EXTERNAL MODULE: ./packages/base/Utils/dist-package/src/utils/noop.js
var noop = __webpack_require__("./packages/base/Utils/dist-package/src/utils/noop.js");
// EXTERNAL MODULE: ./node_modules/lexical/Lexical.js
var Lexical = __webpack_require__("./node_modules/lexical/Lexical.js");
// EXTERNAL MODULE: ./node_modules/@lexical/react/LexicalComposerContext.js
var LexicalComposerContext = __webpack_require__("./node_modules/@lexical/react/LexicalComposerContext.js");
// EXTERNAL MODULE: ./node_modules/@lexical/selection/LexicalSelection.js
var LexicalSelection = __webpack_require__("./node_modules/@lexical/selection/LexicalSelection.js");
;// ./packages/picasso-rich-text-editor/dist-package/src/LexicalEditor/utils/toolbar-state.js
var ToolbarActions;
(function (ToolbarActions) {
  ToolbarActions[ToolbarActions["UPDATE_VISUAL_STATE"] = 0] = "UPDATE_VISUAL_STATE";
})(ToolbarActions || (ToolbarActions = {}));
var toolbarStateReducer = function (state, action) {
  switch (action.type) {
    // Update the visual state of the toolbar all at once (bold, italic, etc.)
    // Since this is called when updating toolbar state on selection change, we can do all updates in one action
    case ToolbarActions.UPDATE_VISUAL_STATE:
      return Object.assign(Object.assign({}, state), {
        bold: action.value.bold,
        italic: action.value.italic,
        list: action.value.list,
        header: action.value.header
      });
    default:
      return state;
  }
};
// EXTERNAL MODULE: ./packages/picasso-rich-text-editor/dist-package/src/LexicalEditor/utils/register-lexical-events.js
var register_lexical_events = __webpack_require__("./packages/picasso-rich-text-editor/dist-package/src/LexicalEditor/utils/register-lexical-events.js");
// EXTERNAL MODULE: ./node_modules/@lexical/utils/LexicalUtils.js
var LexicalUtils = __webpack_require__("./node_modules/@lexical/utils/LexicalUtils.js");
;// ./packages/picasso-rich-text-editor/dist-package/src/LexicalEditor/utils/get-lexical-node.js


// Get a LexicalNode and related nodes from a RangeSelection (what is currently selected in the editor)
var getLexicalNode = function (selection, editor) {
  var anchorNode = selection.anchor.getNode();
  var node = anchorNode.getKey() === 'root' ? anchorNode : (0,LexicalUtils.$findMatchingParent)(anchorNode, function (foundNode) {
    var parent = foundNode.getParent();
    return parent !== null && (0,Lexical.$isRootOrShadowRoot)(parent);
  });
  if (node === null) {
    node = anchorNode.getTopLevelElementOrThrow();
  }
  var elementKey = node.getKey();
  var elementDOM = editor.getElementByKey(elementKey);
  return {
    // The LexicalNode itself
    node: node,
    // Text or Element node
    anchorNode: anchorNode,
    // HTMLElement rendered by the LexicalNode
    elementDOM: elementDOM
  };
};
// EXTERNAL MODULE: ./node_modules/@material-ui/core/index.js
var core = __webpack_require__("./node_modules/@material-ui/core/index.js");
// EXTERNAL MODULE: ./packages/base/Icons/dist-package/src/Icon/Bold16.js
var Bold16 = __webpack_require__("./packages/base/Icons/dist-package/src/Icon/Bold16.js");
// EXTERNAL MODULE: ./packages/base/Icons/dist-package/src/Icon/Italic16.js
var Italic16 = __webpack_require__("./packages/base/Icons/dist-package/src/Icon/Italic16.js");
// EXTERNAL MODULE: ./packages/base/Icons/dist-package/src/Icon/ListUnordered16.js
var ListUnordered16 = __webpack_require__("./packages/base/Icons/dist-package/src/Icon/ListUnordered16.js");
// EXTERNAL MODULE: ./packages/base/Icons/dist-package/src/Icon/ListOrdered16.js
var ListOrdered16 = __webpack_require__("./packages/base/Icons/dist-package/src/Icon/ListOrdered16.js");
// EXTERNAL MODULE: ./packages/base/Select/dist-package/src/Select/Select.js + 4 modules
var Select = __webpack_require__("./packages/base/Select/dist-package/src/Select/Select.js");
// EXTERNAL MODULE: ./packages/base/Utils/dist-package/src/utils/use-multiple-forward-refs.js
var use_multiple_forward_refs = __webpack_require__("./packages/base/Utils/dist-package/src/utils/use-multiple-forward-refs.js");
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__("./node_modules/classnames/index.js");
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./packages/picasso-rich-text-editor/dist-package/src/plugins/Toolbar/Toolbar.js + 1 modules
var Toolbar = __webpack_require__("./packages/picasso-rich-text-editor/dist-package/src/plugins/Toolbar/Toolbar.js");
// EXTERNAL MODULE: ./packages/picasso-rich-text-editor/dist-package/src/plugins/api.js
var api = __webpack_require__("./packages/picasso-rich-text-editor/dist-package/src/plugins/api.js");
// EXTERNAL MODULE: ./packages/picasso-rich-text-editor/dist-package/src/RichTextEditorButton/RichTextEditorButton.js
var RichTextEditorButton = __webpack_require__("./packages/picasso-rich-text-editor/dist-package/src/RichTextEditorButton/RichTextEditorButton.js");
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/createStyles.js
var createStyles = __webpack_require__("./node_modules/@material-ui/core/esm/styles/createStyles.js");
;// ./packages/picasso-rich-text-editor/dist-package/src/RichTextEditorToolbar/styles.js

/* harmony default export */ const styles = (function (_ref) {
  var palette = _ref.palette;
  return (0,createStyles/* default */.A)({
    toolbar: {
      display: 'flex',
      borderBottom: `1px solid ${palette.grey.light2}`,
      paddingBottom: '0.5em'
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
        backgroundColor: palette.grey.lighter2
      }
    },
    select: {
      // XXX: Using important to override Tailwind styles, remove when migrating RTE to Tailwind
      width: '7.125em !important'
    },
    groupDisabled: {
      pointerEvents: 'none'
    }
  });
});
;// ./packages/picasso-rich-text-editor/dist-package/src/RichTextEditorToolbar/RichTextEditorToolbar.js










var useStyles = (0,core.makeStyles)(styles, {
  name: 'RichTextEditorToolbar'
});
var ALLOWED_HEADER_TYPE = '3';
var RichTextEditorToolbar = /*#__PURE__*/(0,react.forwardRef)(function RichTextEditorToolbar(_ref, ref) {
  var _ref$format = _ref.format,
    format = _ref$format === void 0 ? {
      bold: false,
      italic: false,
      list: false,
      header: ''
    } : _ref$format,
    _ref$onBoldClick = _ref.onBoldClick,
    onBoldClick = _ref$onBoldClick === void 0 ? function () {} : _ref$onBoldClick,
    _ref$onItalicClick = _ref.onItalicClick,
    onItalicClick = _ref$onItalicClick === void 0 ? function () {} : _ref$onItalicClick,
    _ref$onHeaderChange = _ref.onHeaderChange,
    onHeaderChange = _ref$onHeaderChange === void 0 ? function () {} : _ref$onHeaderChange,
    _ref$onUnorderedClick = _ref.onUnorderedClick,
    onUnorderedClick = _ref$onUnorderedClick === void 0 ? function () {} : _ref$onUnorderedClick,
    _ref$onOrderedClick = _ref.onOrderedClick,
    onOrderedClick = _ref$onOrderedClick === void 0 ? function () {} : _ref$onOrderedClick,
    testIds = _ref.testIds,
    id = _ref.id;
  var _useToolbarPortalRegi = (0,Toolbar/* useToolbarPortalRegister */.QD)(),
    setToolbarPortalEl = _useToolbarPortalRegi.setToolbarPortalEl;
  var _useRTEPluginContext = (0,api/* useRTEPluginContext */.ts)(),
    disabledFormatting = _useRTEPluginContext.disabledFormatting,
    disabled = _useRTEPluginContext.disabled,
    focused = _useRTEPluginContext.focused;
  var toolbarRef = (0,use_multiple_forward_refs/* default */.A)([ref, setToolbarPortalEl]);
  var classes = useStyles({
    format: format,
    onBoldClick: onBoldClick,
    onItalicClick: onItalicClick,
    onHeaderChange: onHeaderChange,
    onUnorderedClick: onUnorderedClick,
    onOrderedClick: onOrderedClick,
    testIds: testIds,
    id: id
  });
  var isInlineFormattingDisabled = disabled || disabledFormatting || !focused;
  var isBlockFormattingDisabled = disabled || !focused;
  return /*#__PURE__*/react.createElement(Container/* default */.A, {
    ref: toolbarRef,
    id: `${id}toolbar`,
    className: classes.toolbar
  }, /*#__PURE__*/react.createElement(Container/* default */.A, {
    className: classnames_default()(classes.group, {
      groupDisabled: isBlockFormattingDisabled
    })
  }, /*#__PURE__*/react.createElement(Select/* Select */.l, {
    onChange: onHeaderChange,
    value: disabled ? '' : format.header,
    options: [{
      value: '3',
      text: 'heading'
    }, {
      value: '',
      text: 'normal'
    }],
    size: 'small',
    menuWidth: 'auto',
    className: classes.select,
    disabled: isBlockFormattingDisabled,
    "data-testid": testIds === null || testIds === void 0 ? void 0 : testIds.headerSelect
  })), /*#__PURE__*/react.createElement(Container/* default */.A, {
    className: classes.group
  }, /*#__PURE__*/react.createElement(RichTextEditorButton/* default */.A, {
    icon: /*#__PURE__*/react.createElement(Bold16/* default */.A, null),
    onClick: onBoldClick,
    active: isInlineFormattingDisabled ? false : format.bold,
    disabled: isInlineFormattingDisabled,
    "data-testid": testIds === null || testIds === void 0 ? void 0 : testIds.boldButton
  }), /*#__PURE__*/react.createElement(RichTextEditorButton/* default */.A, {
    icon: /*#__PURE__*/react.createElement(Italic16/* default */.A, null),
    onClick: onItalicClick,
    active: isInlineFormattingDisabled ? false : format.italic,
    disabled: isInlineFormattingDisabled,
    "data-testid": testIds === null || testIds === void 0 ? void 0 : testIds.italicButton
  })), /*#__PURE__*/react.createElement(Container/* default */.A, {
    className: classes.group
  }, /*#__PURE__*/react.createElement(RichTextEditorButton/* default */.A, {
    icon: /*#__PURE__*/react.createElement(ListUnordered16/* default */.A, null),
    onClick: onUnorderedClick,
    active: format.list === 'bullet',
    disabled: isBlockFormattingDisabled,
    "data-testid": testIds === null || testIds === void 0 ? void 0 : testIds.unorderedListButton
  }), /*#__PURE__*/react.createElement(RichTextEditorButton/* default */.A, {
    icon: /*#__PURE__*/react.createElement(ListOrdered16/* default */.A, null),
    onClick: onOrderedClick,
    active: format.list === 'ordered',
    disabled: isBlockFormattingDisabled,
    "data-testid": testIds === null || testIds === void 0 ? void 0 : testIds.orderedListButton
  })));
});
RichTextEditorToolbar.displayName = 'RichTextEditorToolbar';
RichTextEditorToolbar.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "RichTextEditorToolbar",
  "props": {
    "format": {
      "defaultValue": {
        "value": "{\n    bold: false,\n    italic: false,\n    list: false,\n    header: '',\n}",
        "computed": false
      },
      "required": false
    },
    "onBoldClick": {
      "defaultValue": {
        "value": "() => { }",
        "computed": false
      },
      "required": false
    },
    "onItalicClick": {
      "defaultValue": {
        "value": "() => { }",
        "computed": false
      },
      "required": false
    },
    "onHeaderChange": {
      "defaultValue": {
        "value": "() => { }",
        "computed": false
      },
      "required": false
    },
    "onUnorderedClick": {
      "defaultValue": {
        "value": "() => { }",
        "computed": false
      },
      "required": false
    },
    "onOrderedClick": {
      "defaultValue": {
        "value": "() => { }",
        "computed": false
      },
      "required": false
    }
  }
};
/* harmony default export */ const RichTextEditorToolbar_RichTextEditorToolbar = (RichTextEditorToolbar);
if (typeof STORYBOOK_REACT_CLASSES !== "undefined") {
  STORYBOOK_REACT_CLASSES["packages/picasso-rich-text-editor/dist-package/src/RichTextEditorToolbar/RichTextEditorToolbar.js"] = {
    name: "RichTextEditorToolbar",
    docgenInfo: RichTextEditorToolbar.__docgenInfo,
    path: "packages/picasso-rich-text-editor/dist-package/src/RichTextEditorToolbar/RichTextEditorToolbar.js"
  };
}
;// ./packages/picasso-rich-text-editor/dist-package/src/LexicalEditor/utils/synchronize-toolbar-state.js







// Transfers updated Lexical selection state to the toolbar state
// This takes care of highlighting the necessary buttons depending on the selection contents
var synchronizeToolbarState = function (dispatch, editor) {
  var selection = (0,Lexical.$getSelection)();
  var currentListType = false;
  var isHeading = false;
  if ((0,Lexical.$isRangeSelection)(selection)) {
    var _getLexicalNode = getLexicalNode(selection, editor),
      node = _getLexicalNode.node,
      anchorNode = _getLexicalNode.anchorNode,
      elementDOM = _getLexicalNode.elementDOM;
    if (elementDOM !== null) {
      if ((0,LexicalList.$isListNode)(node)) {
        var parentList = (0,LexicalUtils.$getNearestNodeOfType)(anchorNode, LexicalList.ListNode);
        var type = parentList ? parentList.getListType() : node.getListType();
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
        header: isHeading ? ALLOWED_HEADER_TYPE : ''
      }
    });
  }
};
// EXTERNAL MODULE: ./packages/picasso-rich-text-editor/dist-package/src/LexicalEditor/utils/get-selected-node.js
var get_selected_node = __webpack_require__("./packages/picasso-rich-text-editor/dist-package/src/LexicalEditor/utils/get-selected-node.js");
// EXTERNAL MODULE: ./packages/picasso-rich-text-editor/dist-package/src/plugins/CodeBlockPlugin/nodes/index.js
var nodes = __webpack_require__("./packages/picasso-rich-text-editor/dist-package/src/plugins/CodeBlockPlugin/nodes/index.js");
;// ./packages/picasso-rich-text-editor/dist-package/src/LexicalEditorToolbarPlugin/LexicalEditorToolbarPlugin.js

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }










var LexicalEditorToolbarPlugin = function (_ref) {
  var toolbarRef = _ref.toolbarRef,
    testIds = _ref.testIds,
    id = _ref.id;
  var _useLexicalComposerCo = (0,LexicalComposerContext.useLexicalComposerContext)(),
    _useLexicalComposerCo2 = _slicedToArray(_useLexicalComposerCo, 1),
    editor = _useLexicalComposerCo2[0];
  var _useRTEPluginContext = (0,api/* useRTEPluginContext */.ts)(),
    setDisabledFormatting = _useRTEPluginContext.setDisabledFormatting;
  var _useReducer = (0,react.useReducer)(toolbarStateReducer, {
      bold: false,
      italic: false,
      list: false,
      header: ''
    }),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    _useReducer2$ = _useReducer2[0],
    bold = _useReducer2$.bold,
    italic = _useReducer2$.italic,
    list = _useReducer2$.list,
    header = _useReducer2$.header,
    dispatch = _useReducer2[1];
  (0,react.useEffect)(function () {
    return (0,register_lexical_events/* registerLexicalEvents */.f)({
      editor: editor,
      updateToolbar: function () {
        return synchronizeToolbarState(dispatch, editor);
      }
    });
  }, [dispatch, editor]);
  (0,api/* useRTEUpdate */.i_)(function () {
    var selection = (0,Lexical.$getSelection)();
    if ((0,Lexical.$isRangeSelection)(selection)) {
      var node = (0,get_selected_node/* getSelectedNode */.O)(selection);
      var parent = node.getParent();
      var isCodeBlockSelected = (0,nodes/* $isCodeBlockNode */.zW)(parent) || (0,nodes/* $isCodeBlockNode */.zW)(node);
      var isHeadingSelected = (0,LexicalRichText.$isHeadingNode)(node) || (0,LexicalRichText.$isHeadingNode)(parent);
      // prevent formatting inside
      setDisabledFormatting(isCodeBlockSelected || isHeadingSelected);
    }
  });
  var handleBoldClick = function () {
    editor.dispatchCommand(Lexical.FORMAT_TEXT_COMMAND, 'bold');
  };
  var handleItalicClick = function () {
    editor.dispatchCommand(Lexical.FORMAT_TEXT_COMMAND, 'italic');
  };
  var handleUnorderedClick = function () {
    editor.dispatchCommand(list === 'bullet' ? LexicalList.REMOVE_LIST_COMMAND : LexicalList.INSERT_UNORDERED_LIST_COMMAND, undefined);
  };
  var handleOrderedClick = function () {
    editor.dispatchCommand(list === 'ordered' ? LexicalList.REMOVE_LIST_COMMAND : LexicalList.INSERT_ORDERED_LIST_COMMAND, undefined);
  };
  var handleHeaderClick = function (_ref2) {
    var value = _ref2.target.value;
    editor.update(function () {
      var selection = (0,Lexical.$getSelection)();
      if ((0,Lexical.$isRangeSelection)(selection)) {
        if (value === ALLOWED_HEADER_TYPE) {
          (0,LexicalSelection.$setBlocksType)(selection, function () {
            return (0,LexicalRichText.$createHeadingNode)('h3');
          });
        } else {
          (0,LexicalSelection.$setBlocksType)(selection, function () {
            return (0,Lexical.$createParagraphNode)();
          });
        }
      }
    });
  };
  return /*#__PURE__*/react.createElement(RichTextEditorToolbar_RichTextEditorToolbar, {
    format: {
      bold: bold,
      italic: italic,
      list: list,
      header: header
    },
    onUnorderedClick: handleUnorderedClick,
    onOrderedClick: handleOrderedClick,
    onBoldClick: handleBoldClick,
    onItalicClick: handleItalicClick,
    onHeaderChange: handleHeaderClick,
    ref: toolbarRef,
    testIds: testIds,
    id: id
  });
};
LexicalEditorToolbarPlugin.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "LexicalEditorToolbarPlugin"
};
/* harmony default export */ const LexicalEditorToolbarPlugin_LexicalEditorToolbarPlugin = (LexicalEditorToolbarPlugin);
if (typeof STORYBOOK_REACT_CLASSES !== "undefined") {
  STORYBOOK_REACT_CLASSES["packages/picasso-rich-text-editor/dist-package/src/LexicalEditorToolbarPlugin/LexicalEditorToolbarPlugin.js"] = {
    name: "LexicalEditorToolbarPlugin",
    docgenInfo: LexicalEditorToolbarPlugin.__docgenInfo,
    path: "packages/picasso-rich-text-editor/dist-package/src/LexicalEditorToolbarPlugin/LexicalEditorToolbarPlugin.js"
  };
}
;// ./packages/picasso-rich-text-editor/dist-package/src/plugins/TriggerInitialOnChangePlugin/TriggerInitialOnChangePlugin.js

function TriggerInitialOnChangePlugin_slicedToArray(r, e) { return TriggerInitialOnChangePlugin_arrayWithHoles(r) || TriggerInitialOnChangePlugin_iterableToArrayLimit(r, e) || TriggerInitialOnChangePlugin_unsupportedIterableToArray(r, e) || TriggerInitialOnChangePlugin_nonIterableRest(); }
function TriggerInitialOnChangePlugin_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function TriggerInitialOnChangePlugin_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return TriggerInitialOnChangePlugin_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? TriggerInitialOnChangePlugin_arrayLikeToArray(r, a) : void 0; } }
function TriggerInitialOnChangePlugin_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function TriggerInitialOnChangePlugin_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function TriggerInitialOnChangePlugin_arrayWithHoles(r) { if (Array.isArray(r)) return r; }

var TriggerInitialOnChangePlugin = function (_ref) {
  var onChange = _ref.onChange;
  var _useLexicalComposerCo = (0,LexicalComposerContext.useLexicalComposerContext)(),
    _useLexicalComposerCo2 = TriggerInitialOnChangePlugin_slicedToArray(_useLexicalComposerCo, 1),
    editor = _useLexicalComposerCo2[0];
  editor.registerUpdateListener(function (_ref2) {
    var editorState = _ref2.editorState,
      prevEditorState = _ref2.prevEditorState,
      tags = _ref2.tags;
    if (prevEditorState.isEmpty()) {
      onChange(editorState, editor, tags);
    }
  });
  return null;
};
/* harmony default export */ const TriggerInitialOnChangePlugin_TriggerInitialOnChangePlugin = (TriggerInitialOnChangePlugin);
;// ./packages/picasso-rich-text-editor/dist-package/src/plugins/HeadingsReplacementPlugin/utils/replace-heading-nodes.js



var replaceHeadingNodes = function (node) {
  if (node.getTag() === 'h3') {
    node.getChildren().forEach(function (node) {
      if ((0,Lexical.$isTextNode)(node)) {
        node.setFormat(0);
      }
    });
  }
  if (node.getTag() !== 'h3') {
    var textNode = (0,Lexical.$createTextNode)(node.getTextContent());
    textNode.setFormat('bold');
    var paragraphNode = (0,Lexical.$createParagraphNode)();
    paragraphNode.append(textNode);
    node.replace(paragraphNode);
    paragraphNode.select();
  }
};
;// ./packages/picasso-rich-text-editor/dist-package/src/plugins/HeadingsReplacementPlugin/HeadingsReplacementPlugin.js

function HeadingsReplacementPlugin_slicedToArray(r, e) { return HeadingsReplacementPlugin_arrayWithHoles(r) || HeadingsReplacementPlugin_iterableToArrayLimit(r, e) || HeadingsReplacementPlugin_unsupportedIterableToArray(r, e) || HeadingsReplacementPlugin_nonIterableRest(); }
function HeadingsReplacementPlugin_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function HeadingsReplacementPlugin_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return HeadingsReplacementPlugin_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? HeadingsReplacementPlugin_arrayLikeToArray(r, a) : void 0; } }
function HeadingsReplacementPlugin_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function HeadingsReplacementPlugin_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function HeadingsReplacementPlugin_arrayWithHoles(r) { if (Array.isArray(r)) return r; }




var HeadingsReplacementPlugin = function () {
  var _useLexicalComposerCo = (0,LexicalComposerContext.useLexicalComposerContext)(),
    _useLexicalComposerCo2 = HeadingsReplacementPlugin_slicedToArray(_useLexicalComposerCo, 1),
    editor = _useLexicalComposerCo2[0];
  (0,react.useEffect)(function () {
    return editor.registerNodeTransform(LexicalRichText.HeadingNode, replaceHeadingNodes);
  }, [editor]);
  return null;
};
/* harmony default export */ const HeadingsReplacementPlugin_HeadingsReplacementPlugin = (HeadingsReplacementPlugin);
;// ./packages/picasso-rich-text-editor/dist-package/src/plugins/TextLengthPlugin/TextLengthPlugin.js

function TextLengthPlugin_slicedToArray(r, e) { return TextLengthPlugin_arrayWithHoles(r) || TextLengthPlugin_iterableToArrayLimit(r, e) || TextLengthPlugin_unsupportedIterableToArray(r, e) || TextLengthPlugin_nonIterableRest(); }
function TextLengthPlugin_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function TextLengthPlugin_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return TextLengthPlugin_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? TextLengthPlugin_arrayLikeToArray(r, a) : void 0; } }
function TextLengthPlugin_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function TextLengthPlugin_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function TextLengthPlugin_arrayWithHoles(r) { if (Array.isArray(r)) return r; }




var TextLengthPlugin = function (_ref) {
  var _ref$onTextLengthChan = _ref.onTextLengthChange,
    onTextLengthChange = _ref$onTextLengthChan === void 0 ? noop/* default */.A : _ref$onTextLengthChan;
  var _useLexicalComposerCo = (0,LexicalComposerContext.useLexicalComposerContext)(),
    _useLexicalComposerCo2 = TextLengthPlugin_slicedToArray(_useLexicalComposerCo, 1),
    editor = _useLexicalComposerCo2[0];
  (0,react.useEffect)(function () {
    // Set initial text length on mount
    editor.getEditorState().read(function () {
      var rootNode = (0,Lexical.$getRoot)();
      var initialTextContentSize = rootNode.getTextContentSize();
      onTextLengthChange(initialTextContentSize);
    });
    return editor.registerNodeTransform(Lexical.RootNode, function (rootNode) {
      var prevTextContentSize = editor.getEditorState().read(function () {
        return rootNode.getTextContentSize();
      });
      var textContentSize = rootNode.getTextContentSize();
      if (prevTextContentSize !== textContentSize) {
        onTextLengthChange(textContentSize);
      }
    });
  }, [editor, onTextLengthChange]);
  return null;
};
TextLengthPlugin.displayName = 'LexicalTextLengthPlugin';
/* harmony default export */ const TextLengthPlugin_TextLengthPlugin = (TextLengthPlugin);
// EXTERNAL MODULE: ./node_modules/@lexical/react/LexicalListPlugin.js
var LexicalListPlugin = __webpack_require__("./node_modules/@lexical/react/LexicalListPlugin.js");
// EXTERNAL MODULE: ./node_modules/@lexical/react/LexicalTabIndentationPlugin.js
var LexicalTabIndentationPlugin = __webpack_require__("./node_modules/@lexical/react/LexicalTabIndentationPlugin.js");
;// ./packages/picasso-rich-text-editor/dist-package/src/plugins/EditorMaxIndentLevelPlugin/EditorMaxIndentLevelPlugin.js
function EditorMaxIndentLevelPlugin_slicedToArray(r, e) { return EditorMaxIndentLevelPlugin_arrayWithHoles(r) || EditorMaxIndentLevelPlugin_iterableToArrayLimit(r, e) || EditorMaxIndentLevelPlugin_unsupportedIterableToArray(r, e) || EditorMaxIndentLevelPlugin_nonIterableRest(); }
function EditorMaxIndentLevelPlugin_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function EditorMaxIndentLevelPlugin_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function EditorMaxIndentLevelPlugin_arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = EditorMaxIndentLevelPlugin_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var n = 0, F = function () {}; return { s: F, n: function () { return n >= r.length ? { done: !0 } : { done: !1, value: r[n++] }; }, e: function (r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function () { t = t.call(r); }, n: function () { var r = t.next(); return a = r.done, r; }, e: function (r) { u = !0, o = r; }, f: function () { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function EditorMaxIndentLevelPlugin_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return EditorMaxIndentLevelPlugin_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? EditorMaxIndentLevelPlugin_arrayLikeToArray(r, a) : void 0; } }
function EditorMaxIndentLevelPlugin_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }





var defaultMaxDepth = 7;
var getElementNodesInSelection = function (selection) {
  var nodesInSelection = selection.getNodes();
  if (nodesInSelection.length === 0) {
    return new Set([selection.anchor.getNode().getParentOrThrow(), selection.focus.getNode().getParentOrThrow()]);
  }
  return new Set(nodesInSelection.map(function (node) {
    return (0,Lexical.$isElementNode)(node) ? node : node.getParentOrThrow();
  }));
};
var isIndentPermitted = function (maxDepth) {
  var selection = (0,Lexical.$getSelection)();
  if (!(0,Lexical.$isRangeSelection)(selection)) {
    return false;
  }
  var elementNodesInSelection = getElementNodesInSelection(selection);
  var totalDepth = 0;
  var _iterator = _createForOfIteratorHelper(elementNodesInSelection),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var elementNode = _step.value;
      if ((0,LexicalList.$isListNode)(elementNode)) {
        totalDepth = Math.max((0,LexicalList.$getListDepth)(elementNode) + 1, totalDepth);
      } else if ((0,LexicalList.$isListItemNode)(elementNode)) {
        var parent = elementNode.getParent();
        if (!(0,LexicalList.$isListNode)(parent)) {
          console.error('ListMaxIndentLevelPlugin: A ListItemNode must have a ListNode for a parent.');
          return false;
        }
        totalDepth = Math.max((0,LexicalList.$getListDepth)(parent) + 1, totalDepth);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return totalDepth <= maxDepth;
};
var EditorMaxIndentLevelPlugin = function (_ref) {
  var maxDepth = _ref.maxDepth;
  var _useLexicalComposerCo = (0,LexicalComposerContext.useLexicalComposerContext)(),
    _useLexicalComposerCo2 = EditorMaxIndentLevelPlugin_slicedToArray(_useLexicalComposerCo, 1),
    editor = _useLexicalComposerCo2[0];
  (0,react.useEffect)(function () {
    return editor.registerCommand(Lexical.INDENT_CONTENT_COMMAND, function () {
      return !isIndentPermitted(maxDepth !== null && maxDepth !== void 0 ? maxDepth : defaultMaxDepth);
    }, Lexical.COMMAND_PRIORITY_CRITICAL);
  }, [editor, maxDepth]);
  return null;
};
/* harmony default export */ const EditorMaxIndentLevelPlugin_EditorMaxIndentLevelPlugin = (EditorMaxIndentLevelPlugin);
;// ./packages/picasso-rich-text-editor/dist-package/src/plugins/ListPlugin/ListPlugin.js




var ListPlugin = function () {
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(LexicalListPlugin.ListPlugin, null), /*#__PURE__*/react.createElement(LexicalTabIndentationPlugin.TabIndentationPlugin, null), /*#__PURE__*/react.createElement(EditorMaxIndentLevelPlugin_EditorMaxIndentLevelPlugin, {
    maxDepth: 5
  }));
};
ListPlugin.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "ListPlugin"
};
/* harmony default export */ const ListPlugin_ListPlugin = (ListPlugin);
if (typeof STORYBOOK_REACT_CLASSES !== "undefined") {
  STORYBOOK_REACT_CLASSES["packages/picasso-rich-text-editor/dist-package/src/plugins/ListPlugin/ListPlugin.js"] = {
    name: "ListPlugin",
    docgenInfo: ListPlugin.__docgenInfo,
    path: "packages/picasso-rich-text-editor/dist-package/src/plugins/ListPlugin/ListPlugin.js"
  };
}
;// ./packages/picasso-rich-text-editor/dist-package/src/plugins/FocusOnLabelClickPlugin/styles.js

/* harmony default export */ const FocusOnLabelClickPlugin_styles = (function () {
  return (0,createStyles/* default */.A)({
    hiddenInput: {
      position: 'absolute',
      opacity: 0,
      zIndex: -1
    }
  });
});
;// ./packages/picasso-rich-text-editor/dist-package/src/plugins/FocusOnLabelClickPlugin/FocusOnLabelClickPlugin.js

function FocusOnLabelClickPlugin_slicedToArray(r, e) { return FocusOnLabelClickPlugin_arrayWithHoles(r) || FocusOnLabelClickPlugin_iterableToArrayLimit(r, e) || FocusOnLabelClickPlugin_unsupportedIterableToArray(r, e) || FocusOnLabelClickPlugin_nonIterableRest(); }
function FocusOnLabelClickPlugin_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function FocusOnLabelClickPlugin_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return FocusOnLabelClickPlugin_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? FocusOnLabelClickPlugin_arrayLikeToArray(r, a) : void 0; } }
function FocusOnLabelClickPlugin_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function FocusOnLabelClickPlugin_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function FocusOnLabelClickPlugin_arrayWithHoles(r) { if (Array.isArray(r)) return r; }




var FocusOnLabelClickPlugin_useStyles = (0,makeStyles/* default */.A)(FocusOnLabelClickPlugin_styles, {
  name: 'HiddenInput'
});
var FocusOnLabelClickPlugin = function (_ref) {
  var hiddenInputId = _ref.hiddenInputId;
  var classes = FocusOnLabelClickPlugin_useStyles();
  var _useLexicalComposerCo = (0,LexicalComposerContext.useLexicalComposerContext)(),
    _useLexicalComposerCo2 = FocusOnLabelClickPlugin_slicedToArray(_useLexicalComposerCo, 1),
    editor = _useLexicalComposerCo2[0];
  var handleFocus = (0,react.useCallback)(function () {
    editor.focus();
  }, [editor]);
  var handleBlur = (0,react.useCallback)(function (event) {
    event.stopPropagation();
  }, []);
  return /*#__PURE__*/react.createElement("input", {
    type: 'text',
    id: hiddenInputId,
    onFocus: handleFocus,
    onBlur: handleBlur,
    className: classes.hiddenInput
  });
};
FocusOnLabelClickPlugin.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "FocusOnLabelClickPlugin"
};
/* harmony default export */ const FocusOnLabelClickPlugin_FocusOnLabelClickPlugin = (FocusOnLabelClickPlugin);
if (typeof STORYBOOK_REACT_CLASSES !== "undefined") {
  STORYBOOK_REACT_CLASSES["packages/picasso-rich-text-editor/dist-package/src/plugins/FocusOnLabelClickPlugin/FocusOnLabelClickPlugin.js"] = {
    name: "FocusOnLabelClickPlugin",
    docgenInfo: FocusOnLabelClickPlugin.__docgenInfo,
    path: "packages/picasso-rich-text-editor/dist-package/src/plugins/FocusOnLabelClickPlugin/FocusOnLabelClickPlugin.js"
  };
}
// EXTERNAL MODULE: ./packages/picasso-rich-text-editor/dist-package/src/utils/typography/typographyStyles.js
var typographyStyles = __webpack_require__("./packages/picasso-rich-text-editor/dist-package/src/utils/typography/typographyStyles.js");
// EXTERNAL MODULE: ./packages/picasso-rich-text-editor/dist-package/src/utils/typography/get-typography-classnames.js
var get_typography_classnames = __webpack_require__("./packages/picasso-rich-text-editor/dist-package/src/utils/typography/get-typography-classnames.js");
;// ./packages/picasso-rich-text-editor/dist-package/src/LexicalEditor/hooks/useTypographyClasses/use-typography-classes.js


var useCreateTypographyClasses = (0,makeStyles/* default */.A)(typographyStyles/* typographyStyles */.g, {
  name: 'TextEditorTypography'
});
var useTypographyClasses = function (options) {
  var classes = useCreateTypographyClasses();
  return (0,get_typography_classnames/* getTypographyClassName */.X)(classes, options);
};
/* harmony default export */ const use_typography_classes = (useTypographyClasses);
;// ./packages/picasso-rich-text-editor/dist-package/src/LexicalEditor/hooks/useOnFocus/use-on-focus.js

function use_on_focus_slicedToArray(r, e) { return use_on_focus_arrayWithHoles(r) || use_on_focus_iterableToArrayLimit(r, e) || use_on_focus_unsupportedIterableToArray(r, e) || use_on_focus_nonIterableRest(); }
function use_on_focus_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function use_on_focus_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return use_on_focus_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? use_on_focus_arrayLikeToArray(r, a) : void 0; } }
function use_on_focus_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function use_on_focus_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function use_on_focus_arrayWithHoles(r) { if (Array.isArray(r)) return r; }


var useOnFocus = function (_ref) {
  var _ref$onFocus = _ref.onFocus,
    onFocus = _ref$onFocus === void 0 ? noop/* default */.A : _ref$onFocus,
    _ref$onBlur = _ref.onBlur,
    onBlur = _ref$onBlur === void 0 ? noop/* default */.A : _ref$onBlur,
    _ref$internalRefs = _ref.internalRefs,
    internalRefs = _ref$internalRefs === void 0 ? [] : _ref$internalRefs;
  var _useState = (0,react.useState)(false),
    _useState2 = use_on_focus_slicedToArray(_useState, 2),
    focused = _useState2[0],
    setFocused = _useState2[1];
  var handleFocus = (0,react.useCallback)(function () {
    setFocused(true);
    onFocus();
  }, [onFocus]);
  var handleBlur = (0,react.useCallback)(function (e) {
    var focusElement = e.relatedTarget;
    var isInternalElement = internalRefs.some(function (ref) {
      return ref.current && ref.current.contains(focusElement);
    });
    if (isInternalElement) {
      return;
    }
    setFocused(false);
    onBlur();
  }, [onBlur]);
  return {
    focused: focused,
    handleFocus: handleFocus,
    handleBlur: handleBlur
  };
};
/* harmony default export */ const use_on_focus = (useOnFocus);
// EXTERNAL MODULE: ./packages/picasso-rich-text-editor/dist-package/src/plugins/LinkPlugin/LinkPlugin.js + 2 modules
var LinkPlugin = __webpack_require__("./packages/picasso-rich-text-editor/dist-package/src/plugins/LinkPlugin/LinkPlugin.js");
// EXTERNAL MODULE: ./packages/picasso-rich-text-editor/dist-package/src/plugins/EmojiPlugin/EmojiPlugin.js + 3 modules
var EmojiPlugin = __webpack_require__("./packages/picasso-rich-text-editor/dist-package/src/plugins/EmojiPlugin/EmojiPlugin.js");
;// ./packages/picasso-rich-text-editor/dist-package/src/LexicalEditor/hooks/useComponentPlugins/useComponentPlugins.js




var uniquePlugins = function () {
  var plugins = new Set();
  return function (_ref) {
    var type = _ref.type;
    if (plugins.has(type)) {
      return false;
    }
    plugins.add(type);
    return true;
  };
};
var useComponentPlugins = function (plugins, customEmojis) {
  var mappedPlugins = plugins.map(function (plugin) {
    switch (plugin) {
      case 'link':
        return /*#__PURE__*/react.createElement(LinkPlugin/* default */.A, null);
      case 'emoji':
        return /*#__PURE__*/react.createElement(EmojiPlugin/* default */.A, {
          customEmojis: customEmojis
        });
      default:
        return plugin;
    }
  }).filter(uniquePlugins());
  var componentPlugins = mappedPlugins.filter(api/* isRTEPluginElement */.hr);
  var lexicalNodes = componentPlugins.flatMap(function (plugin) {
    var _a, _b, _c;
    return (_c = (_b = (_a = plugin.type[api/* RTEPluginMeta */.mw]) === null || _a === void 0 ? void 0 : _a.lexical) === null || _b === void 0 ? void 0 : _b.nodes) !== null && _c !== void 0 ? _c : [];
  });
  return {
    lexicalNodes: lexicalNodes,
    componentPlugins: componentPlugins.map(function (el) {
      var _a;
      return /*#__PURE__*/(0,react.cloneElement)(el, {
        key: (_a = el.type[api/* RTEPluginMeta */.mw]) === null || _a === void 0 ? void 0 : _a.name
      });
    })
  };
};
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.reduce.js
var es_array_reduce = __webpack_require__("./node_modules/core-js/modules/es.array.reduce.js");
// EXTERNAL MODULE: ./packages/shared/dist-package/src/styles/index.js
var src_styles = __webpack_require__("./packages/shared/dist-package/src/styles/index.js");
// EXTERNAL MODULE: ./packages/picasso-rich-text-editor/dist-package/src/RichText/components/styles.js
var components_styles = __webpack_require__("./packages/picasso-rich-text-editor/dist-package/src/RichText/components/styles.js");
;// ./packages/picasso-rich-text-editor/dist-package/src/LexicalEditor/styles.js




var margins = {
  '& p, & code[dir]': {
    margin: '0.5rem 0'
  },
  '& h3': {
    margin: '1rem 0 0.5rem'
  },
  '& p:first-child, & h3:first-child, & code[dir]:first-child': {
    margin: '0 0 0.5rem'
  },
  '& li:not(:last-child)': {
    margin: '0 0 0.5rem'
  },
  '& ol, & ul': {
    padding: 0,
    margin: '0.5rem 0'
  }
};
var outlinedBullet = `url("data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 9c.55228 0 1-.44772 1-1s-.44772-1-1-1-1 .44772-1 1 .44772 1 1 1Zm0 1c1.10457 0 2-.89543 2-2s-.89543-2-2-2-2 .89543-2 2 .89543 2 2 2Z' fill='%23455065'/%3E%3C/svg%3E")`;
var bullet = `url("data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Ccircle cx='8' cy='8' r='2' fill='%23455065'/%3E%3C/svg%3E");`;
var IndentLevels;
(function (IndentLevels) {
  IndentLevels[IndentLevels["Decimal"] = 4] = "Decimal";
  IndentLevels[IndentLevels["LowerRoman"] = 3] = "LowerRoman";
  IndentLevels[IndentLevels["LowerAlpha2"] = 2] = "LowerAlpha2";
  IndentLevels[IndentLevels["LowerAlpha5"] = 5] = "LowerAlpha5";
})(IndentLevels || (IndentLevels = {}));
var orderedContent = function (indent) {
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
var indentStyles = [2, 3, 4, 5].reduce(function (acc, indent) {
  var olItem = `& ol.indent-level-${indent} > li:not(.nested-list-item)`;
  var olItemBefore = `${olItem}:before`;
  var ulItemBefore = `& ul.indent-level-${indent} > li:not(.nested-list-item):before`;
  acc[olItem] = {
    counterIncrement: `list-${indent}`
  };
  acc[olItemBefore] = {
    content: orderedContent(indent)
  };
  if (indent % 2 === 0) {
    acc[ulItemBefore] = {
      backgroundImage: outlinedBullet
    };
  }
  return acc;
}, {});
var listStyles = Object.assign({
  '& p,& ol,& ul,& pre,& blockquote,& h1,& h2,& h3,& h4,& h5,& h6': {
    counterReset: 'list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9'
  },
  '& *:not(li)': {
    counterReset: 'list-0'
  }
}, indentStyles);
/* harmony default export */ const LexicalEditor_styles = (function (theme) {
  var typography = theme.typography;
  return (0,createStyles/* default */.A)({
    editorContainer: Object.assign(Object.assign({
      height: '12.5em',
      overflowY: 'hidden',
      resize: 'vertical',
      position: 'relative',
      fontSize: '14px'
    }, listStyles), margins),
    contentEditable: {
      outline: 'none',
      height: '100%',
      padding: '1em 0.5em',
      tabSize: 4,
      overflowY: 'auto'
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
      pointerEvents: 'none'
    },
    paragraph: {
      margin: '0 0 0.5rem'
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
        width: '1rem'
      }
    },
    ol: {
      '& > li:not(.nested-list-item)': {
        counterIncrement: 'list-0',
        '&:before': {
          content: 'counter(list-0, decimal) "."'
        }
      }
    },
    ul: {
      '& > li:not(.nested-list-item)': {
        '&:before': {
          content: '""',
          backgroundImage: bullet,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: (0,src_styles/* rem */.D0)('22px'),
          width: '1rem'
        }
      }
    },
    bold: {
      fontWeight: typography.fontWeights.semibold
    },
    italic: {
      fontStyle: 'italic'
    },
    customEmoji: {
      '& > img': {
        verticalAlign: 'bottom',
        width: '22px',
        height: '22px'
      }
    },
    code: (0,components_styles/* codeStyles */.uX)(theme),
    codeBlock: {
      '&': (0,components_styles/* codeBlockStyles */.PY)(theme),
      '& *': {
        fontFamily: 'monospace'
      }
    },
    codeBlockText: {
      fontFamily: 'inherit',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      color: 'inherit'
    }
  });
});
;// ./packages/picasso-rich-text-editor/dist-package/src/LexicalEditor/utils/create-lexical-theme.js
var createLexicalTheme = function (_ref) {
  var typographyClassNames = _ref.typographyClassNames,
    classes = _ref.classes;
  var indentLevels = Array.from({
    length: 5
  }, function (_, index) {
    return `indent-level-${index + 1}`;
  });
  var theme = {
    root: typographyClassNames.root,
    paragraph: classes.paragraph,
    text: {
      italic: classes.italic,
      bold: classes.bold,
      code: classes.code
    },
    heading: {
      h3: typographyClassNames.heading
    },
    list: {
      listitem: classes.listItem,
      nested: {
        listitem: 'nested-list-item'
      },
      olDepth: indentLevels,
      ulDepth: indentLevels,
      ul: classes.ul,
      ol: classes.ol
    },
    customEmoji: classes.customEmoji,
    codeBlock: classes.codeBlock,
    codeBlockText: classes.codeBlockText
  };
  return theme;
};
// EXTERNAL MODULE: ./node_modules/hast-util-to-html/index.js
var hast_util_to_html = __webpack_require__("./node_modules/hast-util-to-html/index.js");
var hast_util_to_html_default = /*#__PURE__*/__webpack_require__.n(hast_util_to_html);
;// ./packages/picasso-rich-text-editor/dist-package/src/LexicalEditor/utils/get-dom-value.js

var getDomValue = function (value) {
  var parser = new DOMParser();
  return parser.parseFromString(hast_util_to_html_default()(value), 'text/html');
};
;// ./packages/picasso-rich-text-editor/dist-package/src/LexicalEditor/utils/set-editor-value.js



var setEditorValue = function (editor, value) {
  var _a;
  var root = (0,Lexical.$getRoot)();
  var isEmptyRootValue = ((_a = value === null || value === void 0 ? void 0 : value.children) === null || _a === void 0 ? void 0 : _a.length) === 0;
  if (value && Object.keys(value).length > 0 && !isEmptyRootValue) {
    var domValue = getDomValue(value);
    var lexicalValueNodes = (0,LexicalHtml.$generateNodesFromDOM)(editor, domValue);
    lexicalValueNodes.forEach(function (node) {
      var nodeToAppend = (0,Lexical.$isElementNode)(node) || (0,Lexical.$isDecoratorNode)(node) ? node : (0,Lexical.$createParagraphNode)().append(node);
      root.append(nodeToAppend);
    });
  } else {
    if (isEmptyRootValue || root.isEmpty()) {
      root.append((0,Lexical.$createParagraphNode)());
    }
  }
};
;// ./packages/picasso-rich-text-editor/dist-package/src/LexicalEditor/utils/cleanup-html-output.js

function cleanup_html_output_slicedToArray(r, e) { return cleanup_html_output_arrayWithHoles(r) || cleanup_html_output_iterableToArrayLimit(r, e) || cleanup_html_output_unsupportedIterableToArray(r, e) || cleanup_html_output_nonIterableRest(); }
function cleanup_html_output_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function cleanup_html_output_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return cleanup_html_output_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? cleanup_html_output_arrayLikeToArray(r, a) : void 0; } }
function cleanup_html_output_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function cleanup_html_output_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function cleanup_html_output_arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var NodeTypes;
(function (NodeTypes) {
  NodeTypes["Parent"] = "parent";
  NodeTypes["Child"] = "child";
})(NodeTypes || (NodeTypes = {}));
var replacementMap = [{
  parentTag: 'i',
  childTag: 'em',
  nodeToRemove: NodeTypes.Parent
}, {
  parentTag: 'b',
  childTag: 'strong',
  nodeToRemove: NodeTypes.Parent
}, {
  parentTag: 'p',
  childTag: 'span',
  nodeToRemove: NodeTypes.Child
}, {
  parentTag: 'pre',
  childTag: 'span',
  nodeToRemove: NodeTypes.Child
}, {
  parentTag: 'code',
  childTag: 'span',
  nodeToRemove: NodeTypes.Child
}, {
  parentTag: 'h3',
  childTag: 'span',
  nodeToRemove: NodeTypes.Child
}, {
  parentTag: 'li',
  childTag: 'span',
  nodeToRemove: NodeTypes.Child
}];
var removeParent = function (element) {
  var parent = element.parentNode;
  if (parent) {
    parent.parentNode.insertBefore(element, parent);
    parent.parentNode.removeChild(parent);
  }
};
var removeChild = function (element) {
  while (element.firstChild) {
    if (element.parentNode) {
      element.parentNode.insertBefore(element.firstChild, element);
    }
  }
  element.parentNode.removeChild(element);
};
var removeExtraTags = function (htmlDoc) {
  replacementMap.forEach(function (replacementRule) {
    var parentTag = replacementRule.parentTag,
      childTag = replacementRule.childTag,
      nodeToRemove = replacementRule.nodeToRemove;
    handleElements(htmlDoc, childTag, function (element) {
      var _a;
      var elementParentTag = (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.tagName.toLocaleLowerCase();
      if (element.tagName.toLowerCase() === childTag && elementParentTag === parentTag) {
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
var handleElements = function (htmlDoc, tag, callback) {
  var elements = Array.from(htmlDoc.getElementsByTagName(tag));
  elements.forEach(callback);
  return htmlDoc;
};
var replaceItalicTag = function (htmlDoc) {
  var newTag = 'em';
  handleElements(htmlDoc, 'i', function (oldElement) {
    var newElement = htmlDoc.createElement(newTag);
    while (oldElement.firstChild) {
      newElement.appendChild(oldElement.firstChild);
    }
    if (oldElement.parentNode) {
      oldElement.parentNode.replaceChild(newElement, oldElement);
    }
  });
  return htmlDoc;
};
var hoistNestedLists = function (htmlDoc) {
  htmlDoc.querySelectorAll('li>ul,li>ol').forEach(function (list) {
    var _a;
    var currentLi = list.parentNode;
    if ((currentLi === null || currentLi === void 0 ? void 0 : currentLi.children.length) === 1) {
      var previousLi = currentLi.previousElementSibling;
      if (previousLi) {
        currentLi.removeChild(list);
        previousLi.appendChild(list);
        (_a = currentLi === null || currentLi === void 0 ? void 0 : currentLi.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(currentLi);
      }
    }
  });
  return htmlDoc;
};
var cleanupHtmlOutput = function (html) {
  var parser = new DOMParser();
  var htmlDoc = parser.parseFromString(html, 'text/html');
  var _map$map$map = [htmlDoc].map(removeExtraTags).map(replaceItalicTag).map(hoistNestedLists),
    _map$map$map2 = cleanup_html_output_slicedToArray(_map$map$map, 1),
    newHtml = _map$map$map2[0];
  var result = newHtml.body.innerHTML;
  return result;
};
;// ./packages/picasso-rich-text-editor/dist-package/src/LexicalEditor/LexicalEditor.js
function LexicalEditor_slicedToArray(r, e) { return LexicalEditor_arrayWithHoles(r) || LexicalEditor_iterableToArrayLimit(r, e) || LexicalEditor_unsupportedIterableToArray(r, e) || LexicalEditor_nonIterableRest(); }
function LexicalEditor_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function LexicalEditor_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function LexicalEditor_arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || LexicalEditor_unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function LexicalEditor_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return LexicalEditor_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? LexicalEditor_arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return LexicalEditor_arrayLikeToArray(r); }
function LexicalEditor_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }


























var LexicalEditor_useStyles = (0,makeStyles/* default */.A)(LexicalEditor_styles, {
  name: 'LexicalEditor'
});
var removeAttributesFromString = function (htmlString) {
  return htmlString.replace(/\s(class|dir|value)="[^"]*"/g, '');
};
var useLexicalTheme = function (classes) {
  var bodyTypographyClassName = use_typography_classes({
    variant: 'body',
    size: 'medium'
  });
  var headingTypographyClassName = use_typography_classes({
    variant: 'heading',
    size: 'medium'
  });
  var theme = (0,react.useMemo)(function () {
    return createLexicalTheme({
      typographyClassNames: {
        root: bodyTypographyClassName,
        heading: headingTypographyClassName
      },
      classes: classes
    });
  }, [bodyTypographyClassName, headingTypographyClassName, classes]);
  return theme;
};
var LexicalEditor = /*#__PURE__*/(0,react.forwardRef)(function LexicalEditor(props, ref) {
  var _props$plugins = props.plugins,
    plugins = _props$plugins === void 0 ? [] : _props$plugins,
    _props$autoFocus = props.autoFocus,
    autoFocus = _props$autoFocus === void 0 ? false : _props$autoFocus,
    defaultValue = props.defaultValue,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    id = props.id,
    _props$onChange = props.onChange,
    onChange = _props$onChange === void 0 ? noop/* default */.A : _props$onChange,
    _props$onTextLengthCh = props.onTextLengthChange,
    onTextLengthChange = _props$onTextLengthCh === void 0 ? noop/* default */.A : _props$onTextLengthCh,
    _props$onFocus = props.onFocus,
    onFocus = _props$onFocus === void 0 ? noop/* default */.A : _props$onFocus,
    _props$onBlur = props.onBlur,
    onBlur = _props$onBlur === void 0 ? noop/* default */.A : _props$onBlur,
    placeholder = props.placeholder,
    testIds = props.testIds,
    customEmojis = props.customEmojis,
    hiddenInputId = props.hiddenInputId;
  var classes = LexicalEditor_useStyles();
  var toolbarRef = (0,react.useRef)(null);
  var theme = useLexicalTheme(classes);
  var _useComponentPlugins = useComponentPlugins(plugins, customEmojis),
    componentPlugins = _useComponentPlugins.componentPlugins,
    lexicalNodes = _useComponentPlugins.lexicalNodes;
  var editorConfig = (0,react.useMemo)(function () {
    return {
      editorState: function (editor) {
        return setEditorValue(editor, defaultValue);
      },
      theme: theme,
      onError: function (error) {
        throw error;
      },
      namespace: 'editor',
      nodes: [LexicalList.ListNode, LexicalList.ListItemNode, LexicalRichText.HeadingNode].concat(_toConsumableArray(lexicalNodes)),
      editable: !disabled
    };
  }, [defaultValue, theme, disabled, lexicalNodes]);
  var handleChange = (0,react.useCallback)(function (editorState, editor) {
    editorState.read(function () {
      var root = (0,Lexical.$getRoot)();
      var topLevelChildren = root.getChildren();
      var hasNoChildren = topLevelChildren.length === 0;
      var hasOneEmptyChild = topLevelChildren.length === 1 && topLevelChildren[0].isEmpty();
      if (hasNoChildren || hasOneEmptyChild) {
        onChange('');
        return;
      }
      var htmlValue = (0,LexicalHtml.$generateHtmlFromNodes)(editor, null);
      var _map$map = [htmlValue].map(removeAttributesFromString).map(cleanupHtmlOutput),
        _map$map2 = LexicalEditor_slicedToArray(_map$map, 1),
        cleanedValue = _map$map2[0];
      onChange(cleanedValue);
    });
  }, [onChange]);
  var _useOnFocus = use_on_focus({
      onFocus: onFocus,
      onBlur: onBlur,
      internalRefs: [toolbarRef]
    }),
    focused = _useOnFocus.focused,
    handleFocus = _useOnFocus.handleFocus,
    handleBlur = _useOnFocus.handleBlur;
  return /*#__PURE__*/react.createElement(LexicalComposer.LexicalComposer, {
    initialConfig: editorConfig
  }, /*#__PURE__*/react.createElement("div", {
    onFocus: handleFocus,
    onBlur: handleBlur,
    tabIndex: -1
  }, /*#__PURE__*/react.createElement(api/* RTEPluginContextProvider */.po, {
    disabled: disabled,
    focused: focused
  }, /*#__PURE__*/react.createElement(LexicalEditorToolbarPlugin_LexicalEditorToolbarPlugin, {
    toolbarRef: toolbarRef,
    // remount Toolbar when disabled
    key: `${disabled || !focused}`,
    testIds: testIds,
    id: id
  }), defaultValue ? (/*#__PURE__*/react.createElement(TriggerInitialOnChangePlugin_TriggerInitialOnChangePlugin, {
    onChange: handleChange
  })) : null, /*#__PURE__*/react.createElement(LexicalOnChangePlugin.OnChangePlugin, {
    ignoreSelectionChange: true,
    onChange: handleChange
  }), autoFocus && /*#__PURE__*/react.createElement(LexicalAutoFocusPlugin.AutoFocusPlugin, null), /*#__PURE__*/react.createElement(HeadingsReplacementPlugin_HeadingsReplacementPlugin, null), /*#__PURE__*/react.createElement(TextLengthPlugin_TextLengthPlugin, {
    onTextLengthChange: onTextLengthChange
  }), /*#__PURE__*/react.createElement(ListPlugin_ListPlugin, null), /*#__PURE__*/react.createElement(LexicalHistoryPlugin.HistoryPlugin, null), hiddenInputId && (/*#__PURE__*/react.createElement(FocusOnLabelClickPlugin_FocusOnLabelClickPlugin, {
    hiddenInputId: hiddenInputId
  })), componentPlugins, /*#__PURE__*/react.createElement("div", {
    className: classes.editorContainer,
    id: id,
    ref: ref
  }, /*#__PURE__*/react.createElement(LexicalRichTextPlugin.RichTextPlugin, {
    contentEditable: /*#__PURE__*/react.createElement(LexicalContentEditable.ContentEditable, {
      className: classes.contentEditable,
      "data-testid": testIds === null || testIds === void 0 ? void 0 : testIds.editor
    }),
    placeholder: /*#__PURE__*/react.createElement(Container/* default */.A, {
      left: 'xsmall',
      top: 'small',
      className: classes.placeholder
    }, /*#__PURE__*/react.createElement(Typography/* default */.A, {
      size: 'medium',
      color: 'grey-main-2'
    }, placeholder)),
    ErrorBoundary: (LexicalErrorBoundary_default())
  })))));
});
LexicalEditor.displayName = 'LexicalEditor';
LexicalEditor.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "LexicalEditor"
};
/* harmony default export */ const LexicalEditor_LexicalEditor = (LexicalEditor);
if (typeof STORYBOOK_REACT_CLASSES !== "undefined") {
  STORYBOOK_REACT_CLASSES["packages/picasso-rich-text-editor/dist-package/src/LexicalEditor/LexicalEditor.js"] = {
    name: "LexicalEditor",
    docgenInfo: LexicalEditor.__docgenInfo,
    path: "packages/picasso-rich-text-editor/dist-package/src/LexicalEditor/LexicalEditor.js"
  };
}

/***/ })

}]);
//# sourceMappingURL=683.e7ee52fe.iframe.bundle.js.map