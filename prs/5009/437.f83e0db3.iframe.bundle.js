"use strict";
(globalThis["webpackChunk_toptal_picasso_root"] = globalThis["webpackChunk_toptal_picasso_root"] || []).push([[437],{

/***/ "./packages/picasso-rich-text-editor/src/LexicalEditor/LexicalEditor.tsx":
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
;// ./packages/picasso-rich-text-editor/src/LexicalEditor/utils/toolbar-state.ts
var ToolbarActions = /*#__PURE__*/function (ToolbarActions) {
  ToolbarActions[ToolbarActions["UPDATE_VISUAL_STATE"] = 0] = "UPDATE_VISUAL_STATE";
  return ToolbarActions;
}({});

// When adding a new action type, make sure to add it to the ToolbarAction union type

var toolbarStateReducer = function (state, action) {
  switch (action.type) {
    // Update the visual state of the toolbar all at once (bold, italic, etc.)
    // Since this is called when updating toolbar state on selection change, we can do all updates in one action
    case ToolbarActions.UPDATE_VISUAL_STATE:
      return Object.assign({}, state, {
        bold: action.value.bold,
        italic: action.value.italic,
        list: action.value.list,
        header: action.value.header
      });
    default:
      return state;
  }
};
;// ./packages/picasso-rich-text-editor/src/LexicalEditor/utils/get-selected-node.ts

var getSelectedNode = function (selection) {
  var anchor = selection.anchor;
  var focus = selection.focus;
  var anchorNode = selection.anchor.getNode();
  var focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  return (0,LexicalSelection.$isAtNodeEnd)(selection.isBackward() ? focus : anchor) ? anchorNode : focusNode;
};
;// ./packages/picasso-rich-text-editor/src/LexicalEditor/utils/register-lexical-events.ts



// Subscribes to Lexical editor events and updates the toolbar state accordingly
var registerLexicalEvents = function (_ref) {
  var editor = _ref.editor,
    updateToolbar = _ref.updateToolbar;
  var editorListenerCleanup = editor.registerUpdateListener(function (_ref2) {
    var editorState = _ref2.editorState;
    editorState.read(function () {
      updateToolbar();
    });
  });
  var formatCommandCleanup = editor.registerCommand(Lexical.FORMAT_TEXT_COMMAND, function () {
    var selection = (0,Lexical.$getSelection)();
    if ((0,Lexical.$isRangeSelection)(selection)) {
      var node = getSelectedNode(selection);
      var parent = node.getParent();
      if ((0,LexicalRichText.$isHeadingNode)(parent) || (0,LexicalRichText.$isHeadingNode)(node)) {
        return true;
      }
    }
    return false;
  }, Lexical.COMMAND_PRIORITY_NORMAL);
  var editorCommandsCleanup = editor.registerCommand(Lexical.SELECTION_CHANGE_COMMAND, function () {
    updateToolbar();
    return false;
  }, Lexical.COMMAND_PRIORITY_CRITICAL);

  // Cleanup is necessary to avoid listeners piling up with useEffect
  return function () {
    editorListenerCleanup();
    editorCommandsCleanup();
    formatCommandCleanup();
  };
};
// EXTERNAL MODULE: ./node_modules/@lexical/utils/LexicalUtils.js
var LexicalUtils = __webpack_require__("./node_modules/@lexical/utils/LexicalUtils.js");
;// ./packages/picasso-rich-text-editor/src/LexicalEditor/utils/get-lexical-node.ts



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
// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__("./node_modules/react-dom/index.js");
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/createStyles.js
var createStyles = __webpack_require__("./node_modules/@material-ui/core/esm/styles/createStyles.js");
;// ./packages/picasso-rich-text-editor/src/plugins/Toolbar/styles.ts

/* harmony default export */ const styles = (function (_ref) {
  var palette = _ref.palette;
  return (0,createStyles/* default */.A)({
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
    }
  });
});
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__("./node_modules/react/jsx-runtime.js");
;// ./packages/picasso-rich-text-editor/src/plugins/Toolbar/Toolbar.tsx

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }






var Context = /*#__PURE__*/(0,react.createContext)({
  setPortalEl: function () {}
});
var ToolbarProvider = function (_ref) {
  var children = _ref.children;
  var _useState = (0,react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    portalEl = _useState2[0],
    setPortalEl = _useState2[1];
  return /*#__PURE__*/(0,jsx_runtime.jsx)(Context.Provider, {
    value: {
      portalEl: portalEl !== null && portalEl !== void 0 ? portalEl : undefined,
      setPortalEl: setPortalEl
    },
    children: children
  });
};
ToolbarProvider.displayName = "ToolbarProvider";
var useToolbarPortalRegister = function () {
  var _useContext = (0,react.useContext)(Context),
    setPortalEl = _useContext.setPortalEl;
  return {
    setToolbarPortalEl: setPortalEl
  };
};
var useStyles = (0,core.makeStyles)(styles, {
  name: 'RichTextEditorToolbar'
});
var Toolbar_Toolbar = function (props) {
  var children = props.children,
    keyName = props.keyName;
  var _useContext2 = (0,react.useContext)(Context),
    portalEl = _useContext2.portalEl;
  var classes = useStyles(props);
  if (!portalEl) {
    return null;
  }
  return /*#__PURE__*/(0,react_dom.createPortal)(/*#__PURE__*/(0,jsx_runtime.jsx)(Container/* default */.A, {
    className: classes.group,
    children: children
  }), portalEl, keyName);
};
try {
    // @ts-ignore
    ToolbarProvider.displayName = "ToolbarProvider";
    // @ts-ignore
    ToolbarProvider.__docgenInfo = { "description": "", "displayName": "ToolbarProvider", "props": {} };
    // @ts-ignore
    if (typeof STORYBOOK_REACT_CLASSES !== "undefined")
        // @ts-ignore
        STORYBOOK_REACT_CLASSES["packages/picasso-rich-text-editor/src/plugins/Toolbar/Toolbar.tsx#ToolbarProvider"] = { docgenInfo: ToolbarProvider.__docgenInfo, name: "ToolbarProvider", path: "packages/picasso-rich-text-editor/src/plugins/Toolbar/Toolbar.tsx#ToolbarProvider" };
}
catch (__react_docgen_typescript_loader_error) { }
try {
    // @ts-ignore
    Toolbar_Toolbar.displayName = "Toolbar";
    // @ts-ignore
    Toolbar_Toolbar.__docgenInfo = { "description": "", "displayName": "Toolbar", "props": {} };
    // @ts-ignore
    if (typeof STORYBOOK_REACT_CLASSES !== "undefined")
        // @ts-ignore
        STORYBOOK_REACT_CLASSES["packages/picasso-rich-text-editor/src/plugins/Toolbar/Toolbar.tsx#Toolbar"] = { docgenInfo: Toolbar_Toolbar.__docgenInfo, name: "Toolbar", path: "packages/picasso-rich-text-editor/src/plugins/Toolbar/Toolbar.tsx#Toolbar" };
}
catch (__react_docgen_typescript_loader_error) { }
;// ./packages/picasso-rich-text-editor/src/plugins/api.tsx

function api_slicedToArray(r, e) { return api_arrayWithHoles(r) || api_iterableToArrayLimit(r, e) || api_unsupportedIterableToArray(r, e) || api_nonIterableRest(); }
function api_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function api_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return api_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? api_arrayLikeToArray(r, a) : void 0; } }
function api_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function api_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function api_arrayWithHoles(r) { if (Array.isArray(r)) return r; }






var RTEPluginMeta = Symbol('PicassoRTEPluginMeta');

// eslint-disable-next-line @typescript-eslint/no-explicit-any

var isRTEPluginElement = function (plugin) {
  return /*#__PURE__*/react.isValidElement(plugin) && typeof plugin.type === 'function' && RTEPluginMeta in plugin.type;
};
var useRTEUpdate = function (callback) {
  var _useLexicalComposerCo = (0,LexicalComposerContext.useLexicalComposerContext)(),
    _useLexicalComposerCo2 = api_slicedToArray(_useLexicalComposerCo, 1),
    editor = _useLexicalComposerCo2[0];
  (0,react.useEffect)(function () {
    return registerLexicalEvents({
      editor: editor,
      updateToolbar: callback
    });
  }, [callback, editor]);
};
var RTEPluginContext = /*#__PURE__*/(0,react.createContext)({
  disabled: false,
  disabledFormatting: false,
  focused: false,
  setDisabledFormatting: function () {}
});
var RTEPluginContextProvider = function (_ref) {
  var children = _ref.children,
    disabled = _ref.disabled,
    focused = _ref.focused;
  var _useState = (0,react.useState)(false),
    _useState2 = api_slicedToArray(_useState, 2),
    disabledFormatting = _useState2[0],
    setDisabledFormatting = _useState2[1];

  /**
   * When the editor renders, the selection is null.
   * As soon as we focus the lexical editor (we can see the blinking text edit cursor),
   * the selection is not null.
   * When the user focuses the editor for first time by clicking into the toolbar area,
   * the selection is still null and this functionality is covering this edge case.
   * When the lexical editor has no selection, we disable the toolbar buttons.
   **/
  var _useState3 = (0,react.useState)(true),
    _useState4 = api_slicedToArray(_useState3, 2),
    toolbarDisabled = _useState4[0],
    setToolbarDisabled = _useState4[1];
  useRTEUpdate(function () {
    var selection = (0,Lexical.$getSelection)();
    if (selection === null) {
      setToolbarDisabled(true);
    } else {
      setToolbarDisabled(false);
    }
  });
  var value = {
    disabled: toolbarDisabled || disabled,
    disabledFormatting: disabledFormatting,
    setDisabledFormatting: setDisabledFormatting,
    focused: focused
  };
  return /*#__PURE__*/(0,jsx_runtime.jsx)(ToolbarProvider, {
    children: /*#__PURE__*/(0,jsx_runtime.jsx)(RTEPluginContext.Provider, {
      value: value,
      children: children
    })
  });
};
RTEPluginContextProvider.displayName = "RTEPluginContextProvider";
var useRTEPluginContext = function () {
  var _useContext = (0,react.useContext)(RTEPluginContext),
    disabled = _useContext.disabled,
    focused = _useContext.focused,
    disabledFormatting = _useContext.disabledFormatting,
    setDisabledFormatting = _useContext.setDisabledFormatting;
  return {
    disabled: disabled,
    disabledFormatting: disabledFormatting,
    focused: focused,
    setDisabledFormatting: setDisabledFormatting
  };
};

