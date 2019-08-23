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
const SvgSkype24 = react_1.forwardRef(function SvgSkype24(props, ref) {
    const { classes, className, style = {}, color, scale, base } = props;
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1);
    const svgStyle = Object.assign({ minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` }, style);
    return (react_1.default.createElement("svg", { viewBox: '0 0 24 24', className: classnames_1.default(classes.root, className), style: svgStyle, color: color, ref: ref },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("path", { d: 'M22.11 14.469a5.512 5.512 0 0 1-.737 6.913 5.57 5.57 0 0 1-6.982.704 10.447 10.447 0 0 1-9.739-2.8 10.34 10.34 0 0 1-2.736-9.715 5.512 5.512 0 0 1 .711-6.953 5.57 5.57 0 0 1 6.98-.705c3.503-.82 7.194.217 9.75 2.76a10.34 10.34 0 0 1 2.754 9.796zm-.97-.238a9.34 9.34 0 0 0-2.49-8.848 9.447 9.447 0 0 0-8.814-2.497l-.419.098-.359-.236a4.57 4.57 0 0 0-5.725.58 4.512 4.512 0 0 0-.584 5.69l.24.363-.101.423A9.34 9.34 0 0 0 5.36 18.58a9.447 9.447 0 0 0 8.807 2.532l.416-.096.357.235a4.57 4.57 0 0 0 5.727-.578 4.512 4.512 0 0 0 .605-5.659l-.236-.363.103-.42zm-13.587.993l-.224-.447.894-.448.224.447A3.12 3.12 0 0 0 11.24 16.5h2.26a2 2 0 0 0 0-4h-3a3 3 0 1 1 0-6h2.26a4.12 4.12 0 0 1 3.687 2.276l.224.447-.894.448-.224-.447A3.12 3.12 0 0 0 12.76 7.5H10.5a2 2 0 0 0 0 4h3a3 3 0 1 1 0 6h-2.26a4.12 4.12 0 0 1-3.687-2.276z', id: 'skype24_svg__a' })),
        react_1.default.createElement("g", { fillRule: 'evenodd' },
            react_1.default.createElement("mask", { id: 'skype24_svg__b' },
                react_1.default.createElement("use", { xlinkHref: '#skype24_svg__a' })),
            react_1.default.createElement("use", { fillRule: 'nonzero', xlinkHref: '#skype24_svg__a' }),
            react_1.default.createElement("g", { mask: 'url(#skype24_svg__b)' },
                react_1.default.createElement("path", { d: 'M0 0h24v24H0z' })))));
});
SvgSkype24.displayName = 'SvgSkype24';
exports.default = styles_1.withStyles(styles_2.default)(SvgSkype24);
//# sourceMappingURL=Skype24.js.map