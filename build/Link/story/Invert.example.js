"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const picasso_1 = require("@toptal/picasso");
const utils_1 = require("@toptal/picasso/utils");
const DefaultLinkExample = () => (react_1.default.createElement(picasso_1.Container, { style: { backgroundColor: utils_1.palette.grey.darker }, padded: 'medium' },
    react_1.default.createElement(picasso_1.Link, { invert: true, href: '#', style: { paddingRight: '2em' } }, "About us"),
    react_1.default.createElement(picasso_1.Link, { invert: true, href: '#', style: { paddingRight: '2em' } }, "Privacy Policy"),
    react_1.default.createElement(picasso_1.Link, { invert: true, href: '#' }, "Contact Us")));
exports.default = DefaultLinkExample;
//# sourceMappingURL=Invert.example.js.map