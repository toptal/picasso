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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const palette_1 = __importDefault(require("../Picasso/config/palette"));
const UserBadge_1 = __importDefault(require("../UserBadge"));
const Typography_1 = __importDefault(require("../Typography"));
const Menu_1 = __importDefault(require("../Menu"));
const Link_1 = __importDefault(require("../Link"));
const Container_1 = __importDefault(require("../Container"));
const Icon_1 = require("../Icon");
const styles_2 = __importDefault(require("./styles"));
exports.AccountSelect = (_a) => {
    var { classes, className, accounts, onSelect, style } = _a, rest = __rest(_a, ["classes", "className", "accounts", "onSelect", "style"]);
    const { accountItem: accountItemClass, accountLink: accountLinkClass } = classes, menuClasses = __rest(classes, ["accountItem", "accountLink"]);
    return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    react_1.default.createElement(Menu_1.default, Object.assign({}, rest, { classes: menuClasses, className: className, style: style }), accounts.map(account => (react_1.default.createElement(Menu_1.default.Item, { disableGutters: true, className: accountItemClass, key: `role-${account.id}` },
        react_1.default.createElement(Link_1.default, { className: accountLinkClass, href: account.href, onClick: () => onSelect(account), underline: 'none' },
            react_1.default.createElement(Container_1.default, { padded: 'medium', flex: true, direction: 'row', alignItems: 'center', justifyContent: 'space-between' },
                react_1.default.createElement(UserBadge_1.default, { name: account.name, avatar: account.avatar },
                    react_1.default.createElement(Typography_1.default, { size: 'small' }, account.position)),
                react_1.default.createElement(Icon_1.ChevronRight, { color: palette_1.default.text.primary }))))))));
};
exports.AccountSelect.defaultProps = {
    onSelect: () => { }
};
exports.AccountSelect.displayName = 'AccountSelect';
exports.default = styles_1.withStyles(styles_2.default)(exports.AccountSelect);
//# sourceMappingURL=AccountSelect.js.map