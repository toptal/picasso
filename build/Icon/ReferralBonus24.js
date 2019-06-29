"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const BASE_SIZE = 24;
const SvgReferralBonus24 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgReferralBonus24';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M13 21.5h-2V24h-1v-2.5c-2.727-.025-5.217-1.515-6.443-3.869l-.231-.443.886-.462.231.443c1.053 2.02 3.199 3.306 5.557 3.33V12.5H8.687a5.288 5.288 0 0 1-3.66-1.457A4.91 4.91 0 0 1 3.5 7.5c0-2.766 2.327-5 5.188-5H10V0h1v2.5h2V0h1v2.5c2.727.025 5.217 1.515 6.443 3.869l.231.443-.886.462-.231-.443c-1.053-2.02-3.199-3.306-5.557-3.33V11.5h1.313c2.86 0 5.187 2.234 5.187 5s-2.327 5-5.188 5H14V24h-1v-2.5zm0-10v-8h-2v8h2zm0 9v-8h-2v8h2zm1 0h1.313c2.317 0 4.187-1.796 4.187-4 0-2.204-1.87-4-4.188-4H14v8zm-4-17H8.687C6.37 3.5 4.5 5.296 4.5 7.5a3.91 3.91 0 0 0 1.22 2.821A4.289 4.289 0 0 0 8.687 11.5H10v-8z', id: 'referralBonus24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'referralBonus24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#referralBonus24_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#referralBonus24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#referralBonus24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
};
SvgReferralBonus24.displayName = 'SvgReferralBonus24';
exports.default = styles_1.withStyles(styles_2.default)(SvgReferralBonus24);
//# sourceMappingURL=ReferralBonus24.js.map