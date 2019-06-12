"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIRST_PAGE = 1;
exports.ONE_PAGE = 1;
exports.ELLIPSIS = '...';
const getEllipsis = (siblings, targetPage) => {
    const lastSibling = siblings[siblings.length - 1];
    if (!lastSibling) {
        return [];
    }
    // we only want to add ellipsis if relative difference
    // between sibling and target page is more then one page
    // otherwise they are neighbours
    const relativeDiff = Math.abs(lastSibling - targetPage);
    if (lastSibling && relativeDiff > exports.ONE_PAGE) {
        return [exports.ELLIPSIS];
    }
    return [];
};
const getPreviousSiblings = (activePage, siblingCount) => {
    const previousSiblings = [];
    const lastSibling = activePage - siblingCount;
    for (let pageNumber = activePage - exports.ONE_PAGE; pageNumber >= lastSibling && pageNumber >= exports.FIRST_PAGE; pageNumber--) {
        previousSiblings.push(pageNumber);
    }
    const ellipsis = getEllipsis(previousSiblings, exports.FIRST_PAGE);
    return [...ellipsis, ...previousSiblings.reverse()];
};
const getNextSiblings = (activePage, siblingCount, totalPages) => {
    const nextSiblings = [];
    const lastSibling = activePage + siblingCount;
    for (let pageNumber = activePage + exports.ONE_PAGE; pageNumber <= lastSibling && pageNumber <= totalPages; pageNumber++) {
        nextSiblings.push(pageNumber);
    }
    const ellipsis = getEllipsis(nextSiblings, totalPages);
    return [...nextSiblings, ...ellipsis];
};
const getFirstPage = (activePage, siblingCount) => {
    if (activePage - siblingCount > exports.FIRST_PAGE) {
        return [exports.FIRST_PAGE];
    }
    return [];
};
const getLastPage = (activePage, siblingCount, totalPages) => {
    if (activePage + siblingCount < totalPages) {
        return [totalPages];
    }
    return [];
};
exports.getRange = (activePage, totalPages, siblingCount) => {
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