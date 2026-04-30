(globalThis["webpackChunk_toptal_picasso_root"] = globalThis["webpackChunk_toptal_picasso_root"] || []).push([[274],{

/***/ "./node_modules/@lexical/dragon/LexicalDragon.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const LexicalDragon =  false ? 0 : __webpack_require__("./node_modules/@lexical/dragon/LexicalDragon.prod.js")
module.exports = LexicalDragon;

/***/ }),

/***/ "./node_modules/@lexical/dragon/LexicalDragon.prod.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var g=__webpack_require__("./node_modules/lexical/Lexical.js");
exports.registerDragonSupport=function(m){let t=window.location.origin,r=l=>{if(l.origin===t){var h=m.getRootElement();if(document.activeElement===h&&(h=l.data,"string"===typeof h)){try{var a=JSON.parse(h)}catch(k){return}if(a&&"nuanria_messaging"===a.protocol&&"request"===a.type&&(a=a.payload)&&"makeChanges"===a.functionId&&(a=a.args)){const [k,n,p,q,u]=a;m.update(()=>{const f=g.$getSelection();if(g.$isRangeSelection(f)){var e=f.anchor;let b=e.getNode(),c=0,d=0;g.$isTextNode(b)&&0<=k&&0<=n&&(c=k,
d=k+n,f.setTextNodeRange(b,c,b,d));if(c!==d||""!==p)f.insertRawText(p),b=e.getNode();g.$isTextNode(b)&&(c=q,d=q+u,e=b.getTextContentSize(),c=c>e?e:c,d=d>e?e:d,f.setTextNodeRange(b,c,b,d));l.stopImmediatePropagation()}})}}}};window.addEventListener("message",r,!0);return()=>{window.removeEventListener("message",r,!0)}}


/***/ }),

/***/ "./node_modules/@lexical/history/LexicalHistory.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const LexicalHistory =  false ? 0 : __webpack_require__("./node_modules/@lexical/history/LexicalHistory.prod.js")
module.exports = LexicalHistory;

/***/ }),

/***/ "./node_modules/@lexical/history/LexicalHistory.prod.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var c=__webpack_require__("./node_modules/@lexical/utils/LexicalUtils.js"),x=__webpack_require__("./node_modules/lexical/Lexical.js");
function y(b,a,l,h,n){if(null===b||0===l.size&&0===h.size&&!n)return 0;var f=a._selection,d=b._selection;if(n)return 1;if(!(x.$isRangeSelection(f)&&x.$isRangeSelection(d)&&d.isCollapsed()&&f.isCollapsed()))return 0;n=a._nodeMap;let e=[];for(let m of l)l=n.get(m),void 0!==l&&e.push(l);for(let [m,p]of h)p&&(h=n.get(m),void 0===h||x.$isRootNode(h)||e.push(h));if(0===e.length)return 0;if(1<e.length)return h=a._nodeMap,a=h.get(f.anchor.key),d=h.get(d.anchor.key),a&&d&&!b._nodeMap.has(a.__key)&&x.$isTextNode(a)&&
1===a.__text.length&&1===f.anchor.offset?2:0;a=e[0];b=b._nodeMap.get(a.__key);if(!x.$isTextNode(b)||!x.$isTextNode(a)||b.__mode!==a.__mode)return 0;b=b.__text;a=a.__text;if(b===a)return 0;f=f.anchor;d=d.anchor;if(f.key!==d.key||"text"!==f.type)return 0;f=f.offset;d=d.offset;b=a.length-b.length;return 1===b&&d===f-1?2:-1===b&&d===f+1?3:-1===b&&d===f?4:0}
function z(b,a){let l=Date.now(),h=0;return(n,f,d,e,m,p)=>{let r=Date.now();if(p.has("historic"))return h=0,l=r,2;let q=y(n,f,e,m,b.isComposing()),v=(()=>{var k=null===d||d.editor===b,g=p.has("history-push");if(!g&&k&&p.has("history-merge"))return 0;if(null===n)return 1;var t=f._selection;if(!(0<e.size||0<m.size))return null!==t?0:2;if(!1===g&&0!==q&&q===h&&r<l+a&&k)return 0;if(1===e.size){{g=Array.from(e)[0];k=n._nodeMap.get(g);g=f._nodeMap.get(g);t=n._selection;let u=f._selection,w=!1;x.$isRangeSelection(t)&&
x.$isRangeSelection(u)&&(w="element"===t.anchor.type&&"element"===t.focus.type&&"text"===u.anchor.type&&"text"===u.focus.type);k=!w&&x.$isTextNode(k)&&x.$isTextNode(g)?k.__type===g.__type&&k.__text===g.__text&&k.__mode===g.__mode&&k.__detail===g.__detail&&k.__style===g.__style&&k.__format===g.__format&&k.__parent===g.__parent:!1}if(k)return 0}return 1})();l=r;h=q;return v}}exports.createEmptyHistoryState=function(){return{current:null,redoStack:[],undoStack:[]}};
exports.registerHistory=function(b,a,l){let h=z(b,l);l=({editorState:d,prevEditorState:e,dirtyLeaves:m,dirtyElements:p,tags:r})=>{const q=a.current,v=a.redoStack,k=a.undoStack,g=null===q?null:q.editorState;if(null===q||d!==g){e=h(e,d,q,m,p,r);if(1===e)0!==v.length&&(a.redoStack=[],b.dispatchCommand(x.CAN_REDO_COMMAND,!1)),null!==q&&(k.push({...q}),b.dispatchCommand(x.CAN_UNDO_COMMAND,!0));else if(2===e)return;a.current={editor:b,editorState:d}}};let n=c.mergeRegister(b.registerCommand(x.UNDO_COMMAND,
()=>{let d=a.redoStack,e=a.undoStack;if(0!==e.length){let m=a.current,p=e.pop();null!==m&&(d.push(m),b.dispatchCommand(x.CAN_REDO_COMMAND,!0));0===e.length&&b.dispatchCommand(x.CAN_UNDO_COMMAND,!1);a.current=p||null;p&&p.editor.setEditorState(p.editorState,{tag:"historic"})}return!0},x.COMMAND_PRIORITY_EDITOR),b.registerCommand(x.REDO_COMMAND,()=>{let d=a.redoStack;var e=a.undoStack;if(0!==d.length){let m=a.current;null!==m&&(e.push(m),b.dispatchCommand(x.CAN_UNDO_COMMAND,!0));e=d.pop();0===d.length&&
b.dispatchCommand(x.CAN_REDO_COMMAND,!1);a.current=e||null;e&&e.editor.setEditorState(e.editorState,{tag:"historic"})}return!0},x.COMMAND_PRIORITY_EDITOR),b.registerCommand(x.CLEAR_EDITOR_COMMAND,()=>{a.undoStack=[];a.redoStack=[];a.current=null;return!1},x.COMMAND_PRIORITY_EDITOR),b.registerCommand(x.CLEAR_HISTORY_COMMAND,()=>{a.undoStack=[];a.redoStack=[];a.current=null;b.dispatchCommand(x.CAN_REDO_COMMAND,!1);b.dispatchCommand(x.CAN_UNDO_COMMAND,!1);return!0},x.COMMAND_PRIORITY_EDITOR),b.registerUpdateListener(l)),
f=b.registerUpdateListener(l);return()=>{n();f()}}


/***/ }),

/***/ "./node_modules/@lexical/list/LexicalList.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const LexicalList =  false ? 0 : __webpack_require__("./node_modules/@lexical/list/LexicalList.prod.js")
module.exports = LexicalList;

/***/ }),

