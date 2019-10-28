import { useLayoutEffect, useState } from 'react';
const useWidthOf = (ref) => {
    const [menuWidth, setMenuWidth] = useState();
    useLayoutEffect(() => {
        if (!ref.current) {
            return;
        }
        const { width } = ref.current.getBoundingClientRect();
        setMenuWidth(`${width}px`);
    }, [ref.current]);
    return menuWidth;
};
export default useWidthOf;
//# sourceMappingURL=use-width-of.js.map