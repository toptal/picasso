declare module '@material-ui/core/styles/createPalette' {
    interface SimplePaletteColorOptions {
        lighter?: string;
        light?: string;
        main: string;
        dark?: string;
        darker?: string;
    }
    interface Palette {
        blue: SimplePaletteColorOptions;
        green: SimplePaletteColorOptions;
        yellow: SimplePaletteColorOptions;
        red: SimplePaletteColorOptions;
    }
}
declare module '@material-ui/core' {
    interface Color {
        lighter?: string;
        light?: string;
        main?: string;
        dark?: string;
        darker?: string;
    }
}
export declare const colors: {
    grey: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
        darker: string;
    };
    blue: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
        darker: string;
    };
    yellow: {
        lighter: string;
        main: string;
    };
    red: {
        lighter: string;
        main: string;
    };
    green: {
        lighter: string;
        main: string;
        dark: string;
        darker: string;
    };
    common: {
        black: string;
        white: string;
    };
};
declare const palette: any;
export default palette;
