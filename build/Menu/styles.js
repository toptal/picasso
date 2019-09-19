"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const styles_2 = require("../styles");
const Picasso_1 = require("../Picasso");
require("../List/styles");
Picasso_1.PicassoProvider.override(({ shadows }) => ({
    MuiMenu: {
        paper: {
            boxShadow: shadows[2]
        }
    }
}));
exports.default = () => styles_1.createStyles({
    backButtonIcon: {
        verticalAlign: 'middle',
        marginTop: styles_2.rem('-1px'),
        marginRight: styles_2.rem('4px'),
        marginLeft: styles_2.rem('-5px')
    }
});
//# sourceMappingURL=styles.js.map