/***/ "./node_modules/@lexical/list/LexicalList.prod.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var h=__webpack_require__("./node_modules/lexical/Lexical.js"),k=__webpack_require__("./node_modules/@lexical/utils/LexicalUtils.js");function m(a){let b=new URLSearchParams;b.append("code",a);for(let c=1;c<arguments.length;c++)b.append("v",arguments[c]);throw Error(`Minified Lexical error #${a}; visit https://lexical.dev/docs/error?${b} for the full message or `+"use the non-minified dev environment for full errors and additional helpful warnings.");}
function n(a){let b=1;for(a=a.getParent();null!=a;){if(p(a)){a=a.getParent();if(q(a)){b++;a=a.getParent();continue}m(40)}break}return b}function r(a){a=a.getParent();q(a)||m(40);let b=a;for(;null!==b;)b=b.getParent(),q(b)&&(a=b);return a}function t(a){let b=[];a=a.getChildren().filter(p);for(let c=0;c<a.length;c++){let d=a[c],e=d.getFirstChild();q(e)?b=b.concat(t(e)):b.push(d)}return b}function u(a){return p(a)&&q(a.getFirstChild())}
function v(a){for(;null==a.getNextSibling()&&null==a.getPreviousSibling();){let b=a.getParent();if(null==b||!p(a)&&!q(a))break;a=b}a.remove()}function w(a){return y().append(a)}function z(a,b){return p(a)&&(0===b.length||1===b.length&&a.is(b[0])&&0===a.getChildrenSize())}function B(a,b){a.splice(a.getChildrenSize(),0,b)}
function C(a,b){if(q(a))return a;let c=a.getPreviousSibling(),d=a.getNextSibling(),e=y();e.setFormat(a.getFormatType());e.setIndent(a.getIndent());B(e,a.getChildren());if(q(c)&&b===c.getListType())return c.append(e),a.remove(),q(d)&&b===d.getListType()&&(B(c,d.getChildren()),d.remove()),c;if(q(d)&&b===d.getListType())return d.getFirstChildOrThrow().insertBefore(e),a.remove(),d;b=D(b);b.append(e);a.replace(b);E(b);return b}
function F(a,b){var c=a.getLastChild();let d=b.getFirstChild();c&&d&&u(c)&&u(d)&&(F(c.getFirstChild(),d.getFirstChild()),d.remove());c=b.getChildren();0<c.length&&(a.append(...c),E(a));b.remove()}function E(a,b){a=b||a.getChildren();if(void 0!==a)for(b=0;b<a.length;b++){let f=a[b];if(p(f)){let g=f.getValue();var c=f,d=c.getParent(),e=1;null!=d&&(q(d)?e=d.getStart():m(44));c=c.getPreviousSiblings();for(d=0;d<c.length;d++){let l=c[d];p(l)&&!q(l.getFirstChild())&&e++}g!==e&&f.setValue(e)}}}
function G(a){if(!u(a)){var b=a.getParent(),c=b?b.getParent():void 0,d=c?c.getParent():void 0;if(q(d)&&p(c)&&q(b)){var e=b?b.getFirstChild():void 0,f=b?b.getLastChild():void 0;if(a.is(e))c.insertBefore(a),b.isEmpty()&&c.remove();else if(a.is(f))c.insertAfter(a),b.isEmpty()&&c.remove();else{var g=b.getListType();e=y();let l=D(g);e.append(l);a.getPreviousSiblings().forEach(x=>l.append(x));f=y();g=D(g);f.append(g);B(g,a.getNextSiblings());c.insertBefore(e);c.insertAfter(f);c.replace(a)}E(b);E(d)}}}
class H extends h.ElementNode{static getType(){return"listitem"}static clone(a){return new H(a.__value,a.__checked,a.__key)}constructor(a,b,c){super(c);this.__value=void 0===a?1:a;this.__checked=b}createDOM(a){let b=document.createElement("li"),c=this.getParent();q(c)&&"check"===c.getListType()&&I(b,this,null);b.value=this.__value;J(b,a.theme,this);return b}updateDOM(a,b,c){let d=this.getParent();q(d)&&"check"===d.getListType()&&I(b,this,a);b.value=this.__value;J(b,c.theme,this);return!1}static transform(){return a=>
{let b=a.getParent();q(b)&&(E(b),"check"!==b.getListType()&&null!=a.getChecked()&&a.setChecked(void 0))}}static importDOM(){return{li:()=>({conversion:K,priority:0})}}static importJSON(a){let b=y();b.setChecked(a.checked);b.setValue(a.value);b.setFormat(a.format);b.setDirection(a.direction);return b}exportJSON(){return{...super.exportJSON(),checked:this.getChecked(),type:"listitem",value:this.getValue(),version:1}}append(...a){for(let b=0;b<a.length;b++){let c=a[b];if(h.$isElementNode(c)&&this.canMergeWith(c)){let d=
c.getChildren();this.append(...d);c.remove()}else super.append(c)}return this}replace(a,b){if(p(a))return super.replace(a);this.setIndent(0);let c=this.getParentOrThrow();if(!q(c))return a;if(c.__first===this.getKey())c.insertBefore(a);else if(c.__last===this.getKey())c.insertAfter(a);else{let d=D(c.getListType()),e=this.getNextSibling();for(;e;){let f=e;e=e.getNextSibling();d.append(f)}c.insertAfter(a);a.insertAfter(d)}b&&this.getChildren().forEach(d=>{a.append(d)});this.remove();0===c.getChildrenSize()&&
c.remove();return a}insertAfter(a,b=!0){var c=this.getParentOrThrow();q(c)||m(39);var d=this.getNextSiblings();if(p(a))return b=super.insertAfter(a,b),a=a.getParentOrThrow(),q(a)&&E(a),b;if(q(a)){c=a;a=a.getChildren();for(d=a.length-1;0<=d;d--)c=a[d],this.insertAfter(c,b);return c}c.insertAfter(a,b);if(0!==d.length){let e=D(c.getListType());d.forEach(f=>e.append(f));a.insertAfter(e,b)}return a}remove(a){let b=this.getPreviousSibling(),c=this.getNextSibling();super.remove(a);b&&c&&u(b)&&u(c)?(F(b.getFirstChild(),
c.getFirstChild()),c.remove()):c&&(a=c.getParent(),q(a)&&E(a))}insertNewAfter(a,b=!0){a=y(null==this.__checked?void 0:!1);this.insertAfter(a,b);return a}collapseAtStart(a){let b=h.$createParagraphNode();this.getChildren().forEach(f=>b.append(f));var c=this.getParentOrThrow(),d=c.getParentOrThrow();let e=p(d);1===c.getChildrenSize()?e?(c.remove(),d.select()):(c.insertBefore(b),c.remove(),c=a.anchor,a=a.focus,d=b.getKey(),"element"===c.type&&c.getNode().is(this)&&c.set(d,c.offset,"element"),"element"===
a.type&&a.getNode().is(this)&&a.set(d,a.offset,"element")):(c.insertBefore(b),this.remove());return!0}getValue(){return this.getLatest().__value}setValue(a){this.getWritable().__value=a}getChecked(){return this.getLatest().__checked}setChecked(a){this.getWritable().__checked=a}toggleChecked(){this.setChecked(!this.__checked)}getIndent(){var a=this.getParent();if(null===a)return this.getLatest().__indent;a=a.getParentOrThrow();let b=0;for(;p(a);)a=a.getParentOrThrow().getParentOrThrow(),b++;return b}setIndent(a){"number"===
typeof a&&-1<a||m(117);let b=this.getIndent();for(;b!==a;)if(b<a){a:{var c=new Set;if(u(this)||c.has(this.getKey()))break a;let g=this.getParent();var d=this.getNextSibling(),e=this.getPreviousSibling();if(u(d)&&u(e)){if(e=e.getFirstChild(),q(e)){e.append(this);var f=d.getFirstChild();q(f)&&(f=f.getChildren(),B(e,f),d.remove(),c.add(d.getKey()));E(e)}}else u(d)?(d=d.getFirstChild(),q(d)&&(c=d.getFirstChild(),null!==c&&c.insertBefore(this),E(d))):u(e)?(d=e.getFirstChild(),q(d)&&(d.append(this),E(d))):
q(g)&&(c=y(),f=D(g.getListType()),c.append(f),f.append(this),e?e.insertAfter(c):d?d.insertBefore(c):g.append(c),E(f));q(g)&&E(g)}b++}else G(this),b--;return this}insertBefore(a){if(p(a)){let b=this.getParentOrThrow();if(q(b)){let c=this.getNextSiblings();E(b,c)}}return super.insertBefore(a)}canInsertAfter(a){return p(a)}canReplaceWith(a){return p(a)}canMergeWith(a){return h.$isParagraphNode(a)||p(a)}extractWithChild(a,b){if(!h.$isRangeSelection(b))return!1;a=b.anchor.getNode();let c=b.focus.getNode();
return this.isParentOf(a)&&this.isParentOf(c)&&this.getTextContent().length===b.getTextContent().length}isParentRequired(){return!0}createParentElementNode(){return D("bullet")}}
function J(a,b,c){let d=[],e=[];var f=(b=b.list)?b.listitem:void 0;if(b&&b.nested)var g=b.nested.listitem;void 0!==f&&(f=f.split(" "),d.push(...f));if(b){f=c.getParent();f=q(f)&&"check"===f.getListType();let l=c.getChecked();f&&!l||e.push(b.listitemUnchecked);f&&l||e.push(b.listitemChecked);f&&d.push(l?b.listitemChecked:b.listitemUnchecked)}void 0!==g&&(g=g.split(" "),c.getChildren().some(l=>q(l))?d.push(...g):e.push(...g));0<e.length&&k.removeClassNamesFromElement(a,...e);0<d.length&&k.addClassNamesToElement(a,
...d)}function I(a,b,c){q(b.getFirstChild())?(a.removeAttribute("role"),a.removeAttribute("tabIndex"),a.removeAttribute("aria-checked")):(a.setAttribute("role","checkbox"),a.setAttribute("tabIndex","-1"),c&&b.__checked===c.__checked||a.setAttribute("aria-checked",b.getChecked()?"true":"false"))}function K(a){a=k.isHTMLElement(a)&&"true"===a.getAttribute("aria-checked");return{node:y(a)}}function y(a){return h.$applyNodeReplacement(new H(void 0,a))}function p(a){return a instanceof H}
class L extends h.ElementNode{static getType(){return"list"}static clone(a){return new L(a.__listType||N[a.__tag],a.__start,a.__key)}constructor(a,b,c){super(c);this.__listType=a=N[a]||a;this.__tag="number"===a?"ol":"ul";this.__start=b}getTag(){return this.__tag}setListType(a){let b=this.getWritable();b.__listType=a;b.__tag="number"===a?"ol":"ul"}getListType(){return this.__listType}getStart(){return this.__start}createDOM(a){let b=document.createElement(this.__tag);1!==this.__start&&b.setAttribute("start",
String(this.__start));b.__lexicalListType=this.__listType;O(b,a.theme,this);return b}updateDOM(a,b,c){if(a.__tag!==this.__tag)return!0;O(b,c.theme,this);return!1}static importDOM(){return{ol:()=>({conversion:P,priority:0}),ul:()=>({conversion:P,priority:0})}}static importJSON(a){let b=D(a.listType,a.start);b.setFormat(a.format);b.setIndent(a.indent);b.setDirection(a.direction);return b}exportDOM(a){({element:a}=super.exportDOM(a));a&&(1!==this.__start&&a.setAttribute("start",String(this.__start)),
"check"===this.__listType&&a.setAttribute("__lexicalListType","check"));return{element:a}}exportJSON(){return{...super.exportJSON(),listType:this.getListType(),start:this.getStart(),tag:this.getTag(),type:"list",version:1}}canBeEmpty(){return!1}canIndent(){return!1}append(...a){for(let c=0;c<a.length;c++){var b=a[c];if(p(b))super.append(b);else{let d=y();q(b)?d.append(b):h.$isElementNode(b)?(b=h.$createTextNode(b.getTextContent()),d.append(b)):d.append(b);super.append(d)}}E(this);return this}extractWithChild(a){return p(a)}}
function O(a,b,c){let d=[],e=[];var f=b.list;if(void 0!==f){let l=f[`${c.__tag}Depth`]||[];b=n(c)-1;let x=b%l.length;var g=l[x];let M=f[c.__tag],A;f=f.nested;void 0!==f&&f.list&&(A=f.list);void 0!==M&&d.push(M);if(void 0!==g)for(g=g.split(" "),d.push(...g),g=0;g<l.length;g++)g!==x&&e.push(c.__tag+g);void 0!==A&&(c=A.split(" "),1<b?d.push(...c):e.push(...c))}0<e.length&&k.removeClassNamesFromElement(a,...e);0<d.length&&k.addClassNamesToElement(a,...d)}
function Q(a){let b=[];for(let d=0;d<a.length;d++){var c=a[d];p(c)?(b.push(c),c=c.getChildren(),1<c.length&&c.forEach(e=>{q(e)&&b.push(w(e))})):b.push(w(c))}return b}function P(a){let b=a.nodeName.toLowerCase(),c=null;"ol"===b?c=D("number",a.start):"ul"===b&&(c=k.isHTMLElement(a)&&"check"===a.getAttribute("__lexicallisttype")?D("check"):D("bullet"));return{after:Q,node:c}}let N={ol:"number",ul:"bullet"};function D(a,b=1){return h.$applyNodeReplacement(new L(a,b))}
function q(a){return a instanceof L}let R=h.createCommand("INSERT_UNORDERED_LIST_COMMAND"),S=h.createCommand("INSERT_ORDERED_LIST_COMMAND"),T=h.createCommand("INSERT_CHECK_LIST_COMMAND"),U=h.createCommand("REMOVE_LIST_COMMAND");exports.$createListItemNode=y;exports.$createListNode=D;exports.$getListDepth=n;
exports.$handleListInsertParagraph=function(){var a=h.$getSelection();if(!h.$isRangeSelection(a)||!a.isCollapsed())return!1;a=a.anchor.getNode();if(!p(a)||""!==a.getTextContent())return!1;var b=r(a),c=a.getParent();q(c)||m(40);let d=c.getParent(),e;if(h.$isRootOrShadowRoot(d))e=h.$createParagraphNode(),b.insertAfter(e);else if(p(d))e=y(),d.insertAfter(e);else return!1;e.select();b=a.getNextSiblings();if(0<b.length){let f=D(c.getListType());h.$isParagraphNode(e)?e.insertAfter(f):(c=y(),c.append(f),
e.insertAfter(c));b.forEach(g=>{g.remove();f.append(g)})}v(a);return!0};exports.$isListItemNode=p;exports.$isListNode=q;exports.INSERT_CHECK_LIST_COMMAND=T;exports.INSERT_ORDERED_LIST_COMMAND=S;exports.INSERT_UNORDERED_LIST_COMMAND=R;exports.ListItemNode=H;exports.ListNode=L;exports.REMOVE_LIST_COMMAND=U;
exports.insertList=function(a,b){a.update(()=>{var c=h.$getSelection();if(h.$isRangeSelection(c)||h.DEPRECATED_$isGridSelection(c)){var d=c.getNodes();c=c.anchor.getNode();var e=c.getParent();if(z(c,d))d=D(b),h.$isRootOrShadowRoot(e)?(c.replace(d),e=y(),h.$isElementNode(c)&&(e.setFormat(c.getFormatType()),e.setIndent(c.getIndent())),d.append(e)):p(c)&&(c=c.getParentOrThrow(),B(d,c.getChildren()),c.replace(d));else for(c=new Set,e=0;e<d.length;e++){var f=d[e];if(h.$isElementNode(f)&&f.isEmpty()&&!c.has(f.getKey()))C(f,
b);else if(h.$isLeafNode(f))for(f=f.getParent();null!=f;){let l=f.getKey();if(q(f)){if(!c.has(l)){var g=D(b);B(g,f.getChildren());f.replace(g);E(g);c.add(l)}break}else{g=f.getParent();if(h.$isRootOrShadowRoot(g)&&!c.has(l)){c.add(l);C(f,b);break}f=g}}}}})};
exports.removeList=function(a){a.update(()=>{let b=h.$getSelection();if(h.$isRangeSelection(b)){var c=new Set,d=b.getNodes(),e=b.anchor.getNode();if(z(e,d))c.add(r(e));else for(e=0;e<d.length;e++){var f=d[e];h.$isLeafNode(f)&&(f=k.$getNearestNodeOfType(f,H),null!=f&&c.add(r(f)))}for(let g of c){c=g;d=t(g);for(let l of d)d=h.$createParagraphNode(),B(d,l.getChildren()),c.insertAfter(d),c=d,l.__key===b.anchor.key&&b.anchor.set(d.getKey(),0,"element"),l.__key===b.focus.key&&b.focus.set(d.getKey(),0,"element"),
l.remove();g.remove()}}})}


