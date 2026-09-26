"use strict";
(globalThis["webpackChunk_toptal_picasso_root"] = globalThis["webpackChunk_toptal_picasso_root"] || []).push([[634],{

/***/ "./packages/picasso-rich-text-editor/src/RichTextEditorEmojiPicker/EmojiMartPicker.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _emoji_mart_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@emoji-mart/data/sets/15/native.json");
/* harmony import */ var emoji_mart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/emoji-mart/dist/main.js");
/* harmony import */ var emoji_mart__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(emoji_mart__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/react/jsx-runtime.js");




// emoji-mart re-applies every key passed to `update` and rebuilds its grid for
// `custom`, so only changed props are pushed
var getChangedProps = function (previous, next) {
  var keys = Object.keys(Object.assign({}, previous, next));
  var changedKeys = keys.filter(function (key) {
    return previous[key] !== next[key];
  });
  return changedKeys.length ? Object.fromEntries(changedKeys.map(function (key) {
    return [key, next[key]];
  })) : undefined;
};

/**
 * Renders emoji-mart's `Picker` with the native emoji set. Keep every
 * emoji-mart import in this module, so they all load lazily with it.
 *
 * `Picker` appends itself to the `ref` element, so it is constructed after the
 * first commit and fed changed props through `update` after that; an effect
 * replay (StrictMode, Fast Refresh) finds it already constructed.
 */
var EmojiMartPicker = function (props) {
  var containerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var pickerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var pushedPropsRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(props);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!pickerRef.current) {
      pickerRef.current = new emoji_mart__WEBPACK_IMPORTED_MODULE_1__.Picker(Object.assign({}, props, {
        data: _emoji_mart_data__WEBPACK_IMPORTED_MODULE_3__,
        ref: containerRef
      }));
    } else {
      var changedProps = getChangedProps(pushedPropsRef.current, props);
      if (changedProps) {
        pickerRef.current.update(changedProps);
      }
    }
    pushedPropsRef.current = props;
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    ref: containerRef
  });
};
EmojiMartPicker.displayName = "EmojiMartPicker";
EmojiMartPicker.displayName = 'EmojiMartPicker';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EmojiMartPicker);
try {
    // @ts-ignore
    EmojiMartPicker.displayName = "EmojiMartPicker";
    // @ts-ignore
    EmojiMartPicker.__docgenInfo = { "description": "Renders emoji-mart's `Picker` with the native emoji set. Keep every\nemoji-mart import in this module, so they all load lazily with it.\n\n`Picker` appends itself to the `ref` element, so it is constructed after the\nfirst commit and fed changed props through `update` after that; an effect\nreplay (StrictMode, Fast Refresh) finds it already constructed.", "displayName": "EmojiMartPicker", "props": { "custom": { "defaultValue": null, "description": "Additional groups of custom emojis appended to the picker", "name": "custom", "required": false, "type": { "name": "CustomEmojiGroup[] | undefined" } }, "onEmojiSelect": { "defaultValue": null, "description": "Called with the picked emoji when a selection is made", "name": "onEmojiSelect", "required": true, "type": { "name": "(emoji: Emoji) => void" } }, "onClickOutside": { "defaultValue": null, "description": "Called with the click event when a click lands outside the picker", "name": "onClickOutside", "required": false, "type": { "name": "((event: MouseEvent) => void) | undefined" } } } };
    // @ts-ignore
    if (typeof STORYBOOK_REACT_CLASSES !== "undefined")
        // @ts-ignore
        STORYBOOK_REACT_CLASSES["packages/picasso-rich-text-editor/src/RichTextEditorEmojiPicker/EmojiMartPicker.tsx#EmojiMartPicker"] = { docgenInfo: EmojiMartPicker.__docgenInfo, name: "EmojiMartPicker", path: "packages/picasso-rich-text-editor/src/RichTextEditorEmojiPicker/EmojiMartPicker.tsx#EmojiMartPicker" };
}
catch (__react_docgen_typescript_loader_error) { }

/***/ })

}]);
//# sourceMappingURL=634.ecd12447.iframe.bundle.js.map