try {
    // @ts-ignore
    isRTEPluginElement.displayName = "isRTEPluginElement";
    // @ts-ignore
    isRTEPluginElement.__docgenInfo = { "description": "", "displayName": "isRTEPluginElement", "props": {} };
    // @ts-ignore
    if (typeof STORYBOOK_REACT_CLASSES !== "undefined")
        // @ts-ignore
        STORYBOOK_REACT_CLASSES["packages/picasso-rich-text-editor/src/plugins/api.tsx#isRTEPluginElement"] = { docgenInfo: isRTEPluginElement.__docgenInfo, name: "isRTEPluginElement", path: "packages/picasso-rich-text-editor/src/plugins/api.tsx#isRTEPluginElement" };
}
catch (__react_docgen_typescript_loader_error) { }
try {
    // @ts-ignore
    useRTEUpdate.displayName = "useRTEUpdate";
    // @ts-ignore
    useRTEUpdate.__docgenInfo = { "description": "", "displayName": "useRTEUpdate", "props": {} };
    // @ts-ignore
    if (typeof STORYBOOK_REACT_CLASSES !== "undefined")
        // @ts-ignore
        STORYBOOK_REACT_CLASSES["packages/picasso-rich-text-editor/src/plugins/api.tsx#useRTEUpdate"] = { docgenInfo: useRTEUpdate.__docgenInfo, name: "useRTEUpdate", path: "packages/picasso-rich-text-editor/src/plugins/api.tsx#useRTEUpdate" };
}
catch (__react_docgen_typescript_loader_error) { }
try {
    // @ts-ignore
    RTEPluginContextProvider.displayName = "RTEPluginContextProvider";
    // @ts-ignore
    RTEPluginContextProvider.__docgenInfo = { "description": "", "displayName": "RTEPluginContextProvider", "props": {} };
    // @ts-ignore
    if (typeof STORYBOOK_REACT_CLASSES !== "undefined")
        // @ts-ignore
        STORYBOOK_REACT_CLASSES["packages/picasso-rich-text-editor/src/plugins/api.tsx#RTEPluginContextProvider"] = { docgenInfo: RTEPluginContextProvider.__docgenInfo, name: "RTEPluginContextProvider", path: "packages/picasso-rich-text-editor/src/plugins/api.tsx#RTEPluginContextProvider" };
}
catch (__react_docgen_typescript_loader_error) { }
try {
    // @ts-ignore
    Toolbar.displayName = "Toolbar";
    // @ts-ignore
    Toolbar.__docgenInfo = { "description": "", "displayName": "Toolbar", "props": {} };
    // @ts-ignore
    if (typeof STORYBOOK_REACT_CLASSES !== "undefined")
        // @ts-ignore
        STORYBOOK_REACT_CLASSES["packages/picasso-rich-text-editor/src/plugins/api.tsx#Toolbar"] = { docgenInfo: Toolbar.__docgenInfo, name: "Toolbar", path: "packages/picasso-rich-text-editor/src/plugins/api.tsx#Toolbar" };
}
catch (__react_docgen_typescript_loader_error) { }
// EXTERNAL MODULE: ./packages/picasso-tailwind-merge/dist-package/src/twMerge.js
var twMerge = __webpack_require__("./packages/picasso-tailwind-merge/dist-package/src/twMerge.js");
// EXTERNAL MODULE: ./packages/base/Button/dist-package/src/ButtonCircular/ButtonCircular.js + 1 modules
var ButtonCircular = __webpack_require__("./packages/base/Button/dist-package/src/ButtonCircular/ButtonCircular.js");
;// ./packages/picasso-rich-text-editor/src/RichTextEditorButton/RichTextEditorButton.tsx
var _excluded = ["active", "disabled", "onClick", "className"];
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }




var RichTextEditorButton = function (_ref) {
  var _ref$active = _ref.active,
    active = _ref$active === void 0 ? false : _ref$active,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$onClick = _ref.onClick,
    onClick = _ref$onClick === void 0 ? function () {} : _ref$onClick,
    className = _ref.className,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/(0,jsx_runtime.jsx)(ButtonCircular/* default */.A, Object.assign({
    variant: "flat",
    onClick: onClick,
    className: (0,twMerge/* twMerge */.QP)('rounded-sm [&+&]:ml-2!', active && 'bg-graphite-700 [&:not(:hover)_svg]:fill-white', className),
    disabled: disabled
  }, rest));
};
RichTextEditorButton.displayName = "RichTextEditorButton";
RichTextEditorButton.displayName = 'RichTextEditorButton';
/* harmony default export */ const RichTextEditorButton_RichTextEditorButton = (RichTextEditorButton);
try {
    // @ts-ignore
    RichTextEditorButton.displayName = "RichTextEditorButton";
    // @ts-ignore
    RichTextEditorButton.__docgenInfo = { "description": "", "displayName": "RichTextEditorButton", "props": { "className": { "defaultValue": null, "description": "Classnames applied to root element", "name": "className", "required": false, "type": { "name": "string | undefined" } }, "style": { "defaultValue": null, "description": "Style applied to root element", "name": "style", "required": false, "type": { "name": "CSSProperties | undefined" } } } };
    // @ts-ignore
    if (typeof STORYBOOK_REACT_CLASSES !== "undefined")
        // @ts-ignore
        STORYBOOK_REACT_CLASSES["packages/picasso-rich-text-editor/src/RichTextEditorButton/RichTextEditorButton.tsx#RichTextEditorButton"] = { docgenInfo: RichTextEditorButton.__docgenInfo, name: "RichTextEditorButton", path: "packages/picasso-rich-text-editor/src/RichTextEditorButton/RichTextEditorButton.tsx#RichTextEditorButton" };
}
catch (__react_docgen_typescript_loader_error) { }
;// ./packages/picasso-rich-text-editor/src/RichTextEditorToolbar/styles.ts

