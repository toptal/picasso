"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const picasso_1 = require("@toptal/picasso");
const ActionLinkExample = () => {
    const handleClick = () => {
        window.alert('Action is invoked!');
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(picasso_1.Link, { variant: 'action', onClick: handleClick }, "This is an action link!")));
};
exports.default = ActionLinkExample;
//# sourceMappingURL=Action.example.js.map