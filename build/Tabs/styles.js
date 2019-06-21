"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const Picasso_1 = require("../Picasso");
Picasso_1.PicassoProvider.override(({ palette }) => ({
    MuiTabs: {
        root: {
            position: 'relative',
            minHeight: 0,
            '&::after': {
                position: 'absolute',
                content: '""',
                bottom: 0,
                left: 0,
                right: 0,
                height: 1,
                backgroundColor: palette.grey.main,
                zIndex: 0
            }
        },
        indicator: {
            backgroundColor: palette.blue.main,
            zIndex: 1
        }
    }
}));
exports.default = () => styles_1.createStyles({});
//# sourceMappingURL=styles.js.map