/* harmony default export */ const RichTextEditorToolbar_styles = (function (_ref) {
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
;// ./packages/picasso-rich-text-editor/src/RichTextEditorToolbar/RichTextEditorToolbar.tsx











var RichTextEditorToolbar_useStyles = (0,core.makeStyles)(RichTextEditorToolbar_styles, {
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
  var _useToolbarPortalRegi = useToolbarPortalRegister(),
    setToolbarPortalEl = _useToolbarPortalRegi.setToolbarPortalEl;
  var _useRTEPluginContext = useRTEPluginContext(),
    disabledFormatting = _useRTEPluginContext.disabledFormatting,
    disabled = _useRTEPluginContext.disabled,
    focused = _useRTEPluginContext.focused;
  var toolbarRef = (0,use_multiple_forward_refs/* default */.A)([ref, setToolbarPortalEl]);
  var classes = RichTextEditorToolbar_useStyles({
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
  return /*#__PURE__*/(0,jsx_runtime.jsxs)(Container/* default */.A, {
    ref: toolbarRef,
    id: `${id}toolbar`,
    className: classes.toolbar,
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)(Container/* default */.A, {
      className: classnames_default()(classes.group, {
        groupDisabled: isBlockFormattingDisabled
      }),
      children: /*#__PURE__*/(0,jsx_runtime.jsx)(Select/* Select */.l, {
        onChange: onHeaderChange,
        value: disabled ? '' : format.header,
        options: [{
          value: '3',
          text: 'heading'
        }, {
          value: '',
          text: 'normal'
        }],
        size: "small",
        menuWidth: "auto",
        className: classes.select,
        disabled: isBlockFormattingDisabled,
        "data-testid": testIds === null || testIds === void 0 ? void 0 : testIds.headerSelect
      })
    }), /*#__PURE__*/(0,jsx_runtime.jsxs)(Container/* default */.A, {
      className: classes.group,
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)(RichTextEditorButton_RichTextEditorButton, {
        icon: /*#__PURE__*/(0,jsx_runtime.jsx)(Bold16/* default */.A, {}),
        onClick: onBoldClick,
        active: isInlineFormattingDisabled ? false : format.bold,
        disabled: isInlineFormattingDisabled,
        "data-testid": testIds === null || testIds === void 0 ? void 0 : testIds.boldButton
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(RichTextEditorButton_RichTextEditorButton, {
        icon: /*#__PURE__*/(0,jsx_runtime.jsx)(Italic16/* default */.A, {}),
        onClick: onItalicClick,
        active: isInlineFormattingDisabled ? false : format.italic,
        disabled: isInlineFormattingDisabled,
        "data-testid": testIds === null || testIds === void 0 ? void 0 : testIds.italicButton
      })]
    }), /*#__PURE__*/(0,jsx_runtime.jsxs)(Container/* default */.A, {
      className: classes.group,
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)(RichTextEditorButton_RichTextEditorButton, {
        icon: /*#__PURE__*/(0,jsx_runtime.jsx)(ListUnordered16/* default */.A, {}),
        onClick: onUnorderedClick,
        active: format.list === 'bullet',
        disabled: isBlockFormattingDisabled,
        "data-testid": testIds === null || testIds === void 0 ? void 0 : testIds.unorderedListButton
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(RichTextEditorButton_RichTextEditorButton, {
        icon: /*#__PURE__*/(0,jsx_runtime.jsx)(ListOrdered16/* default */.A, {}),
        onClick: onOrderedClick,
        active: format.list === 'ordered',
        disabled: isBlockFormattingDisabled,
        "data-testid": testIds === null || testIds === void 0 ? void 0 : testIds.orderedListButton
      })]
    })]
  });
});
RichTextEditorToolbar.displayName = 'RichTextEditorToolbar';
/* harmony default export */ const RichTextEditorToolbar_RichTextEditorToolbar = (RichTextEditorToolbar);
try {
    // @ts-ignore
    RichTextEditorToolbar.displayName = "RichTextEditorToolbar";
    // @ts-ignore
    RichTextEditorToolbar.__docgenInfo = { "description": "", "displayName": "RichTextEditorToolbar", "props": {} };
    // @ts-ignore
    if (typeof STORYBOOK_REACT_CLASSES !== "undefined")
        // @ts-ignore
        STORYBOOK_REACT_CLASSES["packages/picasso-rich-text-editor/src/RichTextEditorToolbar/RichTextEditorToolbar.tsx#RichTextEditorToolbar"] = { docgenInfo: RichTextEditorToolbar.__docgenInfo, name: "RichTextEditorToolbar", path: "packages/picasso-rich-text-editor/src/RichTextEditorToolbar/RichTextEditorToolbar.tsx#RichTextEditorToolbar" };
}
catch (__react_docgen_typescript_loader_error) { }
;// ./packages/picasso-rich-text-editor/src/LexicalEditor/utils/synchronize-toolbar-state.ts








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
;// ./packages/picasso-rich-text-editor/src/LexicalEditor/utils/hasChildDOMNodeTag.ts

var hasChildDOMNodeTag = function (node, tagName) {
  for (var _i = 0, _Array$from = Array.from(node.childNodes); _i < _Array$from.length; _i++) {
    var child = _Array$from[_i];
    if ((0,LexicalUtils.isHTMLElement)(child) && child.tagName === tagName) {
      return true;
    }
    hasChildDOMNodeTag(child, tagName);
  }
  return false;
};
/* harmony default export */ const utils_hasChildDOMNodeTag = (hasChildDOMNodeTag);
;// ./packages/picasso-rich-text-editor/src/plugins/CodeBlockPlugin/utils/getFirstCodeNodeOfLine.ts

var getFirstCodeNodeOfLine = function (anchor) {
  var previousNode = anchor;
  var node = anchor;
  while ($isCodeBlockTextNode(node)) {
    previousNode = node;
    node = node.getPreviousSibling();
  }
  return previousNode;
};
/* harmony default export */ const utils_getFirstCodeNodeOfLine = (getFirstCodeNodeOfLine);
;// ./packages/picasso-rich-text-editor/src/plugins/CodeBlockPlugin/nodes/CodeBlockNode.tsx


function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == typeof e || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function () { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }




var convertPreElement = function () {
  return {
    node: $createCodeBlockNode()
  };
};
var ELEMENT_TYPE = 'code-block';
var CodeBlockNode = /*#__PURE__*/function (_ElementNode) {
  _inherits(CodeBlockNode, _ElementNode);
  function CodeBlockNode(key) {
    _classCallCheck(this, CodeBlockNode);
    return _callSuper(this, CodeBlockNode, [key]);
  }
  _createClass(CodeBlockNode, [{
    key: "createDOM",
    value: function createDOM(config) {
      var element = document.createElement('code');
      var theme = config.theme;
      var className = theme.codeBlock;
      if (className !== undefined) {
        element.className = className;
      }
      return element;
    }
  }, {
    key: "updateDOM",
    value: function updateDOM() {
      return false;
    }
  }, {
    key: "exportDOM",
    value: function exportDOM() {
      var element = document.createElement('pre');
      return {
        element: element
      };
    }
  }, {
    key: "exportJSON",
    value: function exportJSON() {
      return Object.assign({}, _superPropGet(CodeBlockNode, "exportJSON", this, 3)([]), {
        type: ELEMENT_TYPE,
        version: 1
      });
    }
  }, {
    key: "canIndent",
    value: function canIndent() {
      return false;
    }
  }, {
    key: "extractWithChild",
    value: function extractWithChild() {
      return true;
    }

    // eslint-disable-next-line max-statements, complexity
  }, {
    key: "insertNewAfter",
    value: function insertNewAfter(selection) {
      var restoreSelection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var children = this.getChildren();
      var childrenLength = children.length;
      if (childrenLength >= 2 && children[childrenLength - 1].getTextContent() === '\n' && children[childrenLength - 2].getTextContent() === '\n' && selection.isCollapsed() && selection.anchor.key === this.__key && selection.anchor.offset === childrenLength) {
        children[childrenLength - 1].remove();
        children[childrenLength - 2].remove();
        var newElement = (0,Lexical.$createParagraphNode)();
        this.insertAfter(newElement, restoreSelection);
        return newElement;
      }

      // If the selection is within the codeblock, find all leading tabs and
      // spaces of the current line. Create a new line that has all those
      // tabs and spaces, such that leading indentation is preserved.
      var anchor = selection.anchor;
      var focus = selection.focus;
      var firstPoint = anchor.isBefore(focus) ? anchor : focus;
      var firstSelectionNode = firstPoint.getNode();
      if ($isCodeBlockTextNode(firstSelectionNode)) {
        var node = utils_getFirstCodeNodeOfLine(firstSelectionNode);
        var insertNodes = [];

        // eslint-disable-next-line no-constant-condition
        while (true) {
          if ($isCodeBlockTextNode(node)) {
            var text = node.getTextContent();
            var textSize = node.getTextContentSize();

            // eslint-disable-next-line max-depth
            for (var spaces = 0; spaces < textSize && text[spaces] === ' '; spaces++) {
              // eslint-disable-next-line max-depth
              if (spaces !== 0) {
                insertNodes.push($createCodeBlockTextNode(' '.repeat(spaces)));
              }
              // eslint-disable-next-line max-depth
              if (spaces !== textSize) {
                break;
              }
            }
            node = node.getNextSibling();
          } else {
            break;
          }
        }
        if (insertNodes.length > 0) {
          selection.insertNodes([(0,Lexical.$createLineBreakNode)()].concat(insertNodes));
          return insertNodes[insertNodes.length - 1];
        }
      }
      return null;
    }
  }, {
    key: "collapseAtStart",
    value: function collapseAtStart() {
      var paragraph = (0,Lexical.$createParagraphNode)();
      var children = this.getChildren();
      children.forEach(function (child) {
        return paragraph.append(child);
      });
      this.replace(paragraph);
      return true;
    }
  }], [{
    key: "getType",
    value: function getType() {
      return ELEMENT_TYPE;
    }
  }, {
    key: "clone",
    value: function clone(node) {
      return new CodeBlockNode(node.__key);
    }
  }, {
    key: "importDOM",
    value: function importDOM() {
      return {
        // Typically <pre> is used for code blocks, and <code> for inline code styles
        // but if it's a multi line <code> we'll create a block. Pass through to
        // inline format handled by TextNode otherwise.
        code: function (node) {
          var isMultiLine = node.textContent != null && (/\r?\n/.test(node.textContent) || utils_hasChildDOMNodeTag(node, 'BR'));
          return isMultiLine ? {
            conversion: convertPreElement,
            priority: 1
          } : null;
        },
        pre: function () {
          return {
            conversion: convertPreElement,
            priority: 0
          };
        }
      };
    }
  }, {
    key: "importJSON",
    value: function importJSON(serializedNode) {
      var node = $createCodeBlockNode();
      node.setFormat(serializedNode.format);
      node.setIndent(serializedNode.indent);
      node.setDirection(serializedNode.direction);
      return node;
    }
  }]);
  return CodeBlockNode;
}(Lexical.ElementNode);
;// ./packages/picasso-rich-text-editor/src/plugins/CodeBlockPlugin/nodes/CodeBlockTextNode.tsx
function CodeBlockTextNode_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function CodeBlockTextNode_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, CodeBlockTextNode_toPropertyKey(o.key), o); } }
function CodeBlockTextNode_createClass(e, r, t) { return r && CodeBlockTextNode_defineProperties(e.prototype, r), t && CodeBlockTextNode_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function CodeBlockTextNode_toPropertyKey(t) { var i = CodeBlockTextNode_toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function CodeBlockTextNode_toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function CodeBlockTextNode_callSuper(t, o, e) { return o = CodeBlockTextNode_getPrototypeOf(o), CodeBlockTextNode_possibleConstructorReturn(t, CodeBlockTextNode_isNativeReflectConstruct() ? Reflect.construct(o, e || [], CodeBlockTextNode_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function CodeBlockTextNode_possibleConstructorReturn(t, e) { if (e && ("object" == typeof e || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return CodeBlockTextNode_assertThisInitialized(t); }
function CodeBlockTextNode_assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function CodeBlockTextNode_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (CodeBlockTextNode_isNativeReflectConstruct = function () { return !!t; })(); }
function CodeBlockTextNode_superPropGet(t, o, e, r) { var p = CodeBlockTextNode_get(CodeBlockTextNode_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function CodeBlockTextNode_get() { return CodeBlockTextNode_get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = CodeBlockTextNode_superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, CodeBlockTextNode_get.apply(null, arguments); }
function CodeBlockTextNode_superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = CodeBlockTextNode_getPrototypeOf(t));); return t; }
function CodeBlockTextNode_getPrototypeOf(t) { return CodeBlockTextNode_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, CodeBlockTextNode_getPrototypeOf(t); }
function CodeBlockTextNode_inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && CodeBlockTextNode_setPrototypeOf(t, e); }
function CodeBlockTextNode_setPrototypeOf(t, e) { return CodeBlockTextNode_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, CodeBlockTextNode_setPrototypeOf(t, e); }


var CodeBlockTextNode_ELEMENT_TYPE = 'code-block-text';
var CodeBlockTextNode = /*#__PURE__*/function (_TextNode) {
  CodeBlockTextNode_inherits(CodeBlockTextNode, _TextNode);
  function CodeBlockTextNode(text, key) {
    CodeBlockTextNode_classCallCheck(this, CodeBlockTextNode);
    return CodeBlockTextNode_callSuper(this, CodeBlockTextNode, [text, key]);
  }
  CodeBlockTextNode_createClass(CodeBlockTextNode, [{
    key: "createDOM",
    value: function createDOM(config) {
      var element = CodeBlockTextNode_superPropGet(CodeBlockTextNode, "createDOM", this, 3)([config]);
      var theme = config.theme;
      var className = theme.codeBlockText;
      if (className !== undefined) {
        element.className = className;
      }
      return element;
    }
  }, {
    key: "exportJSON",
    value: function exportJSON() {
      return Object.assign({}, CodeBlockTextNode_superPropGet(CodeBlockTextNode, "exportJSON", this, 3)([]), {
        type: CodeBlockTextNode_ELEMENT_TYPE,
        version: 1
      });
    }

    // prevent formatting
  }, {
    key: "setFormat",
    value: function setFormat() {
      return this;
    }
  }, {
    key: "isParentRequired",
    value: function isParentRequired() {
      return true;
    }
  }, {
    key: "createParentElementNode",
    value: function createParentElementNode() {
      return $createCodeBlockNode();
    }
  }], [{
    key: "getType",
    value: function getType() {
      return CodeBlockTextNode_ELEMENT_TYPE;
    }
  }, {
    key: "clone",
    value: function clone(node) {
      return new CodeBlockTextNode(node.__text, node.__key);
    }
  }, {
    key: "importJSON",
    value: function importJSON(serializedNode) {
      var text = serializedNode.text;
      var node = $createCodeBlockTextNode(text);
      return node;
    }
  }]);
  return CodeBlockTextNode;
}(Lexical.TextNode);
;// ./packages/picasso-rich-text-editor/src/plugins/CodeBlockPlugin/nodes/index.ts



var $createCodeBlockNode = function () {
  return (0,Lexical.$applyNodeReplacement)(new CodeBlockNode());
};
var $isCodeBlockNode = function (node) {
  return node instanceof CodeBlockNode;
};
var $isCodeBlockTextNode = function (node) {
  return node instanceof CodeBlockTextNode;
};
var $createCodeBlockTextNode = function (text) {
  return (0,Lexical.$applyNodeReplacement)(new CodeBlockTextNode(text));
};

;// ./packages/picasso-rich-text-editor/src/LexicalEditorToolbarPlugin/LexicalEditorToolbarPlugin.tsx

function LexicalEditorToolbarPlugin_slicedToArray(r, e) { return LexicalEditorToolbarPlugin_arrayWithHoles(r) || LexicalEditorToolbarPlugin_iterableToArrayLimit(r, e) || LexicalEditorToolbarPlugin_unsupportedIterableToArray(r, e) || LexicalEditorToolbarPlugin_nonIterableRest(); }
function LexicalEditorToolbarPlugin_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function LexicalEditorToolbarPlugin_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return LexicalEditorToolbarPlugin_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? LexicalEditorToolbarPlugin_arrayLikeToArray(r, a) : void 0; } }
function LexicalEditorToolbarPlugin_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function LexicalEditorToolbarPlugin_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function LexicalEditorToolbarPlugin_arrayWithHoles(r) { if (Array.isArray(r)) return r; }











var LexicalEditorToolbarPlugin = function (_ref) {
  var toolbarRef = _ref.toolbarRef,
    testIds = _ref.testIds,
    id = _ref.id;
  var _useLexicalComposerCo = (0,LexicalComposerContext.useLexicalComposerContext)(),
    _useLexicalComposerCo2 = LexicalEditorToolbarPlugin_slicedToArray(_useLexicalComposerCo, 1),
    editor = _useLexicalComposerCo2[0];
  var _useRTEPluginContext = useRTEPluginContext(),
    setDisabledFormatting = _useRTEPluginContext.setDisabledFormatting;
  var _useReducer = (0,react.useReducer)(toolbarStateReducer, {
      bold: false,
      italic: false,
      list: false,
      header: ''
    }),
    _useReducer2 = LexicalEditorToolbarPlugin_slicedToArray(_useReducer, 2),
    _useReducer2$ = _useReducer2[0],
    bold = _useReducer2$.bold,
    italic = _useReducer2$.italic,
    list = _useReducer2$.list,
    header = _useReducer2$.header,
    dispatch = _useReducer2[1];
  (0,react.useEffect)(function () {
    return registerLexicalEvents({
      editor: editor,
      updateToolbar: function () {
        return synchronizeToolbarState(dispatch, editor);
      }
    });
  }, [dispatch, editor]);
  useRTEUpdate(function () {
    var selection = (0,Lexical.$getSelection)();
    if ((0,Lexical.$isRangeSelection)(selection)) {
      var node = getSelectedNode(selection);
      var parent = node.getParent();
      var isCodeBlockSelected = $isCodeBlockNode(parent) || $isCodeBlockNode(node);
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
  return /*#__PURE__*/(0,jsx_runtime.jsx)(RichTextEditorToolbar_RichTextEditorToolbar, {
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
LexicalEditorToolbarPlugin.displayName = "LexicalEditorToolbarPlugin";
/* harmony default export */ const LexicalEditorToolbarPlugin_LexicalEditorToolbarPlugin = (LexicalEditorToolbarPlugin);
try {
    // @ts-ignore
    LexicalEditorToolbarPlugin.displayName = "LexicalEditorToolbarPlugin";
    // @ts-ignore
    LexicalEditorToolbarPlugin.__docgenInfo = { "description": "", "displayName": "LexicalEditorToolbarPlugin", "props": {} };
    // @ts-ignore
    if (typeof STORYBOOK_REACT_CLASSES !== "undefined")
        // @ts-ignore
        STORYBOOK_REACT_CLASSES["packages/picasso-rich-text-editor/src/LexicalEditorToolbarPlugin/LexicalEditorToolbarPlugin.tsx#LexicalEditorToolbarPlugin"] = { docgenInfo: LexicalEditorToolbarPlugin.__docgenInfo, name: "LexicalEditorToolbarPlugin", path: "packages/picasso-rich-text-editor/src/LexicalEditorToolbarPlugin/LexicalEditorToolbarPlugin.tsx#LexicalEditorToolbarPlugin" };
}
catch (__react_docgen_typescript_loader_error) { }
;// ./packages/picasso-rich-text-editor/src/plugins/TriggerInitialOnChangePlugin/TriggerInitialOnChangePlugin.ts

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
;// ./packages/picasso-rich-text-editor/src/plugins/HeadingsReplacementPlugin/utils/replace-heading-nodes.ts



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
;// ./packages/picasso-rich-text-editor/src/plugins/HeadingsReplacementPlugin/HeadingsReplacementPlugin.ts

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
;// ./packages/picasso-rich-text-editor/src/plugins/TextLengthPlugin/TextLengthPlugin.tsx

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
try {
    // @ts-ignore
    LexicalTextLengthPlugin.displayName = "LexicalTextLengthPlugin";
    // @ts-ignore
    LexicalTextLengthPlugin.__docgenInfo = { "description": "", "displayName": "LexicalTextLengthPlugin", "props": { "onTextLengthChange": { "defaultValue": null, "description": "Callback that is called when text length changes", "name": "onTextLengthChange", "required": true, "type": { "name": "TextLengthChangeHandler" } } } };
    // @ts-ignore
    if (typeof STORYBOOK_REACT_CLASSES !== "undefined")
        // @ts-ignore
        STORYBOOK_REACT_CLASSES["packages/picasso-rich-text-editor/src/plugins/TextLengthPlugin/TextLengthPlugin.tsx#LexicalTextLengthPlugin"] = { docgenInfo: LexicalTextLengthPlugin.__docgenInfo, name: "LexicalTextLengthPlugin", path: "packages/picasso-rich-text-editor/src/plugins/TextLengthPlugin/TextLengthPlugin.tsx#LexicalTextLengthPlugin" };
}
catch (__react_docgen_typescript_loader_error) { }
// EXTERNAL MODULE: ./node_modules/@lexical/react/LexicalListPlugin.js
var LexicalListPlugin = __webpack_require__("./node_modules/@lexical/react/LexicalListPlugin.js");
// EXTERNAL MODULE: ./node_modules/@lexical/react/LexicalTabIndentationPlugin.js
var LexicalTabIndentationPlugin = __webpack_require__("./node_modules/@lexical/react/LexicalTabIndentationPlugin.js");
;// ./packages/picasso-rich-text-editor/src/plugins/EditorMaxIndentLevelPlugin/EditorMaxIndentLevelPlugin.ts
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
;// ./packages/picasso-rich-text-editor/src/plugins/ListPlugin/ListPlugin.tsx





var ListPlugin = function () {
  return /*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)(LexicalListPlugin.ListPlugin, {}), /*#__PURE__*/(0,jsx_runtime.jsx)(LexicalTabIndentationPlugin.TabIndentationPlugin, {}), /*#__PURE__*/(0,jsx_runtime.jsx)(EditorMaxIndentLevelPlugin_EditorMaxIndentLevelPlugin, {
      maxDepth: 5
    })]
  });
};
/* harmony default export */ const ListPlugin_ListPlugin = (ListPlugin);
;// ./packages/picasso-rich-text-editor/src/plugins/FocusOnLabelClickPlugin/styles.ts

/* harmony default export */ const FocusOnLabelClickPlugin_styles = (function () {
  return (0,createStyles/* default */.A)({
    hiddenInput: {
      position: 'absolute',
      opacity: 0,
      zIndex: -1
    }
  });
});
;// ./packages/picasso-rich-text-editor/src/plugins/FocusOnLabelClickPlugin/FocusOnLabelClickPlugin.tsx

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
  return /*#__PURE__*/(0,jsx_runtime.jsx)("input", {
    type: "text",
    id: hiddenInputId,
    onFocus: handleFocus,
    onBlur: handleBlur,
    className: classes.hiddenInput
  });
};
FocusOnLabelClickPlugin.displayName = "FocusOnLabelClickPlugin";
/* harmony default export */ const FocusOnLabelClickPlugin_FocusOnLabelClickPlugin = (FocusOnLabelClickPlugin);
try {
    // @ts-ignore
    FocusOnLabelClickPlugin.displayName = "FocusOnLabelClickPlugin";
    // @ts-ignore
    FocusOnLabelClickPlugin.__docgenInfo = { "description": "", "displayName": "FocusOnLabelClickPlugin", "props": {} };
    // @ts-ignore
    if (typeof STORYBOOK_REACT_CLASSES !== "undefined")
        // @ts-ignore
        STORYBOOK_REACT_CLASSES["packages/picasso-rich-text-editor/src/plugins/FocusOnLabelClickPlugin/FocusOnLabelClickPlugin.tsx#FocusOnLabelClickPlugin"] = { docgenInfo: FocusOnLabelClickPlugin.__docgenInfo, name: "FocusOnLabelClickPlugin", path: "packages/picasso-rich-text-editor/src/plugins/FocusOnLabelClickPlugin/FocusOnLabelClickPlugin.tsx#FocusOnLabelClickPlugin" };
}
catch (__react_docgen_typescript_loader_error) { }
;// ./packages/picasso-rich-text-editor/src/utils/typography/typographyStyles.ts

var getHeadingMedium = function (theme) {
  return {
    color: theme.palette.common.black,
    fontWeight: theme.typography.fontWeights.semibold,
    fontSize: '16px',
    lineHeight: '24px'
  };
};
var typographyStyles = function (theme) {
  var palette = theme.palette,
    typography = theme.typography;

  // All the body variants are mapped to the same MUI variant (body1) -> declaring styles via custom class names
  return (0,createStyles/* default */.A)({
    bodyXxsmall: {
      color: palette.text.primary,
      fontWeight: typography.fontWeights.regular,
      fontSize: typography.fontSizes.xxsmall,
      lineHeight: '16px'
    },
    bodyXsmall: {
      color: palette.text.primary,
      fontWeight: typography.fontWeights.regular,
      fontSize: typography.fontSizes.xsmall,
      lineHeight: '18px'
    },
    bodySmall: {
      color: palette.text.primary,
      fontWeight: typography.fontWeights.regular,
      fontSize: typography.fontSizes.small,
      lineHeight: '20px'
    },
    bodyMedium: {
      color: palette.text.primary,
      fontWeight: typography.fontWeights.regular,
      fontSize: typography.fontSizes.medium,
      lineHeight: '22px'
    },
    bodyLarge: {
      color: palette.common.black,
      fontWeight: typography.fontWeights.regular,
      fontSize: typography.fontSizes.large,
      lineHeight: '24px'
    },
    bodyInherit: {
      fontSize: '1em',
      lineHeight: '1.5em',
      fontWeight: typography.fontWeights.regular,
      color: palette.text.primary
    },
    headingMedium: getHeadingMedium(theme),
    regular: {
      fontWeight: typography.fontWeights.regular
    },
    semibold: {
      fontWeight: typography.fontWeights.semibold
    },
    inheritWeight: {
      fontWeight: 'inherit'
    },
    green: {
      color: palette.green.dark
    },
    red: {
      color: palette.red.main
    },
    yellow: {
      color: palette.yellow.main
    },
    lightGrey: {
      color: palette.grey.light2
    },
    grey: {
      color: palette.grey.main
    },
    'greyMain-2': {
      color: palette.grey.main2
    },
    darkGrey: {
      color: palette.text.primary
    },
    black: {
      color: palette.common.black
    },
    lightBlue: {
      color: palette.blue.light
    },
    invert: {
      color: palette.common.white
    },
    inherit: {
      color: 'inherit'
    },
    blue: {
      color: palette.blue.main
    },
    solid: {
      textDecoration: 'underline',
      textDecorationStyle: 'solid'
    },
    dashed: {
      textDecoration: 'underline',
      textDecorationStyle: 'dashed'
    },
    lineThrough: {
      textDecoration: 'line-through'
    }
  });
};
// EXTERNAL MODULE: ./packages/base/Utils/dist-package/src/utils/kebab-to-camel-case.js
var kebab_to_camel_case = __webpack_require__("./packages/base/Utils/dist-package/src/utils/kebab-to-camel-case.js");
;// ./packages/picasso-rich-text-editor/src/utils/typography/get-typography-classnames.ts


var getTypographyClassName = function (classes, _ref) {
  var variant = _ref.variant,
    size = _ref.size,
    color = _ref.color,
    weight = _ref.weight,
    underline = _ref.underline,
    invert = _ref.invert,
    lineThrough = _ref.lineThrough,
    as = _ref.as;
  var variantClassName = (0,kebab_to_camel_case/* default */.A)(`${variant}-${size}`);
  var colorClassName = (0,kebab_to_camel_case/* default */.A)(`${color}`);
  var weightVariantClass = weight ? classes[weight] : undefined;
  var weightClass = weight === 'inherit' || as === 'em' ? classes.inheritWeight : weightVariantClass;
  var underlineClass = underline ? classes[underline] : undefined;
  return classnames_default()(classes[variantClassName], classes[colorClassName], weightClass, underlineClass, {
    [classes.invert]: invert,
    [classes.lineThrough]: lineThrough
  });
};
;// ./packages/picasso-rich-text-editor/src/LexicalEditor/hooks/useTypographyClasses/use-typography-classes.ts


var useCreateTypographyClasses = (0,makeStyles/* default */.A)(typographyStyles, {
  name: 'TextEditorTypography'
});
var useTypographyClasses = function (options) {
  var classes = useCreateTypographyClasses();
  return getTypographyClassName(classes, options);
};
/* harmony default export */ const use_typography_classes = (useTypographyClasses);
;// ./packages/picasso-rich-text-editor/src/LexicalEditor/hooks/useOnFocus/use-on-focus.ts

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
// EXTERNAL MODULE: ./node_modules/@lexical/link/LexicalLink.js
var LexicalLink = __webpack_require__("./node_modules/@lexical/link/LexicalLink.js");
// EXTERNAL MODULE: ./node_modules/@lexical/react/LexicalLinkPlugin.js
var LexicalLinkPlugin = __webpack_require__("./node_modules/@lexical/react/LexicalLinkPlugin.js");
// EXTERNAL MODULE: ./packages/base/Icons/dist-package/src/Icon/Link16.js
var Link16 = __webpack_require__("./packages/base/Icons/dist-package/src/Icon/Link16.js");
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url.js
var web_url = __webpack_require__("./node_modules/core-js/modules/web.url.js");
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.constructor.js
var es_regexp_constructor = __webpack_require__("./node_modules/core-js/modules/es.regexp.constructor.js");
;// ./packages/picasso-rich-text-editor/src/plugins/LinkPlugin/utils/url.ts




var SUPPORTED_URL_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'sms:', 'tel:']);
var sanitizeUrl = function (url) {
  try {
    var parsedUrl = new URL(url);
    if (!SUPPORTED_URL_PROTOCOLS.has(parsedUrl.protocol)) {
      return 'about:blank';
    }
  } catch {
    return url;
  }
  return url;
};

// Source: https://stackoverflow.com/a/8234912/2013580
var urlRegExp = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/);
var validateUrl = function (url) {
  return urlRegExp.test(url);
};
;// ./packages/picasso-rich-text-editor/src/plugins/LinkPlugin/LinkPluginButton.tsx



function LinkPluginButton_slicedToArray(r, e) { return LinkPluginButton_arrayWithHoles(r) || LinkPluginButton_iterableToArrayLimit(r, e) || LinkPluginButton_unsupportedIterableToArray(r, e) || LinkPluginButton_nonIterableRest(); }
function LinkPluginButton_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function LinkPluginButton_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return LinkPluginButton_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? LinkPluginButton_arrayLikeToArray(r, a) : void 0; } }
function LinkPluginButton_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function LinkPluginButton_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function LinkPluginButton_arrayWithHoles(r) { if (Array.isArray(r)) return r; }