/***/ }),

/***/ "./node_modules/@lexical/react/LexicalAutoFocusPlugin.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const LexicalAutoFocusPlugin =  false ? 0 : __webpack_require__("./node_modules/@lexical/react/LexicalAutoFocusPlugin.prod.js")
module.exports = LexicalAutoFocusPlugin;

/***/ }),

/***/ "./node_modules/@lexical/react/LexicalAutoFocusPlugin.prod.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var e=__webpack_require__("./node_modules/@lexical/react/LexicalComposerContext.js"),f=__webpack_require__("./node_modules/react/index.js");exports.AutoFocusPlugin=function({defaultSelection:c}){let [a]=e.useLexicalComposerContext();f.useEffect(()=>{a.focus(()=>{let d=document.activeElement,b=a.getRootElement();null===b||null!==d&&b.contains(d)||b.focus({preventScroll:!0})},{defaultSelection:c})},[c,a]);return null}


/***/ }),

/***/ "./node_modules/@lexical/react/LexicalComposer.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const LexicalComposer =  false ? 0 : __webpack_require__("./node_modules/@lexical/react/LexicalComposer.prod.js")
module.exports = LexicalComposer;

/***/ }),

/***/ "./node_modules/@lexical/react/LexicalComposer.prod.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var e=__webpack_require__("./node_modules/@lexical/react/LexicalComposerContext.js"),f=__webpack_require__("./node_modules/lexical/Lexical.js"),g=__webpack_require__("./node_modules/react/index.js");let m="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement;var n=m?g.useLayoutEffect:g.useEffect;let p={tag:"history-merge"};
function q(a,c){if(null!==c)if(void 0===c)a.update(()=>{var b=f.$getRoot();if(b.isEmpty()){let d=f.$createParagraphNode();b.append(d);b=m?document.activeElement:null;(null!==f.$getSelection()||null!==b&&b===a.getRootElement())&&d.select()}},p);else if(null!==c)switch(typeof c){case "string":let b=a.parseEditorState(c);a.setEditorState(b,p);break;case "object":a.setEditorState(c,p);break;case "function":a.update(()=>{f.$getRoot().isEmpty()&&c(a)},p)}}
exports.LexicalComposer=function({initialConfig:a,children:c}){let b=g.useMemo(()=>{const {theme:d,namespace:h,editor__DEPRECATED:r,nodes:t,onError:u,editorState:v}=a,w=e.createLexicalComposerContext(null,d);let k=r||null;if(null===k){const l=f.createEditor({editable:a.editable,namespace:h,nodes:t,onError:x=>u(x,l),theme:d});q(l,v);k=l}return[k,w]},[]);n(()=>{let d=a.editable,[h]=b;h.setEditable(void 0!==d?d:!0)},[]);return g.createElement(e.LexicalComposerContext.Provider,{value:b},c)}


/***/ }),

/***/ "./node_modules/@lexical/react/LexicalContentEditable.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const LexicalContentEditable =  false ? 0 : __webpack_require__("./node_modules/@lexical/react/LexicalContentEditable.prod.js")
module.exports = LexicalContentEditable;

/***/ }),

/***/ "./node_modules/@lexical/react/LexicalContentEditable.prod.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var c=__webpack_require__("./node_modules/@lexical/react/LexicalComposerContext.js"),h=__webpack_require__("./node_modules/react/index.js");function n(){n=Object.assign?Object.assign.bind():function(g){for(var d=1;d<arguments.length;d++){var e=arguments[d],b;for(b in e)Object.prototype.hasOwnProperty.call(e,b)&&(g[b]=e[b])}return g};return n.apply(this,arguments)}var p="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement?h.useLayoutEffect:h.useEffect;
exports.ContentEditable=function({ariaActiveDescendant:g,ariaAutoComplete:d,ariaControls:e,ariaDescribedBy:b,ariaExpanded:q,ariaLabel:r,ariaLabelledBy:t,ariaMultiline:u,ariaOwns:v,ariaRequired:w,autoCapitalize:x,className:y,id:z,role:l="textbox",spellCheck:A=!0,style:B,tabIndex:C,"data-testid":D,...E}){let [f]=c.useLexicalComposerContext(),[a,m]=h.useState(!1),F=h.useCallback(k=>{f.setRootElement(k)},[f]);p(()=>{m(f.isEditable());return f.registerEditableListener(k=>{m(k)})},[f]);return h.createElement("div",
n({},E,{"aria-activedescendant":a?g:void 0,"aria-autocomplete":a?d:"none","aria-controls":a?e:void 0,"aria-describedby":b,"aria-expanded":a?"combobox"===l?!!q:void 0:void 0,"aria-label":r,"aria-labelledby":t,"aria-multiline":u,"aria-owns":a?v:void 0,"aria-readonly":a?void 0:!0,"aria-required":w,autoCapitalize:x,className:y,contentEditable:a,"data-testid":D,id:z,ref:F,role:l,spellCheck:A,style:B,tabIndex:C}))}


/***/ }),

/***/ "./node_modules/@lexical/react/LexicalErrorBoundary.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const LexicalErrorBoundary =  false ? 0 : __webpack_require__("./node_modules/@lexical/react/LexicalErrorBoundary.prod.js")
module.exports = LexicalErrorBoundary;

/***/ }),

/***/ "./node_modules/@lexical/react/LexicalErrorBoundary.prod.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var h=__webpack_require__("./node_modules/react/index.js");function m(b,c){m=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(g,a){g.__proto__=a;return g};return m(b,c)}function n(b,c){b.prototype=Object.create(c.prototype);b.prototype.constructor=b;m(b,c)}function r(b,c){void 0===b&&(b=[]);void 0===c&&(c=[]);return b.length!==c.length||b.some(function(g,a){return!Object.is(g,c[a])})}
var t={error:null},u=function(b){function c(){for(var a,d=arguments.length,f=Array(d),e=0;e<d;e++)f[e]=arguments[e];a=b.call.apply(b,[this].concat(f))||this;a.state=t;a.resetErrorBoundary=function(){for(var k,p=arguments.length,q=Array(p),l=0;l<p;l++)q[l]=arguments[l];null==a.props.onReset?void 0:(k=a.props).onReset.apply(k,q);a.reset()};return a}n(c,b);c.getDerivedStateFromError=function(a){return{error:a}};var g=c.prototype;g.reset=function(){this.setState(t)};g.componentDidCatch=function(a,d){var f,
e;null==(f=(e=this.props).onError)?void 0:f.call(e,a,d)};g.componentDidUpdate=function(a,d){var f=this.props.resetKeys;if(null!==this.state.error&&null!==d.error&&r(a.resetKeys,f)){var e,k;null==(e=(k=this.props).onResetKeysChange)?void 0:e.call(k,a.resetKeys,f);this.reset()}};g.render=function(){var a=this.state.error,d=this.props,f=d.fallbackRender,e=d.FallbackComponent;d=d.fallback;if(null!==a){a={error:a,resetErrorBoundary:this.resetErrorBoundary};if(h.isValidElement(d))return d;if("function"===
typeof f)return f(a);if(e)return h.createElement(e,a);throw Error("react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop");}return this.props.children};return c}(h.Component);module.exports=function({children:b,onError:c}){return h.createElement(u,{fallback:h.createElement("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"}},"An error was thrown."),onError:c},b)}


/***/ }),

/***/ "./node_modules/@lexical/react/LexicalHistoryPlugin.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const LexicalHistoryPlugin =  false ? 0 : __webpack_require__("./node_modules/@lexical/react/LexicalHistoryPlugin.prod.js")
module.exports = LexicalHistoryPlugin;

