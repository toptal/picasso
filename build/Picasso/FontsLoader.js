"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const PROXIMA_NOVA_FONT = 'https://use.typekit.net/rlr4crj.css';
// After the file is loaded to apply it
// we have to change rel to 'stylesheet'
// https://alligator.io/html/preload-prefetch
const applyLoadedFont = (e) => {
    const target = e.target;
    target.rel = 'stylesheet';
};
const FontsLoader = () => (react_1.default.createElement("link", { as: 'style', href: PROXIMA_NOVA_FONT, onLoad: applyLoadedFont, rel: 'preload' }));
exports.default = FontsLoader;
//# sourceMappingURL=FontsLoader.js.map