"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const Picasso_1 = require("../Picasso");
Picasso_1.PicassoProvider.override(({ palette }) => ({
    MuiMenuItem: {
        root: {
            boxSizing: 'border-box',
            height: '2.25em',
            lineHeight: '1em',
            padding: 0,
            fontSize: 'inherit',
            '&:hover': {
                backgroundColor: palette.blue.lighter,
                '&$selected': {
                    backgroundColor: palette.blue.lighter
                }
            },
            '&$selected': {
                backgroundColor: palette.blue.lighter
            },
            '&:focus': {
                backgroundColor: palette.blue.lighter
            }
        },
        selected: {},
        gutters: {
            padding: '0.625em',
            // to override MUI paddingLeft and paddingRight default values
            paddingLeft: '0.625em',
            paddingRight: '0.625em'
        }
    }
}));
exports.default = () => styles_1.createStyles({
    stringContent: {
        fontSize: '0.8125em'
    }
});
//# sourceMappingURL=styles.js.map