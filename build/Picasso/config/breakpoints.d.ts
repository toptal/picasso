import { Breakpoints } from '@material-ui/core/styles/createBreakpoints';
export declare const screens: (...sizes: string[]) => string;
export declare const isScreenSize: (size: string | number, currentSize: number) => boolean;
export declare const useScreenSize: () => number;
declare const breakpoints: Partial<Breakpoints>;
declare type BreakpointsList = {
    [key: string]: number;
};
export declare const breakpointsList: BreakpointsList;
export default breakpoints;
