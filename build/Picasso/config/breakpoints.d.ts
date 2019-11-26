import { Breakpoints } from '@material-ui/core/styles/createBreakpoints';
declare const breakpoints: Partial<Breakpoints>;
export declare const screens: (...sizes: BreakpointKeys[]) => string;
export declare const isScreenSize: (size: string | number, currentSize?: number | undefined) => boolean;
/**
 * Gets a screen size nickname that corresponds to the given screen size.
 *
 * For the list of breakpoint names and pixel-values we use in designs, check
 * https://picasso.toptal.net/?path=/story/utils-folder--breakpoints
 *
 * @param {number} size Screen size
 */
export declare const screenSizeToBreakpointKey: (size: number) => BreakpointKeys;
export declare const useScreenSize: () => number;
export declare const useBreakpoint: (sizes: "medium" | "large" | "small" | "extra-large" | BreakpointKeys[]) => boolean;
/**
 * Returns a function that picks a value from a {screenSize=>anyValue} object map.
 *
 * The function returned accepts 2 arguments:
 * 1. An object mapping values to screen size nicknames, e.g.
 *   {small: 'secondary-blue', large: 'primary-green'}
 * 2. A default value to use if no keys match in the object
 *
 * The function returns a value from the first argument that corresponds to the current
 * screen size, or the default value, if no corresponding key found.
 *
 * The returned function is memoized per screen size name.
 *
 * @example <caption>Varying both `variant` prop and button text with using the hook</caption>
 * const screens = useScreens()
 * <Button
 *   variant={screens(
 *     {
 *       small: 'secondary-blue',
 *       large: 'primary-green'
 *     },
 *     'primary-blue'
 *   )}
 * >
 * {screens(
 *   {
 *     small: 'small (secondary-blue)',
 *     large: 'large (primary-green)'
 *   },
 *   'default (primary-blue)'
 * )}
 * </Button>
 */
export declare const useScreens: <T = unknown>() => (valuesByScreen: Partial<Record<BreakpointKeys, T>>, defaultValue?: T | undefined) => T | undefined;
declare type BreakpointKeys = 'small' | 'medium' | 'large' | 'extra-large';
declare type BreakpointsList = {
    [key: string]: number;
};
export declare const breakpointsList: BreakpointsList;
export default breakpoints;
