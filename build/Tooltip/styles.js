"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const styles_2 = require("../styles");
const shadowColor = 'rgba(0, 0, 0, 0.8)';
const ARROW_SIZE = '1.25em';
const HORIZONTAL_POSITION = {
    top: '50%',
    transform: 'translateY(-50%)'
};
const VERTICAL_POSITION = {
    left: '50%',
    transform: 'translateX(-50%)'
};
function arrowGenerator(color) {
    return {
        opacity: 0.9,
        '&[x-placement*="bottom"] $arrow': {
            top: `-${ARROW_SIZE}`,
            '&::before': Object.assign({ borderWidth: `0 ${ARROW_SIZE} ${ARROW_SIZE} ${ARROW_SIZE}`, borderColor: `transparent transparent ${shadowColor} transparent` }, VERTICAL_POSITION),
            '&::after': Object.assign({ borderWidth: `0 ${ARROW_SIZE} ${ARROW_SIZE} ${ARROW_SIZE}`, borderColor: `transparent transparent ${color} transparent` }, VERTICAL_POSITION)
        },
        '&[x-placement*="top"] $arrow': {
            bottom: 0,
            '&::before': Object.assign({ borderWidth: `${ARROW_SIZE} ${ARROW_SIZE} 0 ${ARROW_SIZE}`, borderColor: `${shadowColor} transparent transparent transparent` }, VERTICAL_POSITION),
            '&::after': Object.assign({ borderWidth: `${ARROW_SIZE} ${ARROW_SIZE} 0 ${ARROW_SIZE}`, borderColor: `${color} transparent transparent transparent` }, VERTICAL_POSITION)
        },
        '&[x-placement*="right"] $arrow': {
            left: `-${ARROW_SIZE}`,
            '&::before': Object.assign({ borderWidth: `${ARROW_SIZE} ${ARROW_SIZE} ${ARROW_SIZE} 0`, borderColor: `transparent ${shadowColor} transparent transparent` }, HORIZONTAL_POSITION),
            '&::after': Object.assign({ borderWidth: `${ARROW_SIZE} ${ARROW_SIZE} ${ARROW_SIZE} 0`, borderColor: `transparent ${color} transparent transparent` }, HORIZONTAL_POSITION)
        },
        '&[x-placement*="left"] $arrow': {
            right: 0,
            '&::before': Object.assign({ borderWidth: `${ARROW_SIZE} 0 ${ARROW_SIZE} ${ARROW_SIZE}`, borderColor: `transparent transparent transparent ${shadowColor}` }, HORIZONTAL_POSITION),
            '&::after': Object.assign({ borderWidth: `${ARROW_SIZE} 0 ${ARROW_SIZE} ${ARROW_SIZE}`, borderColor: `transparent transparent transparent ${color}` }, HORIZONTAL_POSITION)
        }
    };
}
exports.default = ({ palette, shadows }) => styles_1.createStyles({
    tooltip: {
        backgroundColor: palette.grey.darker,
        color: palette.common.white,
        boxShadow: shadows[4],
        fontSize: styles_2.rem('13px'),
        lineHeight: '1.5em',
        padding: '1rem',
        borderRadius: 0,
        position: 'relative'
    },
    arrowPopper: arrowGenerator(palette.grey.darker),
    arrowPopperLight: arrowGenerator(palette.common.white),
    arrow: {
        position: 'absolute',
        fontSize: '0.4rem',
        '&:before, &:after': {
            position: 'absolute',
            content: '""',
            margin: 'auto',
            display: 'block',
            borderStyle: 'solid'
        }
    },
    light: {
        color: palette.grey.darker,
        backgroundColor: palette.common.white
    }
});
//# sourceMappingURL=styles.js.map