var LinkPluginButton = function (_ref) {
  var testId = _ref['data-testid'];
  var _useState = (0,react.useState)(false),
    _useState2 = LinkPluginButton_slicedToArray(_useState, 2),
    active = _useState2[0],
    setActive = _useState2[1];
  var _useLexicalComposerCo = (0,LexicalComposerContext.useLexicalComposerContext)(),
    _useLexicalComposerCo2 = LinkPluginButton_slicedToArray(_useLexicalComposerCo, 1),
    editor = _useLexicalComposerCo2[0];
  var _useRTEPluginContext = useRTEPluginContext(),
    disabled = _useRTEPluginContext.disabled,
    focused = _useRTEPluginContext.focused,
    disabledFormatting = _useRTEPluginContext.disabledFormatting;
  useRTEUpdate(function () {
    var selection = (0,Lexical.$getSelection)();
    if ((0,Lexical.$isRangeSelection)(selection)) {
      var node = getSelectedNode(selection);
      var parent = node.getParent();
      setActive(Boolean((0,LexicalLink.$isLinkNode)(node) || (0,LexicalLink.$isLinkNode)(parent)));
    }
  });
  var onLinkClick = (0,react.useCallback)(function () {
    if (active) {
      return editor.dispatchCommand(LexicalLink.TOGGLE_LINK_COMMAND, null);
    }
    editor.update(function () {
      var selection = (0,Lexical.$getSelection)();
      if ((0,Lexical.$isRangeSelection)(selection)) {
        var isEmptySelection = selection.anchor.is(selection.focus);
        var url = window.prompt('URL');
        if (url != null) {
          if (!validateUrl(url)) {
            return window.alert('Not a valid URL');
          }
          var sanitizedUrl = sanitizeUrl(url);

          // When nothing is selected, we create a new Link node without dispatching
          // any commands to the original Lexical Link plugin
          if (isEmptySelection) {
            // The only way to reliably insert a link is to first create a dummy text node
            selection.insertNodes([(0,Lexical.$createTextNode)(sanitizedUrl)]);
            // Once created, node becomes selected
            var node = getSelectedNode(selection);
            var text = node.getTextContent();

            // Then we create a target Link node and replace the dummy text node with it
            var linkNode = (0,LexicalLink.$createLinkNode)(sanitizedUrl, {
              rel: 'noreferrer'
            });
            linkNode.append((0,Lexical.$createTextNode)(text));
            node.replace(linkNode);
          } else {
            // If we have a selection of any kind, pass the creation of the Link node to the plugin
            editor.dispatchCommand(LexicalLink.TOGGLE_LINK_COMMAND, {
              url: sanitizedUrl
            });
          }
        }
      }
    });
  }, [editor, active]);
  var isDisabled = disabled || !focused || disabledFormatting;
  return /*#__PURE__*/(0,jsx_runtime.jsx)(RichTextEditorButton_RichTextEditorButton, {
    icon: /*#__PURE__*/(0,jsx_runtime.jsx)(Link16/* default */.A, {}),
    onClick: onLinkClick,
    active: isDisabled ? false : active,
    disabled: isDisabled,
    "data-testid": testId
  });
};
LinkPluginButton.displayName = "LinkPluginButton";
/* harmony default export */ const LinkPlugin_LinkPluginButton = (LinkPluginButton);
try {
    // @ts-ignore
    LinkPluginButton.displayName = "LinkPluginButton";
    // @ts-ignore
    LinkPluginButton.__docgenInfo = { "description": "", "displayName": "LinkPluginButton", "props": {} };
    // @ts-ignore
    if (typeof STORYBOOK_REACT_CLASSES !== "undefined")
        // @ts-ignore
        STORYBOOK_REACT_CLASSES["packages/picasso-rich-text-editor/src/plugins/LinkPlugin/LinkPluginButton.tsx#LinkPluginButton"] = { docgenInfo: LinkPluginButton.__docgenInfo, name: "LinkPluginButton", path: "packages/picasso-rich-text-editor/src/plugins/LinkPlugin/LinkPluginButton.tsx#LinkPluginButton" };
}
catch (__react_docgen_typescript_loader_error) { }
;// ./packages/picasso-rich-text-editor/src/plugins/LinkPlugin/LinkPlugin.tsx






