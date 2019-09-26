export const FIRST_PAGE = 1;
export const ONE_PAGE = 1;
export const ELLIPSIS = '...';
const getEllipsis = (siblings, targetPage) => {
    const lastSibling = siblings[siblings.length - 1];
    if (!lastSibling) {
        return [];
    }
    // we only want to add ellipsis if relative difference
    // between sibling and target page is more then one page
    // otherwise they are neighbours
    const relativeDiff = Math.abs(lastSibling - targetPage);
    if (lastSibling && relativeDiff > ONE_PAGE) {
        return [ELLIPSIS];
    }
    return [];
};
const getPreviousSiblings = (activePage, siblingCount) => {
    const previousSiblings = [];
    const lastSibling = activePage - siblingCount;
    for (let pageNumber = activePage - ONE_PAGE; pageNumber >= lastSibling && pageNumber >= FIRST_PAGE; pageNumber--) {
        previousSiblings.push(pageNumber);
    }
    const ellipsis = getEllipsis(previousSiblings, FIRST_PAGE);
    return [...ellipsis, ...previousSiblings.reverse()];
};
const getNextSiblings = (activePage, siblingCount, totalPages) => {
    const nextSiblings = [];
    const lastSibling = activePage + siblingCount;
    for (let pageNumber = activePage + ONE_PAGE; pageNumber <= lastSibling && pageNumber <= totalPages; pageNumber++) {
        nextSiblings.push(pageNumber);
    }
    const ellipsis = getEllipsis(nextSiblings, totalPages);
    return [...nextSiblings, ...ellipsis];
};
const getFirstPage = (activePage, siblingCount) => {
    if (activePage - siblingCount > FIRST_PAGE) {
        return [FIRST_PAGE];
    }
    return [];
};
const getLastPage = (activePage, siblingCount, totalPages) => {
    if (activePage + siblingCount < totalPages) {
        return [totalPages];
    }
    return [];
};
export const getRange = (activePage, totalPages, siblingCount) => {
    const previousSiblings = getPreviousSiblings(activePage, siblingCount);
    const nextSiblings = getNextSiblings(activePage, siblingCount, totalPages);
    const firstPage = getFirstPage(activePage, siblingCount);
    const lastPage = getLastPage(activePage, siblingCount, totalPages);
    return [
        ...firstPage,
        ...previousSiblings,
        activePage,
        ...nextSiblings,
        ...lastPage
    ];
};
//# sourceMappingURL=range-utils.js.map