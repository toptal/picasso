"use strict";
(globalThis["webpackChunk_toptal_picasso_root"] = globalThis["webpackChunk_toptal_picasso_root"] || []).push([[890],{

/***/ "./packages/picasso-rich-text-editor/dist-package/src/RichTextEditorEmojiPicker/EmojiMartPicker.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _emoji_mart_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@emoji-mart/data/sets/15/native.json");
/* harmony import */ var emoji_mart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/emoji-mart/dist/main.js");
/* harmony import */ var emoji_mart__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(emoji_mart__WEBPACK_IMPORTED_MODULE_1__);



// emoji-mart re-applies every key passed to `update` and rebuilds its grid for
// `custom`, so only changed props are pushed
var getChangedProps = function (previous, next) {
  var keys = Object.keys(Object.assign(Object.assign({}, previous), next));
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
      pickerRef.current = new emoji_mart__WEBPACK_IMPORTED_MODULE_1__.Picker(Object.assign(Object.assign({}, props), {
        data: _emoji_mart_data__WEBPACK_IMPORTED_MODULE_2__,
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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    ref: containerRef
  });
};
EmojiMartPicker.displayName = 'EmojiMartPicker';
EmojiMartPicker.__docgenInfo = {
  "description": "Renders emoji-mart's `Picker` with the native emoji set. Keep every\nemoji-mart import in this module, so they all load lazily with it.\n\n`Picker` appends itself to the `ref` element, so it is constructed after the\nfirst commit and fed changed props through `update` after that; an effect\nreplay (StrictMode, Fast Refresh) finds it already constructed.",
  "methods": [],
  "displayName": "EmojiMartPicker"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EmojiMartPicker);
if (typeof STORYBOOK_REACT_CLASSES !== "undefined") {
  STORYBOOK_REACT_CLASSES["packages/picasso-rich-text-editor/dist-package/src/RichTextEditorEmojiPicker/EmojiMartPicker.js"] = {
    name: "EmojiMartPicker",
    docgenInfo: EmojiMartPicker.__docgenInfo,
    path: "packages/picasso-rich-text-editor/dist-package/src/RichTextEditorEmojiPicker/EmojiMartPicker.js"
  };
}

/***/ })

}]);
//# sourceMappingURL=890.dc97d842.iframe.bundle.js.map