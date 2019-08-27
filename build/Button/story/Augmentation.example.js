"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const picasso_1 = require("@toptal/picasso");
const Icon_1 = require("@toptal/picasso/Icon");
const ButtonAugmentationExample = () => (react_1.default.createElement("div", null,
    react_1.default.createElement(picasso_1.Button, { as: picasso_1.Link, href: '/#home' }, "Link"),
    react_1.default.createElement(picasso_1.Button, { as: picasso_1.Link, href: '/#home', icon: react_1.default.createElement(Icon_1.Settings16, null) }, "Link"),
    react_1.default.createElement(picasso_1.Button, { as: picasso_1.Link, href: '/#home', variant: 'secondary-red' }, "Link"),
    react_1.default.createElement(picasso_1.Button, { as: picasso_1.Link, href: '/#home', disabled: true }, "Link"),
    react_1.default.createElement(picasso_1.Button, { as: picasso_1.Link, href: '/#home', loading: true }, "Link")));
exports.default = ButtonAugmentationExample;
//# sourceMappingURL=Augmentation.example.js.map