/***/ }),

/***/ "./node_modules/@lexical/react/LexicalHistoryPlugin.prod.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var c=__webpack_require__("./node_modules/@lexical/react/LexicalComposerContext.js"),history=__webpack_require__("./node_modules/@lexical/history/LexicalHistory.js"),f=__webpack_require__("./node_modules/react/index.js");function g(a,b,d=1E3){let e=f.useMemo(()=>b||history.createEmptyHistoryState(),[b]);f.useEffect(()=>history.registerHistory(a,e,d),[d,a,e])}exports.createEmptyHistoryState=history.createEmptyHistoryState;exports.HistoryPlugin=function({externalHistoryState:a}){let [b]=c.useLexicalComposerContext();g(b,a);return null}


/***/ }),

/***/ "./node_modules/@lexical/react/LexicalListPlugin.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const LexicalListPlugin =  false ? 0 : __webpack_require__("./node_modules/@lexical/react/LexicalListPlugin.prod.js")
module.exports = LexicalListPlugin;

/***/ }),

/***/ "./node_modules/@lexical/react/LexicalListPlugin.prod.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b=__webpack_require__("./node_modules/@lexical/list/LexicalList.js"),c=__webpack_require__("./node_modules/@lexical/react/LexicalComposerContext.js"),d=__webpack_require__("./node_modules/react/index.js"),e=__webpack_require__("./node_modules/@lexical/utils/LexicalUtils.js"),f=__webpack_require__("./node_modules/lexical/Lexical.js");
function g(a){d.useEffect(()=>e.mergeRegister(a.registerCommand(b.INSERT_ORDERED_LIST_COMMAND,()=>{b.insertList(a,"number");return!0},f.COMMAND_PRIORITY_LOW),a.registerCommand(b.INSERT_UNORDERED_LIST_COMMAND,()=>{b.insertList(a,"bullet");return!0},f.COMMAND_PRIORITY_LOW),a.registerCommand(b.REMOVE_LIST_COMMAND,()=>{b.removeList(a);return!0},f.COMMAND_PRIORITY_LOW),a.registerCommand(f.INSERT_PARAGRAPH_COMMAND,()=>b.$handleListInsertParagraph()?!0:!1,f.COMMAND_PRIORITY_LOW)),[a])}
exports.ListPlugin=function(){let [a]=c.useLexicalComposerContext();d.useEffect(()=>{if(!a.hasNodes([b.ListNode,b.ListItemNode]))throw Error("ListPlugin: ListNode and/or ListItemNode not registered on editor");},[a]);g(a);return null}


/***/ }),

/***/ "./node_modules/@lexical/react/LexicalOnChangePlugin.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const LexicalOnChangePlugin =  false ? 0 : __webpack_require__("./node_modules/@lexical/react/LexicalOnChangePlugin.prod.js")
module.exports = LexicalOnChangePlugin;

/***/ }),

/***/ "./node_modules/@lexical/react/LexicalOnChangePlugin.prod.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var c=__webpack_require__("./node_modules/@lexical/react/LexicalComposerContext.js"),g=__webpack_require__("./node_modules/react/index.js"),h="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement?g.useLayoutEffect:g.useEffect;
exports.OnChangePlugin=function({ignoreHistoryMergeTagChange:d=!0,ignoreSelectionChange:e=!1,onChange:a}){let [b]=c.useLexicalComposerContext();h(()=>{if(a)return b.registerUpdateListener(({editorState:k,dirtyElements:l,dirtyLeaves:m,prevEditorState:n,tags:f})=>{e&&0===l.size&&0===m.size||d&&f.has("history-merge")||n.isEmpty()||a(k,b,f)})},[b,d,e,a]);return null}


/***/ }),

/***/ "./node_modules/@lexical/react/LexicalRichTextPlugin.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const LexicalRichTextPlugin =  false ? 0 : __webpack_require__("./node_modules/@lexical/react/LexicalRichTextPlugin.prod.js")
module.exports = LexicalRichTextPlugin;

/***/ }),

/***/ "./node_modules/@lexical/react/LexicalRichTextPlugin.prod.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b=__webpack_require__("./node_modules/@lexical/react/LexicalComposerContext.js"),g=__webpack_require__("./node_modules/@lexical/react/useLexicalEditable.js"),l=__webpack_require__("./node_modules/react/index.js"),m=__webpack_require__("./node_modules/@lexical/text/LexicalText.js"),n=__webpack_require__("./node_modules/@lexical/utils/LexicalUtils.js"),p=__webpack_require__("./node_modules/react-dom/index.js"),t=__webpack_require__("./node_modules/@lexical/dragon/LexicalDragon.js"),u=__webpack_require__("./node_modules/@lexical/rich-text/LexicalRichText.js"),v="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement?l.useLayoutEffect:l.useEffect;
function w(a){return a.getEditorState().read(m.$canShowPlaceholderCurry(a.isComposing()))}function x(a){let [d,c]=l.useState(()=>w(a));v(()=>{function e(){let f=w(a);c(f)}e();return n.mergeRegister(a.registerUpdateListener(()=>{e()}),a.registerEditableListener(()=>{e()}))},[a]);return d}
function y(a,d){let [c,e]=l.useState(()=>a.getDecorators());v(()=>a.registerDecoratorListener(f=>{p.flushSync(()=>{e(f)})}),[a]);l.useEffect(()=>{e(a.getDecorators())},[a]);return l.useMemo(()=>{let f=[],q=Object.keys(c);for(let h=0;h<q.length;h++){let k=q[h],A=l.createElement(d,{onError:z=>a._onError(z)},l.createElement(l.Suspense,{fallback:null},c[k])),r=a.getElementByKey(k);null!==r&&f.push(p.createPortal(A,r,k))}return f},[d,c,a])}
function B(a){v(()=>n.mergeRegister(u.registerRichText(a),t.registerDragonSupport(a)),[a])}function C({content:a}){var [d]=b.useLexicalComposerContext();d=x(d);let c=g();return d?"function"===typeof a?a(c):a:null}exports.RichTextPlugin=function({contentEditable:a,placeholder:d,ErrorBoundary:c}){let [e]=b.useLexicalComposerContext();c=y(e,c);B(e);return l.createElement(l.Fragment,null,a,l.createElement(C,{content:d}),c)}


/***/ }),

/***/ "./node_modules/@lexical/react/LexicalTabIndentationPlugin.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const LexicalTabIndentationPlugin =  false ? 0 : __webpack_require__("./node_modules/@lexical/react/LexicalTabIndentationPlugin.prod.js")
module.exports = LexicalTabIndentationPlugin;

/***/ }),

/***/ "./node_modules/@lexical/react/LexicalTabIndentationPlugin.prod.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var d=__webpack_require__("./node_modules/@lexical/react/LexicalComposerContext.js"),g=__webpack_require__("./node_modules/@lexical/utils/LexicalUtils.js"),h=__webpack_require__("./node_modules/lexical/Lexical.js"),k=__webpack_require__("./node_modules/react/index.js");function l(b,a){let c=[];for(let e=0;e<b.length;e++){let f=a(b[e]);null!==f&&c.push(f)}return c}
function m(b){var a=b.getNodes();if(0<l(a,c=>h.$isBlockElementNode(c)&&c.canIndent()?c:null).length)return!0;a=b.anchor;b=b.focus;b=b.isBefore(a)?b:a;a=b.getNode();a=g.$getNearestBlockElementAncestorOrThrow(a);if(a.canIndent()){a=a.getKey();let c=h.$createRangeSelection();c.anchor.set(a,0,"element");c.focus.set(a,0,"element");c=h.$normalizeSelection__EXPERIMENTAL(c);if(c.anchor.is(b))return!0}return!1}
function n(b){return b.registerCommand(h.KEY_TAB_COMMAND,a=>{let c=h.$getSelection();if(!h.$isRangeSelection(c))return!1;a.preventDefault();a=m(c)?a.shiftKey?h.OUTDENT_CONTENT_COMMAND:h.INDENT_CONTENT_COMMAND:h.INSERT_TAB_COMMAND;return b.dispatchCommand(a,void 0)},h.COMMAND_PRIORITY_EDITOR)}exports.TabIndentationPlugin=function(){let [b]=d.useLexicalComposerContext();k.useEffect(()=>n(b));return null};exports.registerTabIndentation=n


/***/ }),

/***/ "./node_modules/@lexical/react/useLexicalEditable.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const useLexicalEditable =  false ? 0 : __webpack_require__("./node_modules/@lexical/react/useLexicalEditable.prod.js")
module.exports = useLexicalEditable;

/***/ }),

/***/ "./node_modules/@lexical/react/useLexicalEditable.prod.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b=__webpack_require__("./node_modules/@lexical/react/LexicalComposerContext.js"),k=__webpack_require__("./node_modules/react/index.js"),l="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement?k.useLayoutEffect:k.useEffect;
function m(a){let [c]=b.useLexicalComposerContext(),e=k.useMemo(()=>a(c),[c,a]),d=k.useRef(e.initialValueFn()),[n,g]=k.useState(d.current);l(()=>{let {initialValueFn:p,subscribe:q}=e,f=p();d.current!==f&&(d.current=f,g(f));return q(h=>{d.current=h;g(h)})},[e,a]);return n}function r(a){return{initialValueFn:()=>a.isEditable(),subscribe:c=>a.registerEditableListener(c)}}module.exports=function(){return m(r)}


/***/ }),

/***/ "./node_modules/@lexical/text/LexicalText.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const LexicalText =  false ? 0 : __webpack_require__("./node_modules/@lexical/text/LexicalText.prod.js")
module.exports = LexicalText;

/***/ }),

