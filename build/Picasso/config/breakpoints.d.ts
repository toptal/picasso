import { Breakpoints } from '@material-ui/core/styles/createBreakpoints';
export declare const screens: (...sizes: BreakpointKeys[]) => string;
export declare const isScreenSize: (size: string | number, currentSize?: number | undefined) => boolean;
export declare const useScreenSize: () => number;
export declare const useBreakpoint: (sizes: "medium" | "large" | "small" | "extra-large" | BreakpointKeys[]) => boolean;
declare const breakpoints: Partial<Breakpoints>;
declare type BreakpointKeys = 'small' | 'medium' | 'large' | 'extra-large';
declare type BreakpointsList = {
    [key: string]: number;
};
export declare const breakpointsList: BreakpointsList;
export default breakpoints;
