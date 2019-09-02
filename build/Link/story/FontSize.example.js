"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const picasso_1 = require("@toptal/picasso");
const FontSizeExample = () => {
    const handleClick = (e) => {
        e.preventDefault();
        window.alert('Click handled just before redirect');
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(picasso_1.Container, { inline: true, right: 'large' },
            react_1.default.createElement(picasso_1.Typography, null,
                "Please",
                ' ',
                react_1.default.createElement(picasso_1.Link, { onClick: handleClick, href: 'https://toptal.com' }, "verify"),
                ' ',
                "your email")),
        react_1.default.createElement(picasso_1.Container, { inline: true, right: 'large' },
            react_1.default.createElement(picasso_1.Typography, { variant: 'heading', size: 'large' },
                "Please",
                ' ',
                react_1.default.createElement(picasso_1.Link, { onClick: handleClick, href: 'https://toptal.com' }, "verify"),
                ' ',
                "your email"))));
};
exports.default = FontSizeExample;
//# sourceMappingURL=FontSize.example.js.map