/***/ "./node_modules/@lexical/text/LexicalText.prod.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var g=__webpack_require__("./node_modules/lexical/Lexical.js");function r(c,h=!0){if(c)return!1;c=t();h&&(c=c.trim());return""===c}function t(){return g.$getRoot().getTextContent()}function u(c){if(!r(c,!1))return!1;c=g.$getRoot().getChildren();let h=c.length;if(1<h)return!1;for(let e=0;e<h;e++){var b=c[e];if(g.$isDecoratorNode(b))return!1;if(g.$isElementNode(b)){if(!g.$isParagraphNode(b)||0!==b.__indent)return!1;b=b.getChildren();let n=b.length;for(let q=0;q<n;q++)if(!g.$isTextNode(b[e]))return!1}}return!0}
exports.$canShowPlaceholder=u;exports.$canShowPlaceholderCurry=function(c){return()=>u(c)};exports.$findTextIntersectionFromCharacters=function(c,h){var b=c.getFirstChild();c=0;a:for(;null!==b;){if(g.$isElementNode(b)){var e=b.getFirstChild();if(null!==e){b=e;continue}}else if(g.$isTextNode(b)){e=b.getTextContentSize();if(c+e>h)return{node:b,offset:h-c};c+=e}e=b.getNextSibling();if(null!==e)b=e;else{for(b=b.getParent();null!==b;){e=b.getNextSibling();if(null!==e){b=e;continue a}b=b.getParent()}break}}return null};
exports.$isRootTextContentEmpty=r;exports.$isRootTextContentEmptyCurry=function(c,h){return()=>r(c,h)};exports.$rootTextContent=t;
exports.registerLexicalTextEntity=function(c,h,b,e){let n=a=>{const d=g.$createTextNode(a.getTextContent());d.setFormat(a.getFormat());a.replace(d)},q=c.registerNodeTransform(g.TextNode,a=>{if(a.isSimpleText()){var d=a.getPreviousSibling(),l=a.getTextContent(),m=a;if(g.$isTextNode(d)){var k=d.getTextContent(),f=h(k+l);if(d instanceof b){if(null===f||0!==d.getLatest().__mode){n(d);return}f=f.end-k.length;if(0<f){m=l.slice(0,f);m=k+m;d.select();d.setTextContent(m);f===l.length?a.remove():(d=l.slice(f),
a.setTextContent(d));return}}else if(null===f||f.start<k.length)return}for(;;){a=h(l);l=f=null===a?"":l.slice(a.end);if(""===f){if(k=m.getNextSibling(),g.$isTextNode(k))if(f=m.getTextContent()+k.getTextContent(),f=h(f),null===f){k instanceof b?n(k):k.markDirty();break}else if(0!==f.start)break}else if(k=h(f),null!==k&&0===k.start)break;if(null===a)break;if(0===a.start&&g.$isTextNode(d)&&d.isTextEntity())continue;let p;0===a.start?[p,m]=m.splitText(a.end):[,p,m]=m.splitText(a.start,a.end);a=e(p);a.setFormat(p.getFormat());
p.replace(a);if(null==m)break}}});c=c.registerNodeTransform(b,a=>{var d=a.getTextContent();const l=h(d);null===l||0!==l.start?n(a):d.length>l.end?a.splitText(l.end):(d=a.getPreviousSibling(),g.$isTextNode(d)&&d.isTextEntity()&&(n(d),n(a)),d=a.getNextSibling(),g.$isTextNode(d)&&d.isTextEntity()&&(n(d),a instanceof b&&n(a)))});return[q,c]}


/***/ }),

/***/ "./node_modules/ccount/index.js":
/***/ ((module) => {

"use strict";


module.exports = ccount

function ccount(source, character) {
  var value = String(source)
  var count = 0
  var index

  if (typeof character !== 'string') {
    throw new Error('Expected character')
  }

  index = value.indexOf(character)

  while (index !== -1) {
    count++
    index = value.indexOf(character, index + character.length)
  }

  return count
}


/***/ }),

/***/ "./node_modules/character-entities-html4/index.json":
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"nbsp":" ","iexcl":"¡","cent":"¢","pound":"£","curren":"¤","yen":"¥","brvbar":"¦","sect":"§","uml":"¨","copy":"©","ordf":"ª","laquo":"«","not":"¬","shy":"­","reg":"®","macr":"¯","deg":"°","plusmn":"±","sup2":"²","sup3":"³","acute":"´","micro":"µ","para":"¶","middot":"·","cedil":"¸","sup1":"¹","ordm":"º","raquo":"»","frac14":"¼","frac12":"½","frac34":"¾","iquest":"¿","Agrave":"À","Aacute":"Á","Acirc":"Â","Atilde":"Ã","Auml":"Ä","Aring":"Å","AElig":"Æ","Ccedil":"Ç","Egrave":"È","Eacute":"É","Ecirc":"Ê","Euml":"Ë","Igrave":"Ì","Iacute":"Í","Icirc":"Î","Iuml":"Ï","ETH":"Ð","Ntilde":"Ñ","Ograve":"Ò","Oacute":"Ó","Ocirc":"Ô","Otilde":"Õ","Ouml":"Ö","times":"×","Oslash":"Ø","Ugrave":"Ù","Uacute":"Ú","Ucirc":"Û","Uuml":"Ü","Yacute":"Ý","THORN":"Þ","szlig":"ß","agrave":"à","aacute":"á","acirc":"â","atilde":"ã","auml":"ä","aring":"å","aelig":"æ","ccedil":"ç","egrave":"è","eacute":"é","ecirc":"ê","euml":"ë","igrave":"ì","iacute":"í","icirc":"î","iuml":"ï","eth":"ð","ntilde":"ñ","ograve":"ò","oacute":"ó","ocirc":"ô","otilde":"õ","ouml":"ö","divide":"÷","oslash":"ø","ugrave":"ù","uacute":"ú","ucirc":"û","uuml":"ü","yacute":"ý","thorn":"þ","yuml":"ÿ","fnof":"ƒ","Alpha":"Α","Beta":"Β","Gamma":"Γ","Delta":"Δ","Epsilon":"Ε","Zeta":"Ζ","Eta":"Η","Theta":"Θ","Iota":"Ι","Kappa":"Κ","Lambda":"Λ","Mu":"Μ","Nu":"Ν","Xi":"Ξ","Omicron":"Ο","Pi":"Π","Rho":"Ρ","Sigma":"Σ","Tau":"Τ","Upsilon":"Υ","Phi":"Φ","Chi":"Χ","Psi":"Ψ","Omega":"Ω","alpha":"α","beta":"β","gamma":"γ","delta":"δ","epsilon":"ε","zeta":"ζ","eta":"η","theta":"θ","iota":"ι","kappa":"κ","lambda":"λ","mu":"μ","nu":"ν","xi":"ξ","omicron":"ο","pi":"π","rho":"ρ","sigmaf":"ς","sigma":"σ","tau":"τ","upsilon":"υ","phi":"φ","chi":"χ","psi":"ψ","omega":"ω","thetasym":"ϑ","upsih":"ϒ","piv":"ϖ","bull":"•","hellip":"…","prime":"′","Prime":"″","oline":"‾","frasl":"⁄","weierp":"℘","image":"ℑ","real":"ℜ","trade":"™","alefsym":"ℵ","larr":"←","uarr":"↑","rarr":"→","darr":"↓","harr":"↔","crarr":"↵","lArr":"⇐","uArr":"⇑","rArr":"⇒","dArr":"⇓","hArr":"⇔","forall":"∀","part":"∂","exist":"∃","empty":"∅","nabla":"∇","isin":"∈","notin":"∉","ni":"∋","prod":"∏","sum":"∑","minus":"−","lowast":"∗","radic":"√","prop":"∝","infin":"∞","ang":"∠","and":"∧","or":"∨","cap":"∩","cup":"∪","int":"∫","there4":"∴","sim":"∼","cong":"≅","asymp":"≈","ne":"≠","equiv":"≡","le":"≤","ge":"≥","sub":"⊂","sup":"⊃","nsub":"⊄","sube":"⊆","supe":"⊇","oplus":"⊕","otimes":"⊗","perp":"⊥","sdot":"⋅","lceil":"⌈","rceil":"⌉","lfloor":"⌊","rfloor":"⌋","lang":"〈","rang":"〉","loz":"◊","spades":"♠","clubs":"♣","hearts":"♥","diams":"♦","quot":"\\"","amp":"&","lt":"<","gt":">","OElig":"Œ","oelig":"œ","Scaron":"Š","scaron":"š","Yuml":"Ÿ","circ":"ˆ","tilde":"˜","ensp":" ","emsp":" ","thinsp":" ","zwnj":"‌","zwj":"‍","lrm":"‎","rlm":"‏","ndash":"–","mdash":"—","lsquo":"‘","rsquo":"’","sbquo":"‚","ldquo":"“","rdquo":"”","bdquo":"„","dagger":"†","Dagger":"‡","permil":"‰","lsaquo":"‹","rsaquo":"›","euro":"€"}');

/***/ }),

/***/ "./node_modules/character-entities-legacy/index.json":
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"AElig":"Æ","AMP":"&","Aacute":"Á","Acirc":"Â","Agrave":"À","Aring":"Å","Atilde":"Ã","Auml":"Ä","COPY":"©","Ccedil":"Ç","ETH":"Ð","Eacute":"É","Ecirc":"Ê","Egrave":"È","Euml":"Ë","GT":">","Iacute":"Í","Icirc":"Î","Igrave":"Ì","Iuml":"Ï","LT":"<","Ntilde":"Ñ","Oacute":"Ó","Ocirc":"Ô","Ograve":"Ò","Oslash":"Ø","Otilde":"Õ","Ouml":"Ö","QUOT":"\\"","REG":"®","THORN":"Þ","Uacute":"Ú","Ucirc":"Û","Ugrave":"Ù","Uuml":"Ü","Yacute":"Ý","aacute":"á","acirc":"â","acute":"´","aelig":"æ","agrave":"à","amp":"&","aring":"å","atilde":"ã","auml":"ä","brvbar":"¦","ccedil":"ç","cedil":"¸","cent":"¢","copy":"©","curren":"¤","deg":"°","divide":"÷","eacute":"é","ecirc":"ê","egrave":"è","eth":"ð","euml":"ë","frac12":"½","frac14":"¼","frac34":"¾","gt":">","iacute":"í","icirc":"î","iexcl":"¡","igrave":"ì","iquest":"¿","iuml":"ï","laquo":"«","lt":"<","macr":"¯","micro":"µ","middot":"·","nbsp":" ","not":"¬","ntilde":"ñ","oacute":"ó","ocirc":"ô","ograve":"ò","ordf":"ª","ordm":"º","oslash":"ø","otilde":"õ","ouml":"ö","para":"¶","plusmn":"±","pound":"£","quot":"\\"","raquo":"»","reg":"®","sect":"§","shy":"­","sup1":"¹","sup2":"²","sup3":"³","szlig":"ß","thorn":"þ","times":"×","uacute":"ú","ucirc":"û","ugrave":"ù","uml":"¨","uuml":"ü","yacute":"ý","yen":"¥","yuml":"ÿ"}');

/***/ }),