var PLUGIN_NAME = 'link';
var LinkPlugin = function (_ref) {
  var testId = _ref['data-testid'];
  return /*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)(Toolbar_Toolbar, {
      keyName: PLUGIN_NAME,
      children: /*#__PURE__*/(0,jsx_runtime.jsx)(LinkPlugin_LinkPluginButton, {
        "data-testid": testId
      })
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(LexicalLinkPlugin.LinkPlugin, {})]
  });
};
LinkPlugin[RTEPluginMeta] = {
  name: PLUGIN_NAME,
  lexical: {
    nodes: [LexicalLink.LinkNode]
  }
};
/* harmony default export */ const LinkPlugin_LinkPlugin = (LinkPlugin);
// EXTERNAL MODULE: ./node_modules/@emoji-mart/data/sets/15/native.json
var _15_native = __webpack_require__("./node_modules/@emoji-mart/data/sets/15/native.json");
// EXTERNAL MODULE: ./node_modules/@emoji-mart/react/dist/main.js
var main = __webpack_require__("./node_modules/@emoji-mart/react/dist/main.js");
var main_default = /*#__PURE__*/__webpack_require__.n(main);
;// ./packages/picasso-rich-text-editor/src/RichTextEditorEmojiPicker/RichTextEditorEmojiPicker.tsx

function RichTextEditorEmojiPicker_slicedToArray(r, e) { return RichTextEditorEmojiPicker_arrayWithHoles(r) || RichTextEditorEmojiPicker_iterableToArrayLimit(r, e) || RichTextEditorEmojiPicker_unsupportedIterableToArray(r, e) || RichTextEditorEmojiPicker_nonIterableRest(); }
function RichTextEditorEmojiPicker_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function RichTextEditorEmojiPicker_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return RichTextEditorEmojiPicker_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? RichTextEditorEmojiPicker_arrayLikeToArray(r, a) : void 0; } }
function RichTextEditorEmojiPicker_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function RichTextEditorEmojiPicker_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function RichTextEditorEmojiPicker_arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* eslint-disable no-inline-styles/no-inline-styles */








var TRIGGER_EMOJI_PICKER_ID = 'trigger-emoji-picker';
var RichTextEditorEmojiPicker_useStyles = (0,core.makeStyles)({
  emojiPicker: {
    position: 'absolute',
    top: 34,
    left: 0,
    zIndex: 10,
    opacity: 0,
    pointerEvents: 'none'
  },
  activeOpacity: {
    opacity: 1
  },
  activePointers: {
    pointerEvents: 'all'
  }
});
var handleEmojiPickerEscBehaviour = function (event, setShowEmojiPicker) {
  if (event.key === 'Escape') {
    setShowEmojiPicker(false);
  }
};
var RichTextEditorEmojiPicker = function (_ref) {
  var customEmojis = _ref.customEmojis,
    onInsertEmoji = _ref.onInsertEmoji,
    disabled = _ref.disabled;
  var _React$useState = react.useState(false),
    _React$useState2 = RichTextEditorEmojiPicker_slicedToArray(_React$useState, 2),
    showEmojiPicker = _React$useState2[0],
    setShowEmojiPicker = _React$useState2[1];
  var classes = RichTextEditorEmojiPicker_useStyles({
    showEmojiPicker: showEmojiPicker
  });
  var handleEmojiPickerClick = function () {
    setShowEmojiPicker(!showEmojiPicker);
  };
  var closePicker = function () {
    setShowEmojiPicker(false);
  };
  var handleEmojiInsert = function (emoji) {
    onInsertEmoji(emoji);
    setShowEmojiPicker(false);
  };
  (0,react.useEffect)(function () {
    if (!showEmojiPicker) {
      return;
    }
    document.body.addEventListener('keyup', function (event) {
      handleEmojiPickerEscBehaviour(event, setShowEmojiPicker);
    });
    return function () {
      document.body.removeEventListener('keyup', function (event) {
        handleEmojiPickerEscBehaviour(event, setShowEmojiPicker);
      });
    };
  }, [showEmojiPicker, setShowEmojiPicker]);
  return /*#__PURE__*/(0,jsx_runtime.jsxs)(Container/* default */.A, {
    style: {
      position: 'relative'
    },
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)(RichTextEditorButton_RichTextEditorButton, {
      onClick: handleEmojiPickerClick,
      icon: /*#__PURE__*/(0,jsx_runtime.jsx)(Container/* default */.A, {
        style: {
          pointerEvents: 'none'
        },
        children: "\uD83D\uDE42"
      }),
      id: TRIGGER_EMOJI_PICKER_ID,
      disabled: disabled
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(Container/* default */.A, {
      className: classnames_default()(classes.emojiPicker, showEmojiPicker && classes.activeOpacity, showEmojiPicker && classes.activePointers),
      children: /*#__PURE__*/(0,jsx_runtime.jsx)((main_default()), {
        data: _15_native,
        custom: customEmojis,
        onEmojiSelect: handleEmojiInsert,
        onClickOutside: showEmojiPicker && closePicker
      })
    })]
  });
};
RichTextEditorEmojiPicker.displayName = "RichTextEditorEmojiPicker";
try {
    // @ts-ignore
    RichTextEditorEmojiPicker.displayName = "RichTextEditorEmojiPicker";
    // @ts-ignore
    RichTextEditorEmojiPicker.__docgenInfo = { "description": "", "displayName": "RichTextEditorEmojiPicker", "props": {} };
    // @ts-ignore
    if (typeof STORYBOOK_REACT_CLASSES !== "undefined")
        // @ts-ignore
        STORYBOOK_REACT_CLASSES["packages/picasso-rich-text-editor/src/RichTextEditorEmojiPicker/RichTextEditorEmojiPicker.tsx#RichTextEditorEmojiPicker"] = { docgenInfo: RichTextEditorEmojiPicker.__docgenInfo, name: "RichTextEditorEmojiPicker", path: "packages/picasso-rich-text-editor/src/RichTextEditorEmojiPicker/RichTextEditorEmojiPicker.tsx#RichTextEditorEmojiPicker" };
}
catch (__react_docgen_typescript_loader_error) { }
;// ./packages/picasso-rich-text-editor/src/plugins/EmojiPlugin/commands/index.ts

