"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
const ButtonBase_1 = __importDefault(require("@material-ui/core/ButtonBase"));
const Loader_1 = __importDefault(require("../Loader"));
const Container_1 = __importDefault(require("../Container"));
const ButtonGroup_1 = __importDefault(require("../ButtonGroup"));
const kebab_to_camel_case_1 = __importDefault(require("../utils/kebab-to-camel-case"));
const styles_2 = __importDefault(require("./styles"));
const getVariantType = (variant) => {
    const [type] = variant.split('-');
    return type;
};
exports.Button = react_1.forwardRef(function Button(_a, ref) {
    var { icon, iconPosition, loading, children, classes, className, style, fullWidth, variant, size, focused, hovered, disabled, active, onClick, circular, title, value, type, as } = _a, rest = __rest(_a, ["icon", "iconPosition", "loading", "children", "classes", "className", "style", "fullWidth", "variant", "size", "focused", "hovered", "disabled", "active", "onClick", "circular", "title", "value", "type", "as"]);
    const { icon: iconClass, iconLeft: iconLeftClass, iconRight: iconRightClass, iconSmall: iconSmallClass, root: rootClass, hidden: hiddenClass, loader: loaderClass, content: contentClass } = classes;
    let finalChildren = [children];
    if (icon) {
        const iconComponent = react_1.default.cloneElement(icon, {
            className: classnames_1.default(iconClass, icon.props.className, {
                [iconLeftClass]: children && iconPosition === 'left',
                [iconRightClass]: children && iconPosition === 'right',
                [iconSmallClass]: size === 'small'
            }),
            key: 'button-icon',
            base: size === 'small' ? '12' : undefined
        });
        if (iconPosition === 'left') {
            finalChildren.unshift(iconComponent);
        }
        else {
            finalChildren.push(iconComponent);
        }
    }
    const variantType = getVariantType(variant);
    const variantClassName = disabled
        ? classes[`${variantType}Disabled`]
        : classes[kebab_to_camel_case_1.default(variant)];
    const sizeClassName = classes[size];
    const rootClassName = classnames_1.default({
        [classes.fullWidth]: fullWidth,
        [classes.active]: active,
        [classes.focused]: focused,
        [classes.hovered]: hovered,
        [classes.circular]: circular
    }, sizeClassName, variantClassName, rootClass);
    return (react_1.default.createElement(ButtonBase_1.default
    // eslint-disable-next-line react/jsx-props-no-spreading
    , Object.assign({}, rest, { ref: ref, classes: {
            root: rootClassName
        }, onClick: onClick, className: className, style: style, disabled: disabled, title: title, value: value, type: type, component: as }),
        react_1.default.createElement(Container_1.default, { as: 'span', inline: true, flex: true, direction: 'row', alignItems: 'center', className: classnames_1.default({ [hiddenClass]: loading }, contentClass) }, finalChildren),
        loading && (react_1.default.createElement(Loader_1.default, { variant: 'inherit', className: loaderClass, inline: true, size: 'small' }))));
});
exports.Button.defaultProps = {
    active: false,
    as: 'button',
    children: null,
    circular: false,
    disabled: false,
    focused: false,
    fullWidth: false,
    hovered: false,
    iconPosition: 'left',
    loading: false,
    onClick: () => { },
    size: 'medium',
    type: 'button',
    variant: 'primary-blue'
};
exports.Button.displayName = 'Button';
exports.Button.Group = ButtonGroup_1.default;
exports.default = styles_1.withStyles(styles_2.default)(exports.Button);
//# sourceMappingURL=Button.js.map