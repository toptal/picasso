"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const picasso_1 = require("@toptal/picasso");
const utils_1 = require("@toptal/picasso/utils");
const ColorLinkExample = () => (react_1.default.createElement("div", null,
    react_1.default.createElement(picasso_1.Container, { inline: true, right: 'large' },
        react_1.default.createElement(picasso_1.Link, { href: window.parent.location.href + '#' }, "Blue Link")),
    react_1.default.createElement(picasso_1.Container, { inline: true, right: 'large' },
        react_1.default.createElement(picasso_1.Link, { color: 'black', href: window.parent.location.href + '#' }, "Black Link")),
    react_1.default.createElement(picasso_1.Container, { inline: true, style: { backgroundColor: utils_1.palette.grey.darker }, padded: 'medium' },
        react_1.default.createElement(picasso_1.Link, { color: 'white', href: window.parent.location.href + '#' }, "White Link"))));
exports.default = ColorLinkExample;
//# sourceMappingURL=Color.example.js.map