/***/ "./node_modules/hast-util-is-element/convert.js":
/***/ ((module) => {

"use strict";


module.exports = convert

function convert(test) {
  if (typeof test === 'string') {
    return tagNameFactory(test)
  }

  if (test === null || test === undefined) {
    return element
  }

  if (typeof test === 'object') {
    return any(test)
  }

  if (typeof test === 'function') {
    return callFactory(test)
  }

  throw new Error('Expected function, string, or array as test')
}

function convertAll(tests) {
  var length = tests.length
  var index = -1
  var results = []

  while (++index < length) {
    results[index] = convert(tests[index])
  }

  return results
}

function any(tests) {
  var checks = convertAll(tests)
  var length = checks.length

  return matches

  function matches() {
    var index = -1

    while (++index < length) {
      if (checks[index].apply(this, arguments)) {
        return true
      }
    }

    return false
  }
}

// Utility to convert a string a tag name check.
function tagNameFactory(test) {
  return tagName

  function tagName(node) {
    return element(node) && node.tagName === test
  }
}

// Utility to convert a function check.
function callFactory(test) {
  return call

  function call(node) {
    return element(node) && Boolean(test.apply(this, arguments))
  }
}

// Utility to return true if this is an element.
function element(node) {
  return (
    node &&
    typeof node === 'object' &&
    node.type === 'element' &&
    typeof node.tagName === 'string'
  )
}


/***/ }),

/***/ "./node_modules/hast-util-is-element/index.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var convert = __webpack_require__("./node_modules/hast-util-is-element/convert.js")

module.exports = isElement

isElement.convert = convert

// Check if if `node` is an `element` and whether it passes the given test.
function isElement(node, test, index, parent, context) {
  var hasParent = parent !== null && parent !== undefined
  var hasIndex = index !== null && index !== undefined
  var check = convert(test)

  if (
    hasIndex &&
    (typeof index !== 'number' || index < 0 || index === Infinity)
  ) {
    throw new Error('Expected positive finite index for child node')
  }

  if (hasParent && (!parent.type || !parent.children)) {
    throw new Error('Expected parent node')
  }

  if (!node || !node.type || typeof node.type !== 'string') {
    return false
  }

  if (hasParent !== hasIndex) {
    throw new Error('Expected both parent and index')
  }

  return check.call(context, node, index, parent)
}


/***/ }),

/***/ "./node_modules/hast-util-to-html/index.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = __webpack_require__("./node_modules/hast-util-to-html/lib/index.js")


/***/ }),

/***/ "./node_modules/hast-util-to-html/lib/all.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var one = __webpack_require__("./node_modules/hast-util-to-html/lib/one.js")

module.exports = all

// Serialize all children of `parent`.
function all(ctx, parent) {
  var results = []
  var children = (parent && parent.children) || []
  var index = -1

  while (++index < children.length) {
    results[index] = one(ctx, children[index], index, parent)
  }

  return results.join('')
}


/***/ }),

/***/ "./node_modules/hast-util-to-html/lib/comment.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var xtend = __webpack_require__("./node_modules/xtend/immutable.js")
var entities = __webpack_require__("./node_modules/stringify-entities/index.js")

module.exports = serializeComment

function serializeComment(ctx, node) {
  // See: <https://html.spec.whatwg.org/multipage/syntax.html#comments>
  return ctx.bogusComments
    ? '<?' + entities(node.value, xtend(ctx.entities, {subset: ['>']})) + '>'
    : '<!--' + node.value.replace(/^>|^->|<!--|-->|--!>|<!-$/g, encode) + '-->'

  function encode($0) {
    return entities($0, xtend(ctx.entities, {subset: ['<', '>']}))
  }
}


/***/ }),

/***/ "./node_modules/hast-util-to-html/lib/constants.js":
/***/ ((module) => {

"use strict";


// Maps of subsets.
// Each value is a matrix of tuples.
// The first value causes parse errors, the second is valid.
// Of both values, the first value is unsafe, and the second is safe.
module.exports = {
  // See: <https://html.spec.whatwg.org/#attribute-name-state>.
  name: [
    ['\t\n\f\r &/=>'.split(''), '\t\n\f\r "&\'/=>`'.split('')],
    ['\0\t\n\f\r "&\'/<=>'.split(''), '\0\t\n\f\r "&\'/<=>`'.split('')]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(unquoted)-state>.
  unquoted: [
    ['\t\n\f\r &>'.split(''), '\0\t\n\f\r "&\'<=>`'.split('')],
    ['\0\t\n\f\r "&\'<=>`'.split(''), '\0\t\n\f\r "&\'<=>`'.split('')]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(single-quoted)-state>.
  single: [
    ["&'".split(''), '"&\'`'.split('')],
    ["\0&'".split(''), '\0"&\'`'.split('')]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(double-quoted)-state>.
  double: [
    ['"&'.split(''), '"&\'`'.split('')],
    ['\0"&'.split(''), '\0"&\'`'.split('')]
  ]
}


/***/ }),

/***/ "./node_modules/hast-util-to-html/lib/doctype.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var xtend = __webpack_require__("./node_modules/xtend/immutable.js")
var ccount = __webpack_require__("./node_modules/ccount/index.js")
var entities = __webpack_require__("./node_modules/stringify-entities/index.js")

module.exports = serializeDoctype

function serializeDoctype(ctx, node) {
  var sep = ctx.tightDoctype ? '' : ' '
  var parts = ['<!' + (ctx.upperDoctype ? 'DOCTYPE' : 'doctype')]

  if (node.name) {
    parts.push(sep, node.name)

    if (node.public != null) {
      parts.push(' public', sep, quote(ctx, node.public))
    } else if (node.system != null) {
      parts.push(' system')
    }

    if (node.system != null) {
      parts.push(sep, quote(ctx, node.system))
    }
  }

  return parts.join('') + '>'
}

function quote(ctx, value) {
  var string = String(value)
  var quote =
    ccount(string, ctx.quote) > ccount(string, ctx.alternative)
      ? ctx.alternative
      : ctx.quote

  return (
    quote +
    entities(string, xtend(ctx.entities, {subset: ['<', '&', quote]})) +
    quote
  )
}


/***/ }),

/***/ "./node_modules/hast-util-to-html/lib/element.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var xtend = __webpack_require__("./node_modules/xtend/immutable.js")
var svg = __webpack_require__("./node_modules/property-information/svg.js")
var find = __webpack_require__("./node_modules/property-information/find.js")
var spaces = __webpack_require__("./node_modules/space-separated-tokens/index.js")
var commas = __webpack_require__("./node_modules/comma-separated-tokens/index.js")
var entities = __webpack_require__("./node_modules/stringify-entities/index.js")
var ccount = __webpack_require__("./node_modules/ccount/index.js")
var all = __webpack_require__("./node_modules/hast-util-to-html/lib/all.js")
var constants = __webpack_require__("./node_modules/hast-util-to-html/lib/constants.js")

module.exports = serializeElement

function serializeElement(ctx, node, index, parent) {
  var schema = ctx.schema
  var omit = schema.space === 'svg' ? false : ctx.omit
  var parts = []
  var selfClosing =
    schema.space === 'svg'
      ? ctx.closeEmpty
      : ctx.voids.indexOf(node.tagName.toLowerCase()) > -1
  var attrs
  var content
  var last

  if (schema.space === 'html' && node.tagName === 'svg') {
    ctx.schema = svg
  }

  attrs = serializeAttributes(ctx, node.properties)

  content = all(
    ctx,
    schema.space === 'html' && node.tagName === 'template' ? node.content : node
  )

  ctx.schema = schema

  // If the node is categorised as void, but it has children, remove the
  // categorisation.
  // This enables for example `menuitem`s, which are void in W3C HTML but not
  // void in WHATWG HTML, to be stringified properly.
  if (content) selfClosing = false

  if (attrs || !omit || !omit.opening(node, index, parent)) {
    parts.push('<', node.tagName, attrs ? ' ' + attrs : '')

    if (selfClosing && (schema.space === 'svg' || ctx.close)) {
      last = attrs.charAt(attrs.length - 1)
      if (
        !ctx.tightClose ||
        last === '/' ||
        (schema.space === 'svg' && last && last !== '"' && last !== "'")
      ) {
        parts.push(' ')
      }

      parts.push('/')
    }

    parts.push('>')
  }

  parts.push(content)

  if (!selfClosing && (!omit || !omit.closing(node, index, parent))) {
    parts.push('</' + node.tagName + '>')
  }

  return parts.join('')
}

function serializeAttributes(ctx, props) {
  var values = []
  var index = -1
  var key
  var value
  var last

  for (key in props) {
    if (props[key] != null) {
      value = serializeAttribute(ctx, key, props[key])
      if (value) values.push(value)
    }
  }

  while (++index < values.length) {
    last = ctx.tight ? values[index].charAt(values[index].length - 1) : null

    // In tight mode, don’t add a space after quoted attributes.
    if (index !== values.length - 1 && last !== '"' && last !== "'") {
      values[index] += ' '
    }
  }

  return values.join('')
}

function serializeAttribute(ctx, key, value) {
  var info = find(ctx.schema, key)
  var quote = ctx.quote
  var result
  var name

  if (info.overloadedBoolean && (value === info.attribute || value === '')) {
    value = true
  } else if (
    info.boolean ||
    (info.overloadedBoolean && typeof value !== 'string')
  ) {
    value = Boolean(value)
  }

  if (
    value == null ||
    value === false ||
    (typeof value === 'number' && value !== value)
  ) {
    return ''
  }

  name = entities(
    info.attribute,
    xtend(ctx.entities, {
      // Always encode without parse errors in non-HTML.
      subset:
        constants.name[ctx.schema.space === 'html' ? ctx.valid : 1][ctx.safe]
    })
  )

  // No value.
  // There is currently only one boolean property in SVG: `[download]` on
  // `<a>`.
  // This property does not seem to work in browsers (FF, Sa, Ch), so I can’t
  // test if dropping the value works.
  // But I assume that it should:
  //
  // ```html
  // <!doctype html>
  // <svg viewBox="0 0 100 100">
  //   <a href=https://example.com download>
  //     <circle cx=50 cy=40 r=35 />
  //   </a>
  // </svg>
  // ```
  //
  // See: <https://github.com/wooorm/property-information/blob/main/lib/svg.js>
  if (value === true) return name

  value =
    typeof value === 'object' && 'length' in value
      ? // `spaces` doesn’t accept a second argument, but it’s given here just to
        // keep the code cleaner.
        (info.commaSeparated ? commas.stringify : spaces.stringify)(value, {
          padLeft: !ctx.tightLists
        })
      : String(value)

  if (ctx.collapseEmpty && !value) return name

  // Check unquoted value.
  if (ctx.unquoted) {
    result = entities(
      value,
      xtend(ctx.entities, {
        subset: constants.unquoted[ctx.valid][ctx.safe],
        attribute: true
      })
    )
  }

  // If we don’t want unquoted, or if `value` contains character references when
  // unquoted…
  if (result !== value) {
    // If the alternative is less common than `quote`, switch.
    if (ctx.smart && ccount(value, quote) > ccount(value, ctx.alternative)) {
      quote = ctx.alternative
    }

    result =
      quote +
      entities(
        value,
        xtend(ctx.entities, {
          // Always encode without parse errors in non-HTML.
          subset: (quote === "'" ? constants.single : constants.double)[
            ctx.schema.space === 'html' ? ctx.valid : 1
          ][ctx.safe],
          attribute: true
        })
      ) +
      quote
  }

  // Don’t add a `=` for unquoted empties.
  return name + (result ? '=' + result : result)
}


/***/ }),

