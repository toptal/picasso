import { useLayoutEffect } from 'react';
const PROXIMA_NOVA_FONT = 'https://use.typekit.net/rlr4crj.css';
// After the file is loaded to apply it
// we have to change rel to 'stylesheet'
// https://alligator.io/html/preload-prefetch
const applyLoadedFont = (e) => {
    const target = e.target;
    target.rel = 'stylesheet';
};
const findFontsLoader = () => {
    const links = Array.from(document.getElementsByTagName('link'));
    return links.find(link => link.as === 'style' &&
        link.href === PROXIMA_NOVA_FONT &&
        (link.rel === 'stylesheet' || link.rel === 'preload'));
};
const FontsLoader = () => {
    useLayoutEffect(() => {
        const existingFontLoader = findFontsLoader();
        if (!existingFontLoader) {
            const link = document.createElement('link');
            link.as = 'style';
            link.href = PROXIMA_NOVA_FONT;
            link.rel = 'preload';
            link.addEventListener('load', applyLoadedFont);
            document.body.appendChild(link);
        }
    }, []);
    return null;
};
export default FontsLoader;
//# sourceMappingURL=FontsLoader.js.map