var INSERT_EMOJI_COMMAND = (0,Lexical.createCommand)('INSERT_EMOJI_COMMAND');
var INSERT_CUSTOM_EMOJI_COMMAND = (0,Lexical.createCommand)('INSERT_CUSTOM_EMOJI_COMMAND');
// EXTERNAL MODULE: ./packages/picasso-rich-text-editor/src/utils/is-custom-emoji.ts
var is_custom_emoji = __webpack_require__("./packages/picasso-rich-text-editor/src/utils/is-custom-emoji.ts");
;// ./packages/picasso-rich-text-editor/src/plugins/EmojiPlugin/nodes/CustomEmojiNode.tsx
function CustomEmojiNode_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function CustomEmojiNode_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, CustomEmojiNode_toPropertyKey(o.key), o); } }
function CustomEmojiNode_createClass(e, r, t) { return r && CustomEmojiNode_defineProperties(e.prototype, r), t && CustomEmojiNode_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function CustomEmojiNode_toPropertyKey(t) { var i = CustomEmojiNode_toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function CustomEmojiNode_toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function CustomEmojiNode_callSuper(t, o, e) { return o = CustomEmojiNode_getPrototypeOf(o), CustomEmojiNode_possibleConstructorReturn(t, CustomEmojiNode_isNativeReflectConstruct() ? Reflect.construct(o, e || [], CustomEmojiNode_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function CustomEmojiNode_possibleConstructorReturn(t, e) { if (e && ("object" == typeof e || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return CustomEmojiNode_assertThisInitialized(t); }
function CustomEmojiNode_assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function CustomEmojiNode_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (CustomEmojiNode_isNativeReflectConstruct = function () { return !!t; })(); }
function CustomEmojiNode_getPrototypeOf(t) { return CustomEmojiNode_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, CustomEmojiNode_getPrototypeOf(t); }
function CustomEmojiNode_inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && CustomEmojiNode_setPrototypeOf(t, e); }
function CustomEmojiNode_setPrototypeOf(t, e) { return CustomEmojiNode_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, CustomEmojiNode_setPrototypeOf(t, e); }




var convertImageElement = function (domNode) {
  if (domNode instanceof HTMLImageElement) {
    var src = domNode.getAttribute('src');
    var id = domNode.getAttribute('data-emoji-name');
    if (src && id) {
      return {
        node: $createCustomEmojiNode({
          src: src,
          id: id
        })
      };
    }
    return null;
  }
  return null;
};
var CustomEmojiNode = /*#__PURE__*/function (_DecoratorNode) {
  CustomEmojiNode_inherits(CustomEmojiNode, _DecoratorNode);
  function CustomEmojiNode(src, id, key) {
    var _this;
    CustomEmojiNode_classCallCheck(this, CustomEmojiNode);
    _this = CustomEmojiNode_callSuper(this, CustomEmojiNode, [key]);
    _this.src = void 0;
    _this.id = void 0;
    _this.src = src;
    _this.id = id;
    return _this;
  }
  CustomEmojiNode_createClass(CustomEmojiNode, [{
    key: "createDOM",
    value: function createDOM(config) {
      var span = document.createElement('span');
      var theme = config.theme;
      var className = theme.customEmoji;
      if (className !== undefined) {
        span.className = className;
      }
      return span;
    }
  }, {
    key: "updateDOM",
    value: function updateDOM() {
      return false;
    }
  }, {
    key: "exportDOM",
    value: function exportDOM() {
      var element = document.createElement('img');
      element.setAttribute('src', this.src);
      element.setAttribute('data-src', this.src);
      element.setAttribute('data-emoji-name', this.id);
      return {
        element: element
      };
    }
  }, {
    key: "exportJSON",
    value: function exportJSON() {
      return {
        version: 1,
        type: 'custom-emoji',
        src: this.src,
        id: this.id
      };
    }
  }, {
    key: "isInline",
    value: function isInline() {
      return true;
    }
  }, {
    key: "decorate",
    value: function decorate() {
      return /*#__PURE__*/(0,jsx_runtime.jsx)("img", {
        src: this.src,
        "data-src": this.src,
        "data-emoji-name": this.id
      });
    }
  }], [{
    key: "getType",
    value: function getType() {
      return 'custom-emoji';
    }
  }, {
    key: "clone",
    value: function clone(node) {
      return new CustomEmojiNode(node.src, node.id);
    }
  }, {
    key: "importJSON",
    value: function importJSON(serializedNode) {
      var src = serializedNode.src,
        id = serializedNode.id;
      var node = $createCustomEmojiNode({
        src: src,
        id: id
      });
      return node;
    }
  }, {
    key: "importDOM",
    value: function importDOM() {
      return {
        img: function (element) {
          if ((0,is_custom_emoji/* default */.A)(element)) {
            return {
              conversion: convertImageElement,
              priority: 1
            };
          }

          // Return null to pass the parsing to other plugins
          return null;
        }
      };
    }
  }]);
  return CustomEmojiNode;
}(Lexical.DecoratorNode);
var $isCustomEmojiNode = function (node) {
  return node instanceof CustomEmojiNode;
};
var $createCustomEmojiNode = function (_ref) {
  var src = _ref.src,
    id = _ref.id;
  return new CustomEmojiNode(src, id);
};
try {
    // @ts-ignore
    $isCustomEmojiNode.displayName = "$isCustomEmojiNode";
    // @ts-ignore
    $isCustomEmojiNode.__docgenInfo = { "description": "", "displayName": "$isCustomEmojiNode", "props": { "__type": { "defaultValue": null, "description": "@internal", "name": "__type", "required": true, "type": { "name": "string" } }, "__key": { "defaultValue": null, "description": "@internal", "name": "__key", "required": true, "type": { "name": "string" } }, "__parent": { "defaultValue": null, "description": "@internal", "name": "__parent", "required": true, "type": { "name": "string | null" } }, "__prev": { "defaultValue": null, "description": "@internal", "name": "__prev", "required": true, "type": { "name": "string | null" } }, "__next": { "defaultValue": null, "description": "@internal", "name": "__next", "required": true, "type": { "name": "string | null" } }, "getType": { "defaultValue": null, "description": "Returns the string type of this node.", "name": "getType", "required": true, "type": { "name": "() => string" } }, "isAttached": { "defaultValue": null, "description": "Returns true if there is a path between this node and the RootNode, false otherwise.\nThis is a way of determining if the node is \"attached\" EditorState. Unattached nodes\nwon't be reconciled and will ultimatelt be cleaned up by the Lexical GC.", "name": "isAttached", "required": true, "type": { "name": "() => boolean" } }, "isSelected": { "defaultValue": null, "description": "Returns true if this node is contained within the provided Selection., false otherwise.\nRelies on the algorithms implemented in {@link BaseSelection.getNodes } to determine\nwhat's included.\n@param selection - The selection that we want to determine if the node is in.", "name": "isSelected", "required": true, "type": { "name": "(selection?: RangeSelection | NodeSelection | GridSelection | null | undefined) => boolean" } }, "getKey": { "defaultValue": null, "description": "Returns this nodes key.", "name": "getKey", "required": true, "type": { "name": "() => string" } }, "getIndexWithinParent": { "defaultValue": null, "description": "Returns the zero-based index of this node within the parent.", "name": "getIndexWithinParent", "required": true, "type": { "name": "() => number" } }, "getParent": { "defaultValue": null, "description": "Returns the parent of this node, or null if none is found.", "name": "getParent", "required": true, "type": { "name": "<T extends ElementNode>() => T | null" } }, "getParentOrThrow": { "defaultValue": null, "description": "Returns the parent of this node, or throws if none is found.", "name": "getParentOrThrow", "required": true, "type": { "name": "<T extends ElementNode>() => T" } }, "getTopLevelElement": { "defaultValue": null, "description": "Returns the highest (in the EditorState tree)\nnon-root ancestor of this node, or null if none is found. See {@link lexical !$isRootOrShadowRoot}\nfor more information on which Elements comprise \"roots\".", "name": "getTopLevelElement", "required": true, "type": { "name": "() => LexicalNode | ElementNode | null" } }, "getTopLevelElementOrThrow": { "defaultValue": null, "description": "Returns the highest (in the EditorState tree)\nnon-root ancestor of this node, or throws if none is found. See {@link lexical !$isRootOrShadowRoot}\nfor more information on which Elements comprise \"roots\".", "name": "getTopLevelElementOrThrow", "required": true, "type": { "name": "() => LexicalNode | ElementNode" } }, "getParents": { "defaultValue": null, "description": "Returns a list of the every ancestor of this node,\nall the way up to the RootNode.", "name": "getParents", "required": true, "type": { "name": "() => ElementNode[]" } }, "getParentKeys": { "defaultValue": null, "description": "Returns a list of the keys of every ancestor of this node,\nall the way up to the RootNode.", "name": "getParentKeys", "required": true, "type": { "name": "() => string[]" } }, "getPreviousSibling": { "defaultValue": null, "description": "Returns the \"previous\" siblings - that is, the node that comes\nbefore this one in the same parent.", "name": "getPreviousSibling", "required": true, "type": { "name": "<T extends LexicalNode>() => T | null" } }, "getPreviousSiblings": { "defaultValue": null, "description": "Returns the \"previous\" siblings - that is, the nodes that come between\nthis one and the first child of it's parent, inclusive.", "name": "getPreviousSiblings", "required": true, "type": { "name": "<T extends LexicalNode>() => T[]" } }, "getNextSibling": { "defaultValue": null, "description": "Returns the \"next\" siblings - that is, the node that comes\nafter this one in the same parent", "name": "getNextSibling", "required": true, "type": { "name": "<T extends LexicalNode>() => T | null" } }, "getNextSiblings": { "defaultValue": null, "description": "Returns all \"next\" siblings - that is, the nodes that come between this\none and the last child of it's parent, inclusive.", "name": "getNextSiblings", "required": true, "type": { "name": "<T extends LexicalNode>() => T[]" } }, "getCommonAncestor": { "defaultValue": null, "description": "Returns the closest common ancestor of this node and the provided one or null\nif one cannot be found.\n@param node - the other node to find the common ancestor of.", "name": "getCommonAncestor", "required": true, "type": { "name": "<T extends ElementNode = ElementNode>(node: LexicalNode) => T | null" } }, "is": { "defaultValue": null, "description": "Returns true if the provided node is the exact same one as this node, from Lexical's perspective.\nAlways use this instead of referential equality.\n@param object - the node to perform the equality comparison on.", "name": "is", "required": true, "type": { "name": "(object: LexicalNode | null | undefined) => boolean" } }, "isBefore": { "defaultValue": null, "description": "Returns true if this node logical precedes the target node in the editor state.\n@param targetNode - the node we're testing to see if it's after this one.", "name": "isBefore", "required": true, "type": { "name": "(targetNode: LexicalNode) => boolean" } }, "isParentOf": { "defaultValue": null, "description": "Returns true if this node is the parent of the target node, false otherwise.\n@param targetNode - the would-be child node.", "name": "isParentOf", "required": true, "type": { "name": "(targetNode: LexicalNode) => boolean" } }, "getNodesBetween": { "defaultValue": null, "description": "Returns a list of nodes that are between this node and\nthe target node in the EditorState.\n@param targetNode - the node that marks the other end of the range of nodes to be returned.", "name": "getNodesBetween", "required": true, "type": { "name": "(targetNode: LexicalNode) => LexicalNode[]" } }, "isDirty": { "defaultValue": null, "description": "Returns true if this node has been marked dirty during this update cycle.", "name": "isDirty", "required": true, "type": { "name": "() => boolean" } }, "getLatest": { "defaultValue": null, "description": "Returns the latest version of the node from the active EditorState.\nThis is used to avoid getting values from stale node references.", "name": "getLatest", "required": true, "type": { "name": "() => LexicalNode" } }, "getWritable": { "defaultValue": null, "description": "Returns a mutable version of the node. Will throw an error if\ncalled outside of a Lexical Editor {@link LexicalEditor.update} callback.", "name": "getWritable", "required": true, "type": { "name": "() => LexicalNode" } }, "getTextContent": { "defaultValue": null, "description": "Returns the text content of the node. Override this for\ncustom nodes that should have a representation in plain text\nformat (for copy + paste, for example)", "name": "getTextContent", "required": true, "type": { "name": "() => string" } }, "getTextContentSize": { "defaultValue": null, "description": "Returns the length of the string produced by calling getTextContent on this node.", "name": "getTextContentSize", "required": true, "type": { "name": "() => number" } }, "createDOM": { "defaultValue": null, "description": "Called during the reconciliation process to determine which nodes\nto insert into the DOM for this Lexical Node.\n\nThis method must return exactly one HTMLElement. Nested elements are not supported.\n\nDo not attempt to update the Lexical EditorState during this phase of the update lifecyle.\n@param _config - allows access to things like the EditorTheme (to apply classes) during reconciliation.\n@param _editor - allows access to the editor for context during reconciliation.", "name": "createDOM", "required": true, "type": { "name": "(_config: EditorConfig, _editor: LexicalEditor) => HTMLElement" } }, "updateDOM": { "defaultValue": null, "description": "Called when a node changes and should update the DOM\nin whatever way is necessary to make it align with any changes that might\nhave happened during the update.\n\nReturning \"true\" here will cause lexical to unmount and recreate the DOM node\n(by calling createDOM). You would need to do this if the element tag changes,\nfor instance.", "name": "updateDOM", "required": true, "type": { "name": "(_prevNode: unknown, _dom: HTMLElement, _config: EditorConfig) => boolean" } }, "exportDOM": { "defaultValue": null, "description": "Controls how the this node is serialized to HTML. This is important for\ncopy and paste between Lexical and non-Lexical editors, or Lexical editors with different namespaces,\nin which case the primary transfer format is HTML. It's also important if you're serializing\nto HTML for any other reason via {@link @lexical/html!$generateHtmlFromNodes}. You could\nalso use this method to build your own HTML renderer.", "name": "exportDOM", "required": true, "type": { "name": "(editor: LexicalEditor) => DOMExportOutput" } }, "exportJSON": { "defaultValue": null, "description": "Controls how the this node is serialized to JSON. This is important for\ncopy and paste between Lexical editors sharing the same namespace. It's also important\nif you're serializing to JSON for persistent storage somewhere.\nSee [Serialization & Deserialization](https://lexical.dev/docs/concepts/serialization#lexical---html).", "name": "exportJSON", "required": true, "type": { "name": "() => SerializedLexicalNode" } }, "remove": { "defaultValue": null, "description": "Removes this LexicalNode from the EditorState. If the node isn't re-inserted\nsomewhere, the Lexical garbage collector will eventually clean it up.\n@param preserveEmptyParent - If falsy, the node's parent will be removed if\nit's empty after the removal operation. This is the default behavior, subject to\nother node heuristics such as {@link ElementNode#canBeEmpty }", "name": "remove", "required": true, "type": { "name": "(preserveEmptyParent?: boolean | undefined) => void" } }, "replace": { "defaultValue": null, "description": "Replaces this LexicalNode with the provided node, optionally transferring the children\nof the replaced node to the replacing node.\n@param replaceWith - The node to replace this one with.\n@param includeChildren - Whether or not to transfer the children of this node to the replacing node.", "name": "replace", "required": true, "type": { "name": "<N extends LexicalNode>(replaceWith: N, includeChildren?: boolean | undefined) => N" } }, "insertAfter": { "defaultValue": null, "description": "Inserts a node after this LexicalNode (as the next sibling).\n@param nodeToInsert - The node to insert after this one.\n@param restoreSelection - Whether or not to attempt to resolve the\nselection to the appropriate place after the operation is complete.", "name": "insertAfter", "required": true, "type": { "name": "(nodeToInsert: LexicalNode, restoreSelection?: boolean | undefined) => LexicalNode" } }, "insertBefore": { "defaultValue": null, "description": "Inserts a node before this LexicalNode (as the previous sibling).\n@param nodeToInsert - The node to insert after this one.\n@param restoreSelection - Whether or not to attempt to resolve the\nselection to the appropriate place after the operation is complete.", "name": "insertBefore", "required": true, "type": { "name": "(nodeToInsert: LexicalNode, restoreSelection?: boolean | undefined) => LexicalNode" } }, "isParentRequired": { "defaultValue": null, "description": "Whether or not this node has a required parent. Used during copy + paste operations\nto normalize nodes that would otherwise be orphaned. For example, ListItemNodes without\na ListNode parent or TextNodes with a ParagraphNode parent.", "name": "isParentRequired", "required": true, "type": { "name": "() => boolean" } }, "createParentElementNode": { "defaultValue": null, "description": "The creation logic for any required parent. Should be implemented if {@link isParentRequired} returns true.", "name": "createParentElementNode", "required": true, "type": { "name": "() => ElementNode" } }, "selectPrevious": { "defaultValue": null, "description": "Moves selection to the previous sibling of this node, at the specified offsets.\n@param anchorOffset - The anchor offset for selection.\n@param focusOffset -  The focus offset for selection", "name": "selectPrevious", "required": true, "type": { "name": "(anchorOffset?: number | undefined, focusOffset?: number | undefined) => RangeSelection" } }, "selectNext": { "defaultValue": null, "description": "Moves selection to the next sibling of this node, at the specified offsets.\n@param anchorOffset - The anchor offset for selection.\n@param focusOffset -  The focus offset for selection", "name": "selectNext", "required": true, "type": { "name": "(anchorOffset?: number | undefined, focusOffset?: number | undefined) => RangeSelection" } }, "markDirty": { "defaultValue": null, "description": "Marks a node dirty, triggering transforms and\nforcing it to be reconciled during the update cycle.", "name": "markDirty", "required": true, "type": { "name": "() => void" } } } };
    // @ts-ignore
    if (typeof STORYBOOK_REACT_CLASSES !== "undefined")
        // @ts-ignore
        STORYBOOK_REACT_CLASSES["packages/picasso-rich-text-editor/src/plugins/EmojiPlugin/nodes/CustomEmojiNode.tsx#$isCustomEmojiNode"] = { docgenInfo: $isCustomEmojiNode.__docgenInfo, name: "$isCustomEmojiNode", path: "packages/picasso-rich-text-editor/src/plugins/EmojiPlugin/nodes/CustomEmojiNode.tsx#$isCustomEmojiNode" };
}
catch (__react_docgen_typescript_loader_error) { }
try {
    // @ts-ignore
    $createCustomEmojiNode.displayName = "$createCustomEmojiNode";
    // @ts-ignore
    $createCustomEmojiNode.__docgenInfo = { "description": "", "displayName": "$createCustomEmojiNode", "props": {} };
    // @ts-ignore
    if (typeof STORYBOOK_REACT_CLASSES !== "undefined")
        // @ts-ignore
        STORYBOOK_REACT_CLASSES["packages/picasso-rich-text-editor/src/plugins/EmojiPlugin/nodes/CustomEmojiNode.tsx#$createCustomEmojiNode"] = { docgenInfo: $createCustomEmojiNode.__docgenInfo, name: "$createCustomEmojiNode", path: "packages/picasso-rich-text-editor/src/plugins/EmojiPlugin/nodes/CustomEmojiNode.tsx#$createCustomEmojiNode" };
}
catch (__react_docgen_typescript_loader_error) { }
;// ./packages/picasso-rich-text-editor/src/plugins/EmojiPlugin/EmojiPlugin.tsx

function EmojiPlugin_slicedToArray(r, e) { return EmojiPlugin_arrayWithHoles(r) || EmojiPlugin_iterableToArrayLimit(r, e) || EmojiPlugin_unsupportedIterableToArray(r, e) || EmojiPlugin_nonIterableRest(); }
function EmojiPlugin_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function EmojiPlugin_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return EmojiPlugin_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? EmojiPlugin_arrayLikeToArray(r, a) : void 0; } }
function EmojiPlugin_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function EmojiPlugin_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function EmojiPlugin_arrayWithHoles(r) { if (Array.isArray(r)) return r; }









var EmojiPlugin_PLUGIN_NAME = 'emoji';
var EmojiPlugin = function (_ref) {
  var customEmojis = _ref.customEmojis;
  var _useLexicalComposerCo = (0,LexicalComposerContext.useLexicalComposerContext)(),
    _useLexicalComposerCo2 = EmojiPlugin_slicedToArray(_useLexicalComposerCo, 1),
    editor = _useLexicalComposerCo2[0];
  var _useRTEPluginContext = useRTEPluginContext(),
    disabled = _useRTEPluginContext.disabled,
    focused = _useRTEPluginContext.focused;
  var handleInsertEmoji = (0,react.useCallback)(function (emoji) {
    var isNativeEmoji = 'native' in emoji;
    var isCustomEmoji = 'src' in emoji;
    if (isNativeEmoji) {
      editor.dispatchCommand(INSERT_EMOJI_COMMAND, emoji.native);
    }
    if (isCustomEmoji) {
      editor.dispatchCommand(INSERT_CUSTOM_EMOJI_COMMAND, {
        src: emoji.src,
        id: emoji.id
      });
    }
  }, [editor]);
  (0,react.useEffect)(function () {
    return (0,LexicalUtils.mergeRegister)(editor.registerCommand(INSERT_EMOJI_COMMAND, function (nativeEmoji) {
      (0,Lexical.$insertNodes)([(0,Lexical.$createTextNode)(nativeEmoji)]);
      return true;
    }, Lexical.COMMAND_PRIORITY_EDITOR), editor.registerCommand(INSERT_CUSTOM_EMOJI_COMMAND, function (customEmojiPayload) {
      var emojiNode = $createCustomEmojiNode(customEmojiPayload);
      (0,Lexical.$insertNodes)([emojiNode]);
      return true;
    }, Lexical.COMMAND_PRIORITY_EDITOR));
  }, [editor]);
  return /*#__PURE__*/(0,jsx_runtime.jsx)(Toolbar_Toolbar, {
    keyName: EmojiPlugin_PLUGIN_NAME,
    children: /*#__PURE__*/(0,jsx_runtime.jsx)(RichTextEditorEmojiPicker, {
      customEmojis: customEmojis,
      onInsertEmoji: handleInsertEmoji,
      disabled: disabled || !focused
    })
  });
};
EmojiPlugin.displayName = "EmojiPlugin";
EmojiPlugin[RTEPluginMeta] = {
  name: EmojiPlugin_PLUGIN_NAME,
  lexical: {
    nodes: [CustomEmojiNode]
  }
};
/* harmony default export */ const EmojiPlugin_EmojiPlugin = (EmojiPlugin);
;// ./packages/picasso-rich-text-editor/src/LexicalEditor/hooks/useComponentPlugins/useComponentPlugins.tsx





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
        return /*#__PURE__*/(0,jsx_runtime.jsx)(LinkPlugin_LinkPlugin, {});
      case 'emoji':
        return /*#__PURE__*/(0,jsx_runtime.jsx)(EmojiPlugin_EmojiPlugin, {
          customEmojis: customEmojis
        });
      default:
        return plugin;
    }
  }).filter(uniquePlugins());
  var componentPlugins = mappedPlugins.filter(isRTEPluginElement);
  var lexicalNodes = componentPlugins.flatMap(function (plugin) {
    var _plugin$type$RTEPlugi, _plugin$type$RTEPlugi2, _plugin$type$RTEPlugi3;
    return (_plugin$type$RTEPlugi = (_plugin$type$RTEPlugi2 = plugin.type[RTEPluginMeta]) === null || _plugin$type$RTEPlugi2 === void 0 ? void 0 : (_plugin$type$RTEPlugi3 = _plugin$type$RTEPlugi2.lexical) === null || _plugin$type$RTEPlugi3 === void 0 ? void 0 : _plugin$type$RTEPlugi3.nodes) !== null && _plugin$type$RTEPlugi !== void 0 ? _plugin$type$RTEPlugi : [];
  });
  return {
    lexicalNodes: lexicalNodes,
    componentPlugins: componentPlugins.map(function (el) {
      var _el$type$RTEPluginMet;
      return /*#__PURE__*/(0,react.cloneElement)(el, {
        key: (_el$type$RTEPluginMet = el.type[RTEPluginMeta]) === null || _el$type$RTEPluginMet === void 0 ? void 0 : _el$type$RTEPluginMet.name
      });
    })
  };
};
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.reduce.js
var es_array_reduce = __webpack_require__("./node_modules/core-js/modules/es.array.reduce.js");
// EXTERNAL MODULE: ./packages/shared/dist-package/src/styles/index.js
var src_styles = __webpack_require__("./packages/shared/dist-package/src/styles/index.js");
// EXTERNAL MODULE: ./packages/picasso-rich-text-editor/src/RichText/components/styles.ts
var components_styles = __webpack_require__("./packages/picasso-rich-text-editor/src/RichText/components/styles.ts");
;// ./packages/picasso-rich-text-editor/src/LexicalEditor/styles.ts




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
var IndentLevels = /*#__PURE__*/function (IndentLevels) {
  IndentLevels[IndentLevels["Decimal"] = 4] = "Decimal";
  IndentLevels[IndentLevels["LowerRoman"] = 3] = "LowerRoman";
  IndentLevels[IndentLevels["LowerAlpha2"] = 2] = "LowerAlpha2";
  IndentLevels[IndentLevels["LowerAlpha5"] = 5] = "LowerAlpha5";
  return IndentLevels;
}(IndentLevels || {});
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
    editorContainer: Object.assign({
      height: '12.5em',
      overflowY: 'hidden',
      resize: 'vertical',
      position: 'relative',
      fontSize: '14px'
    }, listStyles, margins),
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
;// ./packages/picasso-rich-text-editor/src/LexicalEditor/utils/create-lexical-theme.ts
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
;// ./packages/picasso-rich-text-editor/src/LexicalEditor/utils/get-dom-value.ts

