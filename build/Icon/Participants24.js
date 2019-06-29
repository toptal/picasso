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
const SvgParticipants24 = (props) => {
    const { classes, className, style = {}, color, scale, size, base } = props;
    if (size) {
        const name = 'SvgParticipants24';
        window.console.warn(`${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`);
    }
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M16.953 16.437a4 4 0 1 1 4.095 0A5.001 5.001 0 0 1 24 21h-1a4 4 0 0 0-6.222-3.327l-.556-.83c.232-.156.476-.291.73-.406zM5.428 13.422a6 6 0 1 1 5.144 0A8.003 8.003 0 0 1 16 21h-1a7 7 0 0 0-14 0H0a8.003 8.003 0 0 1 5.428-7.578zM8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10zm11 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', id: 'participants24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'participants24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#participants24_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#participants24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#participants24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
};
SvgParticipants24.displayName = 'SvgParticipants24';
exports.default = styles_1.withStyles(styles_2.default)(SvgParticipants24);
//# sourceMappingURL=Participants24.js.map