/***/ "./node_modules/hast-util-to-html/lib/index.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var html = __webpack_require__("./node_modules/property-information/html.js")
var svg = __webpack_require__("./node_modules/property-information/svg.js")
var voids = __webpack_require__("./node_modules/html-void-elements/index.json")
var omission = __webpack_require__("./node_modules/hast-util-to-html/lib/omission/index.js")
var one = __webpack_require__("./node_modules/hast-util-to-html/lib/one.js")

module.exports = toHtml

var deprecationWarningIssued

function toHtml(node, options) {
  var settings = options || {}
  var quote = settings.quote || '"'
  var alternative = quote === '"' ? "'" : '"'

  if (quote !== '"' && quote !== "'") {
    throw new Error('Invalid quote `' + quote + '`, expected `\'` or `"`')
  }

  if ('allowDangerousHTML' in settings && !deprecationWarningIssued) {
    deprecationWarningIssued = true
    console.warn(
      'Deprecation warning: `allowDangerousHTML` is a nonstandard option, use `allowDangerousHtml` instead'
    )
  }

  return one(
    {
      valid: settings.allowParseErrors ? 0 : 1,
      safe: settings.allowDangerousCharacters ? 0 : 1,
      schema: settings.space === 'svg' ? svg : html,
      omit: settings.omitOptionalTags && omission,
      quote: quote,
      alternative: alternative,
      smart: settings.quoteSmart,
      unquoted: settings.preferUnquoted,
      tight: settings.tightAttributes,
      upperDoctype: settings.upperDoctype,
      tightDoctype: settings.tightDoctype,
      bogusComments: settings.bogusComments,
      tightLists: settings.tightCommaSeparatedLists,
      tightClose: settings.tightSelfClosing,
      collapseEmpty: settings.collapseEmptyAttributes,
      dangerous: settings.allowDangerousHtml || settings.allowDangerousHTML,
      voids: settings.voids || voids.concat(),
      entities: settings.entities || {},
      close: settings.closeSelfClosing,
      closeEmpty: settings.closeEmptyElements
    },
    node && typeof node === 'object' && 'length' in node
      ? {type: 'root', children: node}
      : node
  )
}


/***/ }),

/***/ "./node_modules/hast-util-to-html/lib/omission/closing.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var element = __webpack_require__("./node_modules/hast-util-is-element/index.js")
var whiteSpaceStart = __webpack_require__("./node_modules/hast-util-to-html/lib/omission/util/white-space-start.js")
var comment = __webpack_require__("./node_modules/hast-util-to-html/lib/omission/util/comment.js")
var siblings = __webpack_require__("./node_modules/hast-util-to-html/lib/omission/util/siblings.js")
var omission = __webpack_require__("./node_modules/hast-util-to-html/lib/omission/omission.js")

module.exports = omission({
  html: html,
  head: headOrColgroupOrCaption,
  body: body,
  p: p,
  li: li,
  dt: dt,
  dd: dd,
  rt: rubyElement,
  rp: rubyElement,
  optgroup: optgroup,
  option: option,
  menuitem: menuitem,
  colgroup: headOrColgroupOrCaption,
  caption: headOrColgroupOrCaption,
  thead: thead,
  tbody: tbody,
  tfoot: tfoot,
  tr: tr,
  td: cells,
  th: cells
})

// Macro for `</head>`, `</colgroup>`, and `</caption>`.
function headOrColgroupOrCaption(node, index, parent) {
  var next = siblings.after(parent, index, true)
  return !next || (!comment(next) && !whiteSpaceStart(next))
}

// Whether to omit `</html>`.
function html(node, index, parent) {
  var next = siblings.after(parent, index)
  return !next || !comment(next)
}

// Whether to omit `</body>`.
function body(node, index, parent) {
  var next = siblings.after(parent, index)
  return !next || !comment(next)
}

// Whether to omit `</p>`.
function p(node, index, parent) {
  var next = siblings.after(parent, index)
  return next
    ? element(next, [
        'address',
        'article',
        'aside',
        'blockquote',
        'details',
        'div',
        'dl',
        'fieldset',
        'figcaption',
        'figure',
        'footer',
        'form',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'header',
        'hgroup',
        'hr',
        'main',
        'menu',
        'nav',
        'ol',
        'p',
        'pre',
        'section',
        'table',
        'ul'
      ])
    : !parent ||
        // Confusing parent.
        !element(parent, [
          'a',
          'audio',
          'del',
          'ins',
          'map',
          'noscript',
          'video'
        ])
}

// Whether to omit `</li>`.
function li(node, index, parent) {
  var next = siblings.after(parent, index)
  return !next || element(next, 'li')
}

// Whether to omit `</dt>`.
function dt(node, index, parent) {
  var next = siblings.after(parent, index)
  return next && element(next, ['dt', 'dd'])
}

// Whether to omit `</dd>`.
function dd(node, index, parent) {
  var next = siblings.after(parent, index)
  return !next || element(next, ['dt', 'dd'])
}

// Whether to omit `</rt>` or `</rp>`.
function rubyElement(node, index, parent) {
  var next = siblings.after(parent, index)
  return !next || element(next, ['rp', 'rt'])
}

// Whether to omit `</optgroup>`.
function optgroup(node, index, parent) {
  var next = siblings.after(parent, index)
  return !next || element(next, 'optgroup')
}

// Whether to omit `</option>`.
function option(node, index, parent) {
  var next = siblings.after(parent, index)
  return !next || element(next, ['option', 'optgroup'])
}

// Whether to omit `</menuitem>`.
function menuitem(node, index, parent) {
  var next = siblings.after(parent, index)
  return !next || element(next, ['menuitem', 'hr', 'menu'])
}

// Whether to omit `</thead>`.
function thead(node, index, parent) {
  var next = siblings.after(parent, index)
  return next && element(next, ['tbody', 'tfoot'])
}

// Whether to omit `</tbody>`.
function tbody(node, index, parent) {
  var next = siblings.after(parent, index)
  return !next || element(next, ['tbody', 'tfoot'])
}

// Whether to omit `</tfoot>`.
function tfoot(node, index, parent) {
  return !siblings.after(parent, index)
}

// Whether to omit `</tr>`.
function tr(node, index, parent) {
  var next = siblings.after(parent, index)
  return !next || element(next, 'tr')
}

// Whether to omit `</td>` or `</th>`.
function cells(node, index, parent) {
  var next = siblings.after(parent, index)
  return !next || element(next, ['td', 'th'])
}


/***/ }),

/***/ "./node_modules/hast-util-to-html/lib/omission/index.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.opening = __webpack_require__("./node_modules/hast-util-to-html/lib/omission/opening.js")
exports.closing = __webpack_require__("./node_modules/hast-util-to-html/lib/omission/closing.js")


/***/ }),

/***/ "./node_modules/hast-util-to-html/lib/omission/omission.js":
/***/ ((module) => {

"use strict";


module.exports = omission

var own = {}.hasOwnProperty

// Factory to check if a given node can have a tag omitted.
function omission(handlers) {
  return omit

  // Check if a given node can have a tag omitted.
  function omit(node, index, parent) {
    return (
      own.call(handlers, node.tagName) &&
      handlers[node.tagName](node, index, parent)
    )
  }
}


/***/ }),

/***/ "./node_modules/hast-util-to-html/lib/omission/opening.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var element = __webpack_require__("./node_modules/hast-util-is-element/index.js")
var siblings = __webpack_require__("./node_modules/hast-util-to-html/lib/omission/util/siblings.js")
var whiteSpaceStart = __webpack_require__("./node_modules/hast-util-to-html/lib/omission/util/white-space-start.js")
var comment = __webpack_require__("./node_modules/hast-util-to-html/lib/omission/util/comment.js")
var closing = __webpack_require__("./node_modules/hast-util-to-html/lib/omission/closing.js")
var omission = __webpack_require__("./node_modules/hast-util-to-html/lib/omission/omission.js")

module.exports = omission({
  html: html,
  head: head,
  body: body,
  colgroup: colgroup,
  tbody: tbody
})

// Whether to omit `<html>`.
function html(node) {
  var head = siblings.after(node, -1)
  return !head || !comment(head)
}

// Whether to omit `<head>`.
function head(node) {
  var children = node.children
  var seen = []
  var index = -1

  while (++index < children.length) {
    if (element(children[index], ['title', 'base'])) {
      if (seen.indexOf(children[index].tagName) > -1) return false
      seen.push(children[index].tagName)
    }
  }

  return children.length
}

// Whether to omit `<body>`.
function body(node) {
  var head = siblings.after(node, -1, true)

  return (
    !head ||
    (!comment(head) &&
      !whiteSpaceStart(head) &&
      !element(head, ['meta', 'link', 'script', 'style', 'template']))
  )
}

// Whether to omit `<colgroup>`.
// The spec describes some logic for the opening tag, but it’s easier to
// implement in the closing tag, to the same effect, so we handle it there
// instead.
function colgroup(node, index, parent) {
  var previous = siblings.before(parent, index)
  var head = siblings.after(node, -1, true)

  // Previous colgroup was already omitted.
  if (
    element(previous, 'colgroup') &&
    closing(previous, parent.children.indexOf(previous), parent)
  ) {
    return false
  }

  return head && element(head, 'col')
}

// Whether to omit `<tbody>`.
function tbody(node, index, parent) {
  var previous = siblings.before(parent, index)
  var head = siblings.after(node, -1)

  // Previous table section was already omitted.
  if (
    element(previous, ['thead', 'tbody']) &&
    closing(previous, parent.children.indexOf(previous), parent)
  ) {
    return false
  }

  return head && element(head, 'tr')
}


/***/ }),

/***/ "./node_modules/hast-util-to-html/lib/omission/util/comment.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var convert = __webpack_require__("./node_modules/unist-util-is/convert.js")

module.exports = convert('comment')


/***/ }),

/***/ "./node_modules/hast-util-to-html/lib/omission/util/siblings.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var whiteSpace = __webpack_require__("./node_modules/hast-util-whitespace/index.js")

exports.before = siblings(-1)
exports.after = siblings(1)

// Factory to check siblings in a direction.
function siblings(increment) {
  return sibling

  // Find applicable siblings in a direction.
  function sibling(parent, index, includeWhiteSpace) {
    var siblings = parent && parent.children
    var offset = index + increment
    var next = siblings && siblings[offset]

    if (!includeWhiteSpace) {
      while (next && whiteSpace(next)) {
        offset += increment
        next = siblings[offset]
      }
    }

    return next
  }
}


/***/ }),

/***/ "./node_modules/hast-util-to-html/lib/omission/util/white-space-start.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var convert = __webpack_require__("./node_modules/unist-util-is/convert.js")
var whiteSpace = __webpack_require__("./node_modules/hast-util-whitespace/index.js")

module.exports = whiteSpaceStart

var isText = convert('text')

// Check if `node` starts with white-space.
function whiteSpaceStart(node) {
  return isText(node) && whiteSpace(node.value.charAt(0))
}


/***/ }),

/***/ "./node_modules/hast-util-to-html/lib/one.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = serialize

var handlers = {
  comment: __webpack_require__("./node_modules/hast-util-to-html/lib/comment.js"),
  doctype: __webpack_require__("./node_modules/hast-util-to-html/lib/doctype.js"),
  element: __webpack_require__("./node_modules/hast-util-to-html/lib/element.js"),
  raw: __webpack_require__("./node_modules/hast-util-to-html/lib/raw.js"),
  root: __webpack_require__("./node_modules/hast-util-to-html/lib/all.js"),
  text: __webpack_require__("./node_modules/hast-util-to-html/lib/text.js")
}

var own = {}.hasOwnProperty

function serialize(ctx, node, index, parent) {
  if (!node || !node.type) {
    throw new Error('Expected node, not `' + node + '`')
  }

  if (!own.call(handlers, node.type)) {
    throw new Error('Cannot compile unknown node `' + node.type + '`')
  }

  return handlers[node.type](ctx, node, index, parent)
}


/***/ }),

/***/ "./node_modules/hast-util-to-html/lib/raw.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var text = __webpack_require__("./node_modules/hast-util-to-html/lib/text.js")

module.exports = serializeRaw

function serializeRaw(ctx, node) {
  return ctx.dangerous ? node.value : text(ctx, node)
}


/***/ }),

/***/ "./node_modules/hast-util-to-html/lib/text.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var xtend = __webpack_require__("./node_modules/xtend/immutable.js")
var entities = __webpack_require__("./node_modules/stringify-entities/index.js")

module.exports = serializeText

function serializeText(ctx, node, index, parent) {
  // Check if content of `node` should be escaped.
  return parent && (parent.tagName === 'script' || parent.tagName === 'style')
    ? node.value
    : entities(node.value, xtend(ctx.entities, {subset: ['<', '&']}))
}


/***/ }),

/***/ "./node_modules/hast-util-whitespace/index.js":
/***/ ((module) => {

"use strict";


module.exports = interElementWhiteSpace

// HTML white-space expression.
// See <https://html.spec.whatwg.org/#space-character>.
var re = /[ \t\n\f\r]/g

function interElementWhiteSpace(node) {
  var value

  if (node && typeof node === 'object' && node.type === 'text') {
    value = node.value || ''
  } else if (typeof node === 'string') {
    value = node
  } else {
    return false
  }

  return value.replace(re, '') === ''
}


/***/ }),

/***/ "./node_modules/html-void-elements/index.json":
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('["area","base","basefont","bgsound","br","col","command","embed","frame","hr","image","img","input","isindex","keygen","link","menuitem","meta","nextid","param","source","track","wbr"]');

/***/ }),

/***/ "./node_modules/stringify-entities/index.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__("./node_modules/stringify-entities/lib/index.js")


/***/ }),

/***/ "./node_modules/stringify-entities/lib/constant/characters.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var entities = __webpack_require__("./node_modules/character-entities-html4/index.json")

var characters = {}
var name

module.exports = characters

for (name in entities) {
  characters[entities[name]] = name
}


/***/ }),

/***/ "./node_modules/stringify-entities/lib/constant/dangerous.json":
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('["cent","copy","divide","gt","lt","not","para","times"]');

/***/ }),

/***/ "./node_modules/stringify-entities/lib/constant/from-char-code.js":
/***/ ((module) => {

module.exports = String.fromCharCode


/***/ }),

/***/ "./node_modules/stringify-entities/lib/constant/has-own-property.js":
/***/ ((module) => {

module.exports = {}.hasOwnProperty


/***/ }),

/***/ "./node_modules/stringify-entities/lib/core.js":
/***/ ((module) => {

"use strict";


module.exports = encode

// Encode special characters in `value`.
function encode(value, options) {
  value = value.replace(
    options.subset ? charactersToExpression(options.subset) : /["&'<>`]/g,
    basic
  )

  if (options.subset || options.escapeOnly) {
    return value
  }

  return (
    value
      // Surrogate pairs.
      .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, surrogate)
      // BMP control characters (C0 except for LF, CR, SP; DEL; and some more
      // non-ASCII ones).
      .replace(
        // eslint-disable-next-line no-control-regex, unicorn/no-hex-escape
        /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g,
        basic
      )
  )

  function surrogate(pair, index, all) {
    return options.format(
      (pair.charCodeAt(0) - 0xd800) * 0x400 +
        pair.charCodeAt(1) -
        0xdc00 +
        0x10000,
      all.charCodeAt(index + 2),
      options
    )
  }

  function basic(character, index, all) {
    return options.format(
      character.charCodeAt(0),
      all.charCodeAt(index + 1),
      options
    )
  }
}

function charactersToExpression(subset) {
  var groups = []
  var index = -1

  while (++index < subset.length) {
    groups.push(subset[index].replace(/[|\\{}()[\]^$+*?.]/g, '\\$&'))
  }

  return new RegExp('(?:' + groups.join('|') + ')', 'g')
}


/***/ }),

/***/ "./node_modules/stringify-entities/lib/encode.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var xtend = __webpack_require__("./node_modules/xtend/immutable.js")
var core = __webpack_require__("./node_modules/stringify-entities/lib/core.js")
var smart = __webpack_require__("./node_modules/stringify-entities/lib/util/format-smart.js")

module.exports = encode

// Encode special characters in `value`.
function encode(value, options) {
  // Note: Switch to `Object.assign` next major.
  return core(value, xtend(options, {format: smart}))
}


/***/ }),

/***/ "./node_modules/stringify-entities/lib/escape.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var core = __webpack_require__("./node_modules/stringify-entities/lib/core.js")
var smart = __webpack_require__("./node_modules/stringify-entities/lib/util/format-smart.js")

module.exports = escape

// Shortcut to escape special characters in HTML.
function escape(value) {
  return core(value, {
    escapeOnly: true,
    useNamedReferences: true,
    format: smart
  })
}


/***/ }),

/***/ "./node_modules/stringify-entities/lib/index.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var encode = __webpack_require__("./node_modules/stringify-entities/lib/encode.js")
var escape = __webpack_require__("./node_modules/stringify-entities/lib/escape.js")

module.exports = encode
encode.escape = escape


/***/ }),

/***/ "./node_modules/stringify-entities/lib/util/format-smart.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = formatPretty

var toHexadecimal = __webpack_require__("./node_modules/stringify-entities/lib/util/to-hexadecimal.js")
var toDecimal = __webpack_require__("./node_modules/stringify-entities/lib/util/to-decimal.js")
var toNamed = __webpack_require__("./node_modules/stringify-entities/lib/util/to-named.js")

// Encode `character` according to `options`.
function formatPretty(code, next, options) {
  var named
  var numeric
  var decimal

  if (options.useNamedReferences || options.useShortestReferences) {
    named = toNamed(
      code,
      next,
      options.omitOptionalSemicolons,
      options.attribute
    )
  }

  if (options.useShortestReferences || !named) {
    numeric = toHexadecimal(code, next, options.omitOptionalSemicolons)

    // Use the shortest numeric reference when requested.
    // A simple algorithm would use decimal for all code points under 100, as
    // those are shorter than hexadecimal:
    //
    // * `&#99;` vs `&#x63;` (decimal shorter)
    // * `&#100;` vs `&#x64;` (equal)
    //
    // However, because we take `next` into consideration when `omit` is used,
    // And it would be possible that decimals are shorter on bigger values as
    // well if `next` is hexadecimal but not decimal, we instead compare both.
    if (options.useShortestReferences) {
      decimal = toDecimal(code, next, options.omitOptionalSemicolons)

      if (decimal.length < numeric.length) {
        numeric = decimal
      }
    }
  }

  return named &&
    (!options.useShortestReferences || named.length < numeric.length)
    ? named
    : numeric
}


/***/ }),

/***/ "./node_modules/stringify-entities/lib/util/to-decimal.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = toDecimalReference

var fromCharCode = __webpack_require__("./node_modules/stringify-entities/lib/constant/from-char-code.js")

// Transform `code` into a decimal character reference.
function toDecimalReference(code, next, omit) {
  var value = '&#' + String(code)
  return omit && next && !/\d/.test(fromCharCode(next)) ? value : value + ';'
}


/***/ }),

/***/ "./node_modules/stringify-entities/lib/util/to-hexadecimal.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = toHexReference

var fromCharCode = __webpack_require__("./node_modules/stringify-entities/lib/constant/from-char-code.js")

// Transform `code` into a hexadecimal character reference.
function toHexReference(code, next, omit) {
  var value = '&#x' + code.toString(16).toUpperCase()
  return omit && next && !/[\dA-Fa-f]/.test(fromCharCode(next))
    ? value
    : value + ';'
}


/***/ }),

/***/ "./node_modules/stringify-entities/lib/util/to-named.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = toNamed

var legacy = __webpack_require__("./node_modules/character-entities-legacy/index.json")
var characters = __webpack_require__("./node_modules/stringify-entities/lib/constant/characters.js")
var fromCharCode = __webpack_require__("./node_modules/stringify-entities/lib/constant/from-char-code.js")
var own = __webpack_require__("./node_modules/stringify-entities/lib/constant/has-own-property.js")
var dangerous = __webpack_require__("./node_modules/stringify-entities/lib/constant/dangerous.json")

// Transform `code` into a named character reference.
function toNamed(code, next, omit, attribute) {
  var character = fromCharCode(code)
  var name
  var value

  if (own.call(characters, character)) {
    name = characters[character]
    value = '&' + name

    if (
      omit &&
      own.call(legacy, name) &&
      dangerous.indexOf(name) === -1 &&
      (!attribute ||
        (next && next !== 61 /* `=` */ && /[^\da-z]/i.test(fromCharCode(next))))
    ) {
      return value
    }

    return value + ';'
  }

  return ''
}


/***/ })

}]);
//# sourceMappingURL=274.2a8ba50f.iframe.bundle.js.map