import { Layout } from './layout';
declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        layout: Layout;
        screens: (...sizes: string[]) => string;
    }
}
