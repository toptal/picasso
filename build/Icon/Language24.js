"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const styles_1 = require("@material-ui/core/styles");
const styles_2 = __importDefault(require("./styles"));
const BASE_SIZE = 24;
const SvgLanguage24 = react_1.forwardRef(function SvgLanguage24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M8 18l-5 5v-5H1V1h22v17H8zm-4 2.586L7.586 17H22V2H2v15h2v3.586zM16.437 14h-1.235l-.767-1.924h-4.316L9.352 14H8.117l3.484-8.671h1.339L16.437 14zm-2.327-2.886l-1.833-4.667-1.846 4.667h3.679z', id: 'language24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'language24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#language24_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#language24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#language24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgLanguage24.displayName = 'SvgLanguage24';
exports.default = styles_1.withStyles(styles_2.default)(SvgLanguage24);
//# sourceMappingURL=Language24.js.map