var getDomValue = function (value) {
  var parser = new DOMParser();
  return parser.parseFromString(hast_util_to_html_default()(value), 'text/html');
};
;// ./packages/picasso-rich-text-editor/src/LexicalEditor/utils/set-editor-value.ts



var setEditorValue = function (editor, value) {
  var _value$children;
  var root = (0,Lexical.$getRoot)();
  var isEmptyRootValue = (value === null || value === void 0 ? void 0 : (_value$children = value.children) === null || _value$children === void 0 ? void 0 : _value$children.length) === 0;
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
;// ./packages/picasso-rich-text-editor/src/LexicalEditor/utils/cleanup-html-output.ts

function cleanup_html_output_slicedToArray(r, e) { return cleanup_html_output_arrayWithHoles(r) || cleanup_html_output_iterableToArrayLimit(r, e) || cleanup_html_output_unsupportedIterableToArray(r, e) || cleanup_html_output_nonIterableRest(); }
function cleanup_html_output_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function cleanup_html_output_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return cleanup_html_output_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? cleanup_html_output_arrayLikeToArray(r, a) : void 0; } }
function cleanup_html_output_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function cleanup_html_output_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function cleanup_html_output_arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var NodeTypes = /*#__PURE__*/function (NodeTypes) {
  NodeTypes["Parent"] = "parent";
  NodeTypes["Child"] = "child";
  return NodeTypes;
}(NodeTypes || {});
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
      var _element$parentElemen;
      var elementParentTag = (_element$parentElemen = element.parentElement) === null || _element$parentElemen === void 0 ? void 0 : _element$parentElemen.tagName.toLocaleLowerCase();
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
    var currentLi = list.parentNode;
    if ((currentLi === null || currentLi === void 0 ? void 0 : currentLi.children.length) === 1) {
      var previousLi = currentLi.previousElementSibling;
      if (previousLi) {
        var _currentLi$parentNode;
        currentLi.removeChild(list);
        previousLi.appendChild(list);
        currentLi === null || currentLi === void 0 ? void 0 : (_currentLi$parentNode = currentLi.parentNode) === null || _currentLi$parentNode === void 0 ? void 0 : _currentLi$parentNode.removeChild(currentLi);
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
;// ./packages/picasso-rich-text-editor/src/LexicalEditor/LexicalEditor.tsx
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
  return /*#__PURE__*/(0,jsx_runtime.jsx)(LexicalComposer.LexicalComposer, {
    initialConfig: editorConfig,
    children: /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      onFocus: handleFocus,
      onBlur: handleBlur,
      tabIndex: -1,
      children: /*#__PURE__*/(0,jsx_runtime.jsxs)(RTEPluginContextProvider, {
        disabled: disabled,
        focused: focused,
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)(LexicalEditorToolbarPlugin_LexicalEditorToolbarPlugin, {
          toolbarRef: toolbarRef
          // remount Toolbar when disabled
          ,

          testIds: testIds,
          id: id
        }, `${disabled || !focused}`), defaultValue ? /*#__PURE__*/(0,jsx_runtime.jsx)(TriggerInitialOnChangePlugin_TriggerInitialOnChangePlugin, {
          onChange: handleChange
        }) : null, /*#__PURE__*/(0,jsx_runtime.jsx)(LexicalOnChangePlugin.OnChangePlugin, {
          ignoreSelectionChange: true,
          onChange: handleChange
        }), autoFocus && /*#__PURE__*/(0,jsx_runtime.jsx)(LexicalAutoFocusPlugin.AutoFocusPlugin, {}), /*#__PURE__*/(0,jsx_runtime.jsx)(HeadingsReplacementPlugin_HeadingsReplacementPlugin, {}), /*#__PURE__*/(0,jsx_runtime.jsx)(TextLengthPlugin_TextLengthPlugin, {
          onTextLengthChange: onTextLengthChange
        }), /*#__PURE__*/(0,jsx_runtime.jsx)(ListPlugin_ListPlugin, {}), /*#__PURE__*/(0,jsx_runtime.jsx)(LexicalHistoryPlugin.HistoryPlugin, {}), hiddenInputId && /*#__PURE__*/(0,jsx_runtime.jsx)(FocusOnLabelClickPlugin_FocusOnLabelClickPlugin, {
          hiddenInputId: hiddenInputId
        }), componentPlugins, /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
          className: classes.editorContainer,
          id: id,
          ref: ref,
          children: /*#__PURE__*/(0,jsx_runtime.jsx)(LexicalRichTextPlugin.RichTextPlugin, {
            contentEditable: /*#__PURE__*/(0,jsx_runtime.jsx)(LexicalContentEditable.ContentEditable, {
              className: classes.contentEditable,
              "data-testid": testIds === null || testIds === void 0 ? void 0 : testIds.editor
            }),
            placeholder: /*#__PURE__*/(0,jsx_runtime.jsx)(Container/* default */.A, {
              left: "xsmall",
              top: "small",
              className: classes.placeholder,
              children: /*#__PURE__*/(0,jsx_runtime.jsx)(Typography/* default */.A, {
                size: "medium",
                color: "grey-main-2",
                children: placeholder
              })
            }),
            ErrorBoundary: (LexicalErrorBoundary_default())
          })
        })]
      })
    })
  });
});
LexicalEditor.displayName = 'LexicalEditor';
/* harmony default export */ const LexicalEditor_LexicalEditor = (LexicalEditor);
try {
    // @ts-ignore
    LexicalEditor.displayName = "LexicalEditor";
    // @ts-ignore
    LexicalEditor.__docgenInfo = { "description": "", "displayName": "LexicalEditor", "props": { "className": { "defaultValue": null, "description": "Classnames applied to root element", "name": "className", "required": false, "type": { "name": "string | undefined" } }, "style": { "defaultValue": null, "description": "Style applied to root element", "name": "style", "required": false, "type": { "name": "CSSProperties | undefined" } }, "autoFocus": { "defaultValue": null, "description": "Indicates that an element is to be focused on page load", "name": "autoFocus", "required": false, "type": { "name": "boolean | undefined" } }, "defaultValue": { "defaultValue": null, "description": "Default value in [HAST](https://github.com/syntax-tree/hast) format", "name": "defaultValue", "required": false, "type": { "name": "ASTType | undefined" } }, "disabled": { "defaultValue": null, "description": "This Boolean attribute indicates that the user cannot interact with the control.", "name": "disabled", "required": false, "type": { "name": "boolean | undefined" } }, "id": { "defaultValue": null, "description": "unique identifier", "name": "id", "required": true, "type": { "name": "string" } }, "onChange": { "defaultValue": null, "description": "Callback on text change", "name": "onChange", "required": false, "type": { "name": "ChangeHandler | undefined" } }, "onBlur": { "defaultValue": null, "description": "Callback for blur event", "name": "onBlur", "required": false, "type": { "name": "(() => void) | undefined" } }, "onFocus": { "defaultValue": null, "description": "Callback for focus event", "name": "onFocus", "required": false, "type": { "name": "(() => void) | undefined" } }, "onTextLengthChange": { "defaultValue": null, "description": "Callback on text length change", "name": "onTextLengthChange", "required": true, "type": { "name": "TextLengthChangeHandler" } }, "placeholder": { "defaultValue": null, "description": "The placeholder attribute specifies a short hint that describes the expected value of a text editor.", "name": "placeholder", "required": false, "type": { "name": "string | undefined" } }, "plugins": { "defaultValue": null, "description": "List of plugins to enable on the editor", "name": "plugins", "required": false, "type": { "name": "EditorPlugin[] | undefined" } } } };
    // @ts-ignore
    if (typeof STORYBOOK_REACT_CLASSES !== "undefined")
        // @ts-ignore
        STORYBOOK_REACT_CLASSES["packages/picasso-rich-text-editor/src/LexicalEditor/LexicalEditor.tsx#LexicalEditor"] = { docgenInfo: LexicalEditor.__docgenInfo, name: "LexicalEditor", path: "packages/picasso-rich-text-editor/src/LexicalEditor/LexicalEditor.tsx#LexicalEditor" };
}
catch (__react_docgen_typescript_loader_error) { }

/***/ })

}]);
//# sourceMappingURL=437.f83e0db3.iframe.bundle.js.map