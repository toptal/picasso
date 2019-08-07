"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colors = {
    grey: {
        lighter: '#ebeced',
        light: '#d8d9dc',
        main: '#c4c6ca',
        main2: '#84888e',
        dark: '#455065',
        darker: '#262d3d'
    },
    blue: {
        lighter: '#edf1fd',
        light: '#25a9ef',
        main: '#204ecf',
        dark: '#183a9e',
        darker: '#0f256e'
    },
    yellow: {
        lighter: '#fff5e3',
        main: '#e59c01'
    },
    red: {
        lighter: '#fbedf1',
        main: '#d42551'
    },
    green: {
        lighter: '#eafbf5',
        main: '#00cc83',
        dark: '#03b080',
        darker: '#05947c'
    },
    common: {
        black: '#000',
        white: '#fff'
    }
};
const palette = Object.assign({}, JSON.parse(JSON.stringify(exports.colors)), { primary: JSON.parse(JSON.stringify(exports.colors.blue)), error: JSON.parse(JSON.stringify(exports.colors.red)), grey: Object.assign({ 100: exports.colors.grey.lighter, 200: exports.colors.grey.light, 300: exports.colors.grey.main, 400: exports.colors.grey.dark, 500: exports.colors.grey.darker }, exports.colors.grey), text: {
        primary: exports.colors.grey.dark
    }, background: {
        default: exports.colors.common.white
    } });
exports.default = palette;
//# sourceMappingURL=palette.js.map