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
const styles_1 = require("@material-ui/core/styles");
const RootRef_1 = __importDefault(require("@material-ui/core/RootRef"));
const Menu_1 = __importDefault(require("../Menu"));
const styles_2 = __importDefault(require("./styles"));
var Direction;
(function (Direction) {
    Direction[Direction["UP"] = 0] = "UP";
    Direction[Direction["DOWN"] = 1] = "DOWN";
})(Direction || (Direction = {}));
const ScrollMenu = ({ selectedIndex, classes, children }) => {
    const menuRef = react_1.useRef(null);
    const firstItemRef = react_1.createRef();
    const [prevSelectedIndex, setPrevSelectedIndex] = react_1.useState(selectedIndex);
    const renderChildren = react_1.default.Children.map(children, (child, index) => {
        if (index === 0) {
            // hack to be able to set ref for Menu.Item
            // when we will move to MUI v4 we will be able
            // just set ref={firstItemRef} to the child
            return react_1.default.createElement(RootRef_1.default, { rootRef: firstItemRef }, child);
        }
        return child;
    });
    react_1.useEffect(() => {
        if (!menuRef.current || !firstItemRef.current) {
            return;
        }
        if (selectedIndex === undefined || selectedIndex === null) {
            return;
        }
        const currentScrollTop = menuRef.current.scrollTop;
        const itemHeight = firstItemRef.current.offsetHeight;
        const scrollViewHeight = menuRef.current.offsetHeight;
        const moveDirection = prevSelectedIndex && prevSelectedIndex <= selectedIndex
            ? Direction.DOWN
            : Direction.UP;
        const countItemsOnScrollView = Math.floor(scrollViewHeight / itemHeight);
        const topVisibleItem = currentScrollTop / itemHeight;
        const bottomVisibleItem = topVisibleItem + countItemsOnScrollView - 1;
        const isHighlightedItemInScrollView = selectedIndex >= topVisibleItem && selectedIndex <= bottomVisibleItem;
        if (!isHighlightedItemInScrollView) {
            let scrollTop = 0;
            if (moveDirection === Direction.UP) {
                scrollTop = (selectedIndex - 1) * itemHeight;
            }
            else if (moveDirection === Direction.DOWN) {
                scrollTop = (selectedIndex - countItemsOnScrollView + 1) * itemHeight;
            }
            menuRef.current.scrollTop = scrollTop;
        }
        setPrevSelectedIndex(selectedIndex);
    });
    return (react_1.default.createElement(Menu_1.default, { className: classes.menu },
        react_1.default.createElement("div", { ref: menuRef, className: classes.scrollView }, renderChildren)));
};
exports.default = styles_1.withStyles(styles_2.default)(ScrollMenu);
//# sourceMappingURL=ScrollMenu.js.map