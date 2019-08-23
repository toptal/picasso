"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const picasso_1 = require("@toptal/picasso");
const DefaultLinkExample = () => (react_1.default.createElement("div", null,
    react_1.default.createElement(picasso_1.Link, { href: window.parent.location.href + '#' }, "Link")));
exports.default = DefaultLinkExample;
//# sourceMappingURL=Default.example.js.map