"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const picasso_1 = require("@toptal/picasso");
const UnderlineLinkExample = () => (react_1.default.createElement("div", null,
    react_1.default.createElement(picasso_1.Container, { inline: true, right: 'large' },
        react_1.default.createElement(picasso_1.Link, { href: 'https://toptal.com', underline: 'none' }, "Link with `underline: none`")),
    react_1.default.createElement(picasso_1.Container, { inline: true, right: 'large' },
        react_1.default.createElement(picasso_1.Link, { href: 'https://toptal.com', underline: 'hover' }, "Link with `underline: hover`")),
    react_1.default.createElement(picasso_1.Container, { inline: true },
        react_1.default.createElement(picasso_1.Link, { href: 'https://toptal.com', underline: 'always' }, "Link with `underline: always`"))));
exports.default = UnderlineLinkExample;
//# sourceMappingURL=Underline.example.js.map