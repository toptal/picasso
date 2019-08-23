declare module '@material-ui/core/styles/createTypography' {
    interface Typography {
        buttons: {
            fontSizeSmall: string;
            fontSizeMedium: string;
            fontSizeLarge: string;
        };
        fontWeights: {
            thin: number;
            light: number;
            regular: number;
            semibold: number;
            bold: number;
        };
    }
    interface FontStyle {
        inputSize: string;
    }
}
declare const typography: {
    fontFamily: string;
    fontSize: number;
    fontWeights: {
        thin: number;
        light: number;
        regular: number;
        semibold: number;
    };
    inputSize: string;
    buttons: {
        fontSizeSmall: string;
        fontSizeMedium: string;
        fontSizeLarge: string;
    